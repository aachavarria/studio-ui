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

import { ofType } from 'redux-observable';
import { ignoreElements, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { catchAjaxError } from '../../utils/ajax';
import { fetchItemsByPath, fetchItemWithChildrenByPath, getChildrenByPath } from '../../services/content';
import { getIndividualPaths } from '../../utils/path';
import { forkJoin } from 'rxjs';
import {
  pathNavigatorChangePage,
  pathNavigatorConditionallySetPath,
  pathNavigatorConditionallySetPathComplete,
  pathNavigatorConditionallySetPathFailed,
  pathNavigatorFetchParentItems,
  pathNavigatorFetchParentItemsComplete,
  pathNavigatorFetchPathComplete,
  pathNavigatorFetchPathFailed,
  pathNavigatorInit,
  pathNavigatorRefresh,
  pathNavigatorSetCollapsed,
  pathNavigatorSetCurrentPath,
  pathNavigatorSetKeyword,
  pathNavigatorUpdate
} from '../actions/pathNavigator';
import { getStoredPathNavigator, setStoredPathNavigator } from '../../utils/state';
import { CrafterCMSEpic } from '../store';

export default [
  (action$, state$) =>
    action$.pipe(
      ofType(pathNavigatorInit.type),
      withLatestFrom(state$),
      switchMap(([{ payload }, state]) => {
        const { id } = payload;
        const site = state.sites.active;
        const storedState = getStoredPathNavigator(site, id);
        return [
          storedState ? pathNavigatorUpdate({ id, ...storedState }) : null,
          pathNavigatorFetchParentItems({
            id,
            path: storedState ? storedState.currentPath : payload.path,
            excludes: payload.excludes,
            limit: payload.limit
          })
        ].filter(Boolean);
      })
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(pathNavigatorRefresh.type),
      withLatestFrom(state$),
      mergeMap(([{ type, payload: { id } }, state]) =>
        fetchItemWithChildrenByPath(state.sites.active, state.pathNavigator[id].currentPath).pipe(
          map(({ item, children }) => pathNavigatorFetchPathComplete({ id, parent: item, children })),
          catchAjaxError(pathNavigatorFetchPathFailed)
        )
      )
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(pathNavigatorConditionallySetPath.type),
      withLatestFrom(state$),
      mergeMap(([{ type, payload: { id, path } }, state]) =>
        fetchItemWithChildrenByPath(state.sites.active, path).pipe(
          map(({ item, children }) => pathNavigatorConditionallySetPathComplete({ id, path, parent: item, children })),
          catchAjaxError(pathNavigatorConditionallySetPathFailed)
        )
      )
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(pathNavigatorSetCurrentPath.type),
      withLatestFrom(state$),
      mergeMap(([{ type, payload: { id, path } }, state]) =>
        fetchItemWithChildrenByPath(state.sites.active, path).pipe(
          map(({ item, children }) => pathNavigatorFetchPathComplete({ id, parent: item, children })),
          catchAjaxError(pathNavigatorFetchPathFailed)
        )
      )
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(pathNavigatorSetKeyword.type),
      withLatestFrom(state$),
      mergeMap(([{ type, payload: { id, keyword } }, state]) =>
        getChildrenByPath(state.sites.active, state.pathNavigator[id].currentPath, {
          keyword,
          limit: state.pathNavigator[id].limit
        }).pipe(
          map((children) => pathNavigatorFetchPathComplete({ id, children })),
          catchAjaxError(pathNavigatorFetchPathFailed)
        )
      )
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(pathNavigatorChangePage.type),
      withLatestFrom(state$),
      mergeMap(([{ type, payload: { id, offset } }, state]) =>
        getChildrenByPath(state.sites.active, state.pathNavigator[id].currentPath, {
          limit: state.pathNavigator[id].limit,
          offset
        }).pipe(
          map((children) => pathNavigatorFetchPathComplete({ id, children })),
          catchAjaxError(pathNavigatorFetchPathFailed)
        )
      )
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(pathNavigatorFetchParentItems.type),
      withLatestFrom(state$),
      mergeMap(
        ([
          {
            type,
            payload: { id, path, excludes, limit }
          },
          state
        ]) => {
          const site = state.sites.active;
          const parentsPath = getIndividualPaths(path, state.pathNavigator[id].rootPath);
          if (parentsPath.length > 1) {
            return forkJoin([
              fetchItemsByPath(site, parentsPath),
              getChildrenByPath(site, path, {
                excludes,
                limit
              })
            ]).pipe(
              map(([items, children]) => pathNavigatorFetchParentItemsComplete({ id, items, children })),
              catchAjaxError(pathNavigatorFetchPathFailed)
            );
          } else {
            return fetchItemWithChildrenByPath(site, path, { excludes, limit }).pipe(
              map(({ item, children }) => pathNavigatorFetchPathComplete({ id, parent: item, children })),
              catchAjaxError(pathNavigatorFetchPathFailed)
            );
          }
        }
      )
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(
        pathNavigatorFetchPathComplete.type,
        pathNavigatorConditionallySetPathComplete.type,
        pathNavigatorSetCollapsed.type
      ),
      withLatestFrom(state$),
      tap(
        ([
          {
            type,
            payload: { id, children }
          },
          state
        ]) => {
          if (children?.length > 0 || type === pathNavigatorSetCollapsed.type) {
            setStoredPathNavigator(state.sites.active, id, {
              currentPath: state.pathNavigator[id].currentPath,
              collapsed: state.pathNavigator[id].collapsed
            });
          }
        }
      ),
      ignoreElements()
    )
] as CrafterCMSEpic[];
