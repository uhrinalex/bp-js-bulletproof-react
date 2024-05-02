import { QueryClient } from "react-query";

/** @type {DefaultOptions} */
const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
};

/** @type {QueryClient} */
export const queryClient = new QueryClient({ defaultOptions: queryConfig });

/**
 * @template {(...args: any) => any} FnType
 * @typedef {import("type-fest").PromiseValue<ReturnType<FnType>>} ExtractFnReturnType
 */

/**
 * @template {(...args: any) => any} QueryFnType
 * @typedef {Omit<import("react-query").UseQueryOptions<ExtractFnReturnType<QueryFnType>>, 'queryKey' | 'queryFn'>} QueryConfig
 */

/**
 * @template {(...args: any) => any} MutationFnType
 * @typedef {import("react-query").UseMutationOptions<
 *   ExtractFnReturnType<MutationFnType>,
 *   import("axios").AxiosError,
 *   Parameters<MutationFnType>[0]
 * >} MutationConfig
 */
