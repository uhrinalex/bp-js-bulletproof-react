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
 * @property {React.ReactElement} [startIcon] - Start icon.
 * @property {React.ReactElement} [endIcon] - End icon.
 */

/**
 * @typedef {Object} ButtonVariantProps
 * @property {keyof typeof variants} [variant]
 * @property {keyof typeof sizes} [size]
 * @property {boolean} [isLoading]
 */

/**
 * Props for button component.
 * @typedef {React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantProps & IconProps} ButtonProps
 */

export const Button = React.forwardRef(
    (
        /** @type ButtonProps */
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
