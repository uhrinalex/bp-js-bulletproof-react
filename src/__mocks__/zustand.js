import { act } from 'react-dom/test-utils';
import actualCreate from 'zustand';

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set();

// when creating a stores, we get its initial state, create a reset function and add it in the set
/**
 *
 * @param createState {any}
 * @returns {import('zustand').UseBoundStore<import('zustand').State, import('zustand').StoreApi<import('zustand').State>>}
 */
const create = (createState) => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

// Reset all stores after each test run
afterEach(() => {
  /** @param {() => void} resetFn */
  const resetFunction = (resetFn) => {
    resetFn();
  };

  act(() => storeResetFns.forEach(resetFunction));
});

export default create;
