/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { configureStore, EnhancedStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducers/root';
import GlobalState from '../models/GlobalState';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { StandardAction } from '../models/StandardAction';
import epic from './epics/root';
import { BehaviorSubject, forkJoin, fromEvent, Observable, of } from 'rxjs';
import { filter, map, pluck, switchMap, take, tap } from 'rxjs/operators';
import { fetchGlobalProperties, fetchMyRolesInSite, me } from '../services/users';
import { fetchAll } from '../services/sites';
import LookupTable from '../models/LookupTable';
import { Middleware } from 'redux';
import { getCurrentIntl } from '../utils/i18n';
import { IntlShape } from 'react-intl';
import { ObtainAuthTokenResponse } from '../services/auth';
import { setJwt } from '../utils/auth';
import { storeInitialized } from './actions/system';
import { fromPromise } from 'rxjs/internal-compatibility';
import User from '../models/User';
import { Site } from '../models/Site';
import {
  sharedWorkerConnect,
  sharedWorkerDisconnect,
  sharedWorkerToken,
  sharedWorkerUnauthenticated
} from './actions/auth';

export type EpicMiddlewareDependencies = { getIntl: () => IntlShape; worker: SharedWorker };

export type CrafterCMSStore = EnhancedStore<GlobalState, StandardAction>;

export type CrafterCMSEpic = Epic<StandardAction, StandardAction, GlobalState, EpicMiddlewareDependencies>;

let store$: BehaviorSubject<CrafterCMSStore>;

export function getStore(): Observable<CrafterCMSStore> {
  if (store$) {
    return store$.pipe(
      filter((store) => store !== null),
      take(1)
    );
  } else {
    store$ = new BehaviorSubject(null);
    return registerSharedWorker().pipe(
      tap(({ token }) => setJwt(token)),
      switchMap(({ worker, ...auth }) =>
        of(createStoreSync({ dependencies: { worker } })).pipe(
          switchMap((store) =>
            fetchStateInitialization().pipe(
              tap((requirements) => {
                store.dispatch(storeInitialized({ auth, ...requirements }));
                worker.port.onmessage = (e) => {
                  if (e.data?.type) {
                    console.log('%c[page] Message received from worker', 'color: #AF52DE', e.data);
                    store.dispatch(e.data);
                  }
                };
                store$.next(store);
              })
            )
          )
        )
      ),
      switchMap(() => store$.pipe(take(1)))
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function registerServiceWorker(): Observable<ObtainAuthTokenResponse> {
  return fromPromise(navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)).pipe(
    switchMap((registration) => registration.update().then(() => registration)),
    switchMap((registration) => {
      const begin = () => {
        navigator.serviceWorker.startMessages();
        registration.active.postMessage(sharedWorkerConnect());
      };
      if (registration.active) {
        begin();
      } else {
        registration.onupdatefound = () => {
          if (registration.installing) {
            registration.installing.onstatechange = () => {
              if (registration.active?.state === 'activated') {
                begin();
              }
            };
          }
        };
      }
      return fromEvent<MessageEvent>(navigator.serviceWorker, 'message').pipe(
        tap((e) => {
          console.log('%c[page] Message received from worker', 'color: #AF52DE', e.data);
          if (e.data?.type === sharedWorkerUnauthenticated.type) {
            throw new Error('User not authenticated.');
          }
        }),
        filter((e) => e.data?.type === sharedWorkerToken.type),
        take(1),
        pluck('data', 'payload')
      );
    })
  );
}

function registerSharedWorker(): Observable<ObtainAuthTokenResponse & { worker: SharedWorker }> {
  const worker = new SharedWorker(`${process.env.PUBLIC_URL}/shared-worker.js`, {
    name: 'authWorker',
    credentials: 'same-origin'
  });
  worker.port.start();
  worker.port.postMessage(sharedWorkerConnect());
  window.addEventListener('beforeunload', function() {
    worker.port.postMessage(sharedWorkerDisconnect());
  });
  return fromEvent<MessageEvent>(worker.port, 'message').pipe(
    tap((e) => {
      console.log('%c[page] Message received from worker', 'color: #AF52DE', e.data);
      if (e.data?.type === sharedWorkerUnauthenticated.type) {
        throw new Error('User not authenticated.');
      }
    }),
    filter((e) => e.data?.type === sharedWorkerToken.type),
    take(1),
    pluck('data', 'payload'),
    map((response) => ({ ...response, worker }))
  );
}

export function getStoreSync(): CrafterCMSStore {
  return store$?.value;
}

export function createStoreSync(
  args: { preloadedState?: Partial<GlobalState>; dependencies?: any } = {}
): CrafterCMSStore {
  const { preloadedState, dependencies } = args;
  const epicMiddleware = createEpicMiddleware<StandardAction, StandardAction, GlobalState, EpicMiddlewareDependencies>({
    dependencies: { getIntl: getCurrentIntl, ...dependencies }
  });
  const middleware = [...getDefaultMiddleware<GlobalState, { thunk: boolean }>({ thunk: false }), epicMiddleware];
  const store = configureStore<GlobalState, StandardAction, Middleware[]>({
    reducer,
    middleware,
    preloadedState
  });
  epicMiddleware.run(epic);
  return store;
}

export function fetchStateInitialization(): Observable<{
  user: User;
  rolesBySite: LookupTable<string[]>;
  sites: Site[];
  properties: LookupTable<any>;
}> {
  return forkJoin({
    user: me(),
    sites: fetchAll(),
    properties: fetchGlobalProperties()
  }).pipe(
    switchMap(({ user, sites, properties }) =>
      sites.length
        ? forkJoin<LookupTable<Observable<string[]>>, ''>(
            // creates an object like `{ [siteId]: Observable<roleName[]> }`
            sites.reduce((lookup, site) => {
              lookup[site.id] = fetchMyRolesInSite(site.id);
              return lookup;
            }, {})
          ).pipe(
            map((rolesBySite) => ({
              user,
              rolesBySite,
              sites,
              properties
            }))
          )
        : of({
            user,
            sites,
            properties,
            rolesBySite: {}
          })
    )
  );
}

export default getStore;
