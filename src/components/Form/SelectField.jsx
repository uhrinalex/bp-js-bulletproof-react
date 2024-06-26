import clsx from 'clsx';
import * as React from 'react';
import {FieldWrapper} from './FieldWrapper';

/** @typedef {{
 *  label: React.ReactNode;
 *  value: string | number | string[];
 }} Option */


/** @typedef {import('./FieldWrapper.jsx').FieldWrapperPassThroughProps & {
 * options: Option[];
 * className?: string;
 * defaultValue?: string;
 * placeholder?: string;
 * registration: Partial<UseFormRegisterReturn>;
 }} SelectFieldProps */

/** @param {SelectFieldProps} props */
export const SelectField = (props) => {
    /** @type {SelectFieldProps} */
    const {label, options, error, className, defaultValue, registration, placeholder} = props;
    return (
        <FieldWrapper label={label} error={error}>
            <select
                name="location"
                className={clsx(
                    'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md',
                    className
                )}
                defaultValue={defaultValue}
                {...registration}
            >
                {placeholder && <option value="" disabled selected>{placeholder}</option>}
                {options.map(({label, value}) => (
                    <option key={label?.toString()} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </FieldWrapper>
    );
};

// return (
//     <FieldWrapper label={label} error={error}>
//         <select
//             placeholder={placeholder}
//             name="location"
//             className={clsx(
//                 'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md',
//                 className
//             )}
//             defaultValue={defaultValue}
//             {...registration}
//         >
//             {options.map(({label, value}) => (
//                 <option key={label?.toString()} value={value}>
//                     {label}
//                 </option>
//             ))}
//         </select>
//     </FieldWrapper>
// );
