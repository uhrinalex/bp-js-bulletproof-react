// import clsx from 'clsx';
// import * as React from 'react';
//
// import { Spinner } from '@/components/Elements/Spinner';
//
// const variants = {
//   primary: 'bg-blue-600 text-white',
//   inverse: 'bg-white text-blue-600',
//   danger: 'bg-red-600 text-white',
// };
//
// const sizes = {
//   sm: 'py-2 px-4 text-sm',
//   md: 'py-2 px-6 text-md',
//   lg: 'py-3 px-8 text-lg',
// };
//
// type IconProps =
//   | { startIcon: React.ReactElement; endIcon?: never }
//   | { endIcon: React.ReactElement; startIcon?: never }
//   | { endIcon?: undefined; startIcon?: undefined };
//
// export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   variant?: keyof typeof variants;
//   size?: keyof typeof sizes;
//   isLoading?: boolean;
// } & IconProps;
//
// export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   (
//     {
//       type = 'button',
//       className = '',
//       variant = 'primary',
//       size = 'md',
//       isLoading = false,
//       startIcon,
//       endIcon,
//       ...props
//     },
//     ref
//   ) => {
//     return (
//       <button
//         ref={ref}
//         type={type}
//         className={clsx(
//           'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80',
//           variants[variant],
//           sizes[size],
//           className
//         )}
//         {...props}
//       >
//         {isLoading && <Spinner size="sm" className="text-current" />}
//         {!isLoading && startIcon}
//         <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
//       </button>
//     );
//   }
// );
//
// Button.displayName = 'Button';


import clsx from 'clsx';
import React from 'react';
import { Spinner } from '@/components/Elements/Spinner';

/**
 * Variants for button styling.
 * @typedef {Object} Variants
 * @property {string} primary - Primary variant.
 * @property {string} inverse - Inverse variant.
 * @property {string} danger - Danger variant.
 */
const variants = {
    primary: 'bg-blue-600 text-white',
    inverse: 'bg-white text-blue-600',
    danger: 'bg-red-600 text-white',
};

/**
 * Sizes for button.
 * @typedef {Object} Sizes
 * @property {string} sm - Small size.
 * @property {string} md - Medium size.
 * @property {string} lg - Large size.
 */
const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-2 px-6 text-md',
    lg: 'py-3 px-8 text-lg',
};

/**
 * Props for icon.
 * @typedef {Object} IconProps
 * @property {React.ReactElement} startIcon - Start icon.
 * @property {React.ReactElement} [endIcon] - End icon.
 */
// type IconProps =
// | { startIcon: React.ReactElement; endIcon?: never }
// | { endIcon: React.ReactElement; startIcon?: never }
// | { endIcon?: undefined; startIcon?: undefined };



/**
 * Props for button component.
 * @typedef {Object} ButtonProps
 * @property {string} [variant=primary] - Button variant.
 * @property {string} [size=md] - Button size.
 * @property {boolean} [isLoading=false] - Loading state of button.
 * @property {IconProps} [startIcon] - Start icon props.
 * @property {IconProps} [endIcon] - End icon props.
 */
export const Button = React.forwardRef(
    /**
     * Button component.
     * @param {ButtonProps} props - Button props.
     * @param {string} [props.type='button'] - Button type.
     * @param {string} [props.className=''] - Additional class names.
     * @param {string} [props.variant='primary'] - Button variant.
     * @param {string} [props.size='md'] - Button size.
     * @param {boolean} [props.isLoading=false] - Loading state of button.
     * @param {IconProps} [props.startIcon] - Start icon props.
     * @param {IconProps} [props.endIcon] - End icon props.
     * @param {React.ReactNode} props.children - Button children.
     * @param {React.Ref<HTMLButtonElement>} ref - Button ref.
     * @returns {React.ReactElement} Button element.
     */
    (
        {
            type = 'button',
            className = '',
            variant = 'primary',
            size = 'md',
            isLoading = false,
            startIcon,
            endIcon,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                className={clsx(
                    'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Spinner size="sm" className="text-current" />}
                {!isLoading && startIcon}
                <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';
