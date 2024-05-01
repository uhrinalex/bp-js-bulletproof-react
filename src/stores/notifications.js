import { nanoid } from 'nanoid';
import create from 'zustand';

/**
 * @typedef {{
 *  id: string;
 *  type: 'info' | 'warning' | 'success' | 'error';
 *  title: string;
 *  message?: string;
 *  }} Notification
 */

/**
 * @typedef {{
 *   notifications: Notification[];
 *   addNotification: (notification: Omit<Notification, 'id'>) => void;
 *   dismissNotification: (id: string) => void;
 *   }} NotificationsStore
 */

export const useNotificationStore = create((set) => ({
  /** @type {Notification[]} */
  notifications: [],
  /** @type { (notification: Omit<Notification, 'id'>) => void} */
  addNotification: (/** @type {Omit<Notification, 'id'>} */notification) =>
    set((/** @type {NotificationsStore} */state) => ({
      notifications: [...state.notifications, { id: nanoid(), ...notification }],
    })),
  /** @type { (id: string) => void} */
  dismissNotification: (/** @type {string} */id) =>
    set((/** @type {NotificationsStore} */state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    })),
}));
