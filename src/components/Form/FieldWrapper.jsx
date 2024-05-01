import clsx from 'clsx';
import * as React from 'react';

/**
 * @typedef {object} FieldWrapperProps
 * @property {string} [label]
 * @property {string} [className]
 * @property {React.ReactNode} children
 * @property {FieldError | undefined} [error]
 * @property {string} [description]
 */

/** @typedef {Omit<FieldWrapperProps, 'classname' | 'children'>} FieldWrapperPassThroughProps */

/** @param {FieldWrapperProps} props*/
export const FieldWrapper = (props) => {
  const { label, className, error, children } = props;
  return (
    <div>
      <label className={clsx('block text-sm font-medium text-gray-700', className)}>
        {label}
        <div className="mt-1">{children}</div>
      </label>
      {error?.message && (
        <div role="alert" aria-label={error.message} className="text-sm font-semibold text-red-500">
          {error.message}
        </div>
      )}
    </div>
  );
};
