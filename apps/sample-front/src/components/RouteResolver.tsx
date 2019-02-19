import * as R from 'r';
import React, { useRef, useEffect } from 'react';
import { useMappedState } from 'typeless';
import { State, RouteConfig } from 'src/types';

const req = require.context('../modules', true, /interface.tsx?$/);

const routes = R.flatMap(req.keys(), key => {
  const module = req(key);
  return Object.values(module).filter(
    (item: RouteConfig) => item.type === 'route'
  ) as RouteConfig[];
});

function usePrevious<T>(value: T) {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const RouteResolver = () => {
  const { user, location } = useMappedState((state: State) => ({
    ...R.pick(state.global, ['isLoaded', 'user']),
    ...R.pick(state.router, ['location']),
  }));
  const prevUser = usePrevious(user);
  const getMatch = (pathname: string, isLogged: boolean) =>
    routes.find(route => {
      if ((route.auth && !isLogged) || (!route.auth && isLogged)) {
        return false;
      }
      return route.path === pathname;
    });

  let match = getMatch(location.pathname, !!user);
  if (match) {
    return match.component;
  }
  if (!prevUser && user) {
    // user is logging ina
    // keep rendering current route
    match = getMatch(location.pathname, !user);
    if (match) {
      return match.component;
    }
  }

  return (
    <div style={{ background: 'red', width: '100%', height: '100vh' }}>
      Not found
    </div>
  );
};
