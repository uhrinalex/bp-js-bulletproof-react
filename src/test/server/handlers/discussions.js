import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { API_URL } from '@/config';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, delayedResponse } from '../utils';

/** @typedef {{
 *  title: string;
 *  body: string;
 * }} DiscussionBody */

export const discussionsHandlers = [
  rest.get(`${API_URL}/discussions`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const result = db.discussion.findMany({
        where: {
          teamId: {
            equals: user.teamId,
          },
        },
      });
      return delayedResponse(ctx.json(result));
    } catch (/** @type {any} */error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.get(`${API_URL}/discussions/:discussionId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { discussionId } = req.params;
      const result = db.discussion.findFirst({
        where: {
          id: {
            equals: discussionId,
          },
          teamId: {
            equals: user.teamId,
          },
        },
      });
      return delayedResponse(ctx.json(result));
    } catch (/** @type {any} */error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.post(`${API_URL}/discussions`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = /** @type {DiscussionBody} */(req.body);
      requireAdmin(user);
      const result = db.discussion.create({
        teamId: user.teamId,
        id: nanoid(),
        createdAt: Date.now(),
        ...data,
      });
      persistDb('discussion');
      return delayedResponse(ctx.json(result));
    } catch (/** @type {any} */error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.patch(`${API_URL}/discussions/:discussionId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = /** @type {DiscussionBody} */(req.body);
      const { discussionId } = req.params;
      requireAdmin(user);
      const result = db.discussion.update({
        where: {
          teamId: {
            equals: user.teamId,
          },
          id: {
            equals: discussionId,
          },
        },
        data,
      });
      persistDb('discussion');
      return delayedResponse(ctx.json(result));
    } catch (/** @type {any} */error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.delete(`${API_URL}/discussions/:discussionId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { discussionId } = req.params;
      requireAdmin(user);
      const result = db.discussion.delete({
        where: {
          id: {
            equals: discussionId,
          },
        },
      });
      persistDb('discussion');
      return delayedResponse(ctx.json(result));
    } catch (/** @type {any} */error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
