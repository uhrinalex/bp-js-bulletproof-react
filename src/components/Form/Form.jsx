import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';

/**
 * @template TFormValues
 * @template Schema
 * @typedef {Object} FormProps
 * @property {string} [className]
 * @property {SubmitHandler<TFormValues>} onSubmit
 * @property {(methods: UseFormReturn<TFormValues>) => React.ReactNode} children
 * @property {UseFormProps<TFormValues>} [options]
 * @property {string} [id]
 * @property {Schema} [schema]
 */

/**
 * @template {Record<string, unknown>} TFormValues
 * @template {ZodType<any, ZodTypeDef, unknown>} Schema
 * @param {FormProps<TFormValues, Schema>} props
 */
export const Form = ({
                         onSubmit,
                         children,
                         className,
                         options,
                         id,
                         schema,
                     }) => {
    const methods = useForm({ ...options, resolver: schema && zodResolver(schema) });
    return (
        <form
            className={clsx('space-y-6', className)}
            onSubmit={methods.handleSubmit(onSubmit)}
            id={id}
        >
            {children(methods)}
        </form>
    );
};
