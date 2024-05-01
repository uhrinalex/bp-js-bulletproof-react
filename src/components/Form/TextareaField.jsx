import clsx from 'clsx';
import { FieldWrapper } from './FieldWrapper';

/** @typedef {import('./FieldWrapper.jsx').FieldWrapperPassThroughProps & {
 *  className?: string;
 *  registration: Partial<UseFormRegisterReturn>;
 * }} TextAreaFieldProps */

/** @param {TextAreaFieldProps} props
 * @returns {JSX.Element}
 */
export const TextAreaField = (props) => {
  const { label, className, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        className={clsx(
          'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
