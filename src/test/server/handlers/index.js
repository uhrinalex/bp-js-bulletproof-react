import { authHandlers } from './auth.js';
import { commentsHandlers } from './comments.js';
import { discussionsHandlers } from './discussions.js';
import { teamsHandlers } from './teams';
import { usersHandlers } from './users';

/** @type {import('msw').RestHandler<import('msw').MockedRequest<import('msw').DefaultRequestBody>>[]} */
export const handlers = [
  ...authHandlers,
  ...commentsHandlers,
  ...discussionsHandlers,
  ...teamsHandlers,
  ...usersHandlers,
];
