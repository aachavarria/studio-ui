/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useEffect, useState, useRef } from 'react';
//@ts-ignore
import GraphiQL from 'graphiql';
//@ts-ignore
import GraphiQLExplorer from "graphiql-explorer";
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from "graphql";

import "graphiql/graphiql.css";

export interface GraphiQLProps {
  url?: string,
  storageKey?: string,
  method?: string
}

const _storages: any = {};

// Custom storage to store graphiQL info by key
function _makeStorage(storageKey: string) {
  return {
    setItem: (key: string, val: any) => window.localStorage.setItem(`${storageKey}${key}`, val),
    getItem: (key: string) => window.localStorage.getItem(`${storageKey}${key}`),
    removeItem: (key: string) => window.localStorage.removeItem(`${storageKey}${key}`)
  };
}

// Returns custom storage by key
function getStorage(storageKey: string) {
  if (!_storages[storageKey]) {
    _storages[storageKey] = _makeStorage(storageKey);
  }
  return _storages[storageKey];
}

function Graphi(props: GraphiQLProps) {
  const [query, setQuery] = useState(window.localStorage.getItem(`${props.storageKey}graphiql:query`));
  const [schema, setSchema] = useState<GraphQLSchema>(null);
  const [explorerIsOpen, setExplorerIsOpen] = useState<boolean>(false);
  const _graphiql: GraphiQL = useRef();

  // Updates localStorage and query variable used by graphiQL and graphiQL explorer
  function onEditQuery(newQuery:any) {
    setQuery(newQuery);
    window.localStorage.setItem(`${props.storageKey}graphiql:query`, newQuery);
  }

  function graphQLFetcher(graphQLParams: any) {
    var url:string = props.url ? props.url : window.location.origin + '/api/1/site/graphql',
        method:string = props.method;

    if('get' === method){
      if (typeof graphQLParams['variables'] === "undefined"){
        graphQLParams['variables'] = "{}";
      }

      const query = encodeURIComponent(graphQLParams['query']);
      const variables = encodeURIComponent(JSON.stringify(graphQLParams['variables']));

      url += `?query=${query}&variables=${variables}`;

      return fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      }).then(function (responseBody: any) {
        try {
          return responseBody.json();
        } catch (error) {
          return responseBody;
        }
      });

    }else{
      return fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphQLParams),
      }).then(function (responseBody: any) {
        try {
          return responseBody.json();
        } catch (error) {
          return responseBody;
        }
      });
    }
  }

  function _handleToggleExplorer() {
    setExplorerIsOpen(!explorerIsOpen);
  };

  useEffect(
    () => {
      graphQLFetcher({
        query: getIntrospectionQuery()
      }).then(result => {
        setSchema(buildClientSchema(result.data));
      });
    }, []
  );

  return (
    <div className="graphiql-container" style={{ height: '100vh' }}>
      {/* Explorer plugin for GraphiQL  */}
      <GraphiQLExplorer
        schema={schema}
        query={query}
        onEdit={onEditQuery}
        onRunOperation={(operationName:any) =>
          _graphiql.current.handleRunQuery(operationName)
        }
        explorerIsOpen={explorerIsOpen}
        onToggleExplorer={_handleToggleExplorer}
      />
      <GraphiQL ref={_graphiql}
                fetcher={graphQLFetcher}
                schema={schema}
                query={query}
                storage={getStorage(`${props.storageKey}`)}
                onEditQuery={onEditQuery}>
        <GraphiQL.Toolbar>
          <GraphiQL.Button
            onClick={() => _graphiql.current.handlePrettifyQuery()}
            label="Prettify"
            title="Prettify Query (Shift-Ctrl-P)"
          />
          <GraphiQL.Button
            onClick={() => _graphiql.current.handleToggleHistory()}
            label="History"
            title="Show History"
          />
          <GraphiQL.Button
            onClick={_handleToggleExplorer}
            label="Explorer"
            title="Toggle Explorer"
          />
        </GraphiQL.Toolbar>
      </GraphiQL>
    </div>
  )
}

export default Graphi;
