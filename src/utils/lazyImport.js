import React from 'react';

/**
 * @template {React.ComponentType<any>} T
 * @template {{ [K2 in K]: T }} I
 * @template {keyof I} K
 * @param {() => Promise<I>} factory
 * @param {K} name
 * @returns {I}
 */
export function lazyImport(factory, name) {
  return Object.create({
    [name]: React.lazy(() =>
        factory().then((module) => ({ default: module[name] }))
    ),
  });
}

// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");
