import React from 'react';

import { useAuth } from './auth';

/**
 * @readonly
 * @enum {string}
 */
export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

/**
 * @typedef {keyof typeof ROLES} RoleTypes
 */

/** @typedef {User} UserType */
/** @typedef {CommentType} Comment */

/**
 * @type {Object.<string, (user: UserType, comment: Comment) => boolean>}
 */
export const POLICIES = {
  'comment:delete': (user, comment) => {
    if (user.role === ROLES.ADMIN) {
      return true;
    }

    if (user.role === ROLES.USER && comment.authorId === user.id) {
      return true;
    }

    return false;
  },
};

/**
 * @returns {{ checkAccess: (params: { allowedRoles?: RoleTypes[]; policyCheck?: boolean }) => boolean; role: string }}
 */
export const useAuthorization = () => {
  const { user } = useAuth();

  if (!user) {
    throw Error('User does not exist!');
  }

  /**
   * Checks if the user has access.
   * @param {Object} params - Parameters object.
   * @param {RoleTypes[]} [params.allowedRoles] - Array of allowed roles.
   * @param {boolean} [params.policyCheck] - Boolean flag to perform policy check.
   * @returns {boolean} - Indicates whether the user has access.
   */
  const checkAccess = ({ allowedRoles = [], policyCheck }) => {
    if (allowedRoles.length > 0) {
      return allowedRoles.includes(user.role);
    }

    return true;
  };

  return { checkAccess, role: user.role };
};

/**
 * Props for the Authorization component.
 * @typedef {Object} AuthorizationProps
 * @property {React.ReactNode} [forbiddenFallback=null] - Fallback component to render when access is forbidden.
 * @property {React.ReactNode} children - Child components to render.
 * @property {RoleTypes[]} [allowedRoles] - Array of allowed roles.
 * @property {boolean} [policyCheck] - Boolean flag to perform policy check.
 */

/**
 * @param {AuthorizationProps} props
 * @returns {JSX.Element}
 */
export const Authorization = ({ policyCheck, allowedRoles, forbiddenFallback = null, children }) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
