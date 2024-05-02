import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppProvider } from '@/providers/app';
import storage from '@/utils/storage';

import { discussionGenerator, userGenerator } from './data-generators.js';
import { db } from './server/db.js';
import { authenticate, hash } from './server/utils.js';

/** @param {any} [userProperties] */
export const createUser = async (userProperties) => {
  const user = userGenerator(userProperties);
  await db.user.create({ ...user, password: hash(user.password) });
  return user;
};

/** @param {any} [discussionProperties] */
export const createDiscussion = async (discussionProperties) => {
  const discussion = discussionGenerator(discussionProperties);
  const res = await db.discussion.create(discussion);
  return res;
};

/** @param {any} user */
export const loginAsUser = async (user) => {
  const authUser = await authenticate(user);
  storage.setToken(authUser.jwt);
  return authUser;
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [...screen.queryAllByTestId(/loading/i), ...screen.queryAllByText(/loading/i)],
    { timeout: 4000 }
  );

/** @param {any} user */
const initializeUser = async (user) => {
  if (typeof user === 'undefined') {
    return await loginAsUser(await createUser());
  } else if (user) {
    return await loginAsUser(user);
  } else {
    return null;
  }
};

// eslint-disable-next-line import/export
export const render = async (
  /** @type {any} */ui,
  /** @type {Record<string, any>} */{ route = '/', user, ...renderOptions } = {}
) => {
  // if you want to render the app unauthenticated then pass "null" as the user
  user = await initializeUser(user);

  window.history.pushState({}, 'Test page', route);

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: /** @type {import('react').FunctionComponent<unknown>} */(AppProvider),
      ...renderOptions,
    }),
    user,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';
export { userEvent, rtlRender };
