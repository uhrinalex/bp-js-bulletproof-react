import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';

export const Link = (/** @type {LinkProps} */{ className, children, ...props }) => {
  return (
      <RouterLink className={clsx('text-indigo-600 hover:text-indigo-900', className)} {...props}>
        {children}
      </RouterLink>
  );
};
