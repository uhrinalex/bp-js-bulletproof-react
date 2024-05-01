import { default as dayjs } from 'dayjs';

export const formatDate = (/** @type {number} */date) => dayjs(date).format('MMMM D, YYYY h:mm A');
