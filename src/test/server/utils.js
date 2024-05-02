import jwt from 'jsonwebtoken';
import omit from 'lodash/omit';
import { RestRequest, createResponseComposition, context } from 'msw';

import { JWT_SECRET } from '@/config';

import { db } from './db.js';

const isTesting = process.env.NODE_ENV === 'test' || (/** @type {any} */((/** @type {any} */(window)).Cypress));

export const delayedResponse = createResponseComposition(undefined, [
  context.delay(isTesting ? 0 : 1000),
]);

/** @param {string} str */
export const hash = (str) => {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
};

/** @param {any} user */
export const sanitizeUser = (user) => omit(user, ['password', 'iat']);

/** @param {{ email: string; password: string }} props */
export function authenticate({ email, password }) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user);
    const encodedToken = jwt.sign(sanitizedUser, JWT_SECRET);
    return { user: sanitizedUser, jwt: encodedToken };
  }

  const error = new Error('Invalid username or password');
  throw error;
}

/** @param {RestRequest} request */
export function requireAuth(request) {
  try {
    const encodedToken = request.headers.get('authorization');
    if (!encodedToken) {
      throw new Error('No authorization token provided!');
    }
    const decodedToken = /** @type {{ id: string }} */(jwt.verify(encodedToken, JWT_SECRET));

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    });

    if (!user) {
      throw Error('Unauthorized');
    }

    return sanitizeUser(user);
  } catch (/** @type {any} */err) {
    throw new Error(err);
  }
}

/** @param {any} user */
export function requireAdmin(user) {
  if (user.role !== 'ADMIN') {
    throw Error('Unauthorized');
  }
}
