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

import { GlobalState } from '../../models/GlobalState';
import { createReducer } from '@reduxjs/toolkit';
import { fetchSiteUiConfig, fetchSiteUiConfigComplete, fetchSiteUiConfigFailed } from '../actions/configuration';
import { changeSite } from './sites';
import { fetchGlobalMenuComplete, fetchGlobalMenuFailed } from '../actions/system';
import { fetchSiteLocales, fetchSiteLocalesComplete, fetchSiteLocalesFailed } from '../actions/translation';

const initialState: GlobalState['uiConfig'] = {
  error: null,
  isFetching: null,
  currentSite: null,
  preview: {
    toolsPanel: {
      widgets: null
    }
  },
  launcher: null,
  globalNavigation: {
    error: null,
    items: null,
    isFetching: false
  },
  siteLocales: {
    error: null,
    isFetching: false,
    localeCodes: null,
    defaultLocaleCode: null
  },
  publishing: {
    submission: {
      commentMaxLength: 250
    }
  }
};

const reducer = createReducer<GlobalState['uiConfig']>(initialState, {
  [changeSite.type]: (state) => ({ ...initialState, globalNavigation: state.globalNavigation }),
  [fetchSiteUiConfig.type]: (state, { payload: { site } }) => ({
    ...state,
    isFetching: true,
    currentSite: site
  }),
  [fetchSiteUiConfigComplete.type]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    ...payload
  }),
  [fetchSiteUiConfigFailed.type]: (state, { payload }) => ({
    ...state,
    error: payload,
    isFetching: false,
    currentSite: null
  }),
  [fetchGlobalMenuComplete.type]: (state, { payload }) => ({
    ...state,
    globalNavigation: {
      ...state.globalNavigation,
      isFetching: true
    }
  }),
  [fetchGlobalMenuComplete.type]: (state, { payload }) => ({
    ...state,
    globalNavigation: {
      error: null,
      items: payload,
      isFetching: false
    }
  }),
  [fetchGlobalMenuFailed.type]: (state, { payload }) => ({
    ...state,
    globalNavigation: {
      error: payload,
      items: state.globalNavigation.items,
      isFetching: false
    }
  }),
  [fetchSiteLocales.type]: (state) => ({
    ...state,
    siteLocales: {
      ...state.siteLocales,
      isFetching: true
    }
  }),
  [fetchSiteLocalesComplete.type]: (state, { payload }) => ({
    ...state,
    siteLocales: {
      ...state.siteLocales,
      isFetching: false,
      localeCodes: payload.localeCodes ?? [],
      defaultLocaleCode: payload.defaultLocaleCode
    }
  }),
  [fetchSiteLocalesFailed.type]: (state, { payload }) => ({
    ...state,
    siteLocales: {
      ...state.siteLocales,
      isFetching: false,
      error: payload
    }
  }),
  [changeSite.type]: () => initialState
});

export default reducer;
