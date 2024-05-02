import { authHandlers } from './auth.js';
import { commentsHandlers } from './comments.js';
import { discussionsHandlers } from './discussions.js';
import { teamsHandlers } from './teams';
import { usersHandlers } from './users';

export const handlers = [
  ...authHandlers,
  ...commentsHandlers,
  ...discussionsHandlers,
  ...teamsHandlers,
  ...usersHandlers,
];
