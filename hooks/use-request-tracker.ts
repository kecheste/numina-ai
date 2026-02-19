"use client";

import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

export interface RequestError {
  message: string;
  details?: Record<string, unknown>;
}

export interface RequestTrackerResult<TData, TVariables> {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: TData | undefined;
  error: RequestError | null;
  errorMessage: string | null;
  details: { statusCode?: number; [key: string]: unknown } | null;
  execute: (variables: TVariables) => Promise<TData>;
  reset: () => void;
  mutation: UseMutationResult<TData, Error, TVariables>;
}

function normalizeError(e: unknown): RequestError {
  if (e instanceof Error) {
    const details: Record<string, unknown> = {};
    const err = e as Error & {
      statusCode?: number;
      response?: { status?: number };
    };
    if (typeof err.statusCode === "number") details.statusCode = err.statusCode;
    if (typeof err.response?.status === "number")
      details.statusCode = err.response.status;
    return {
      message: e.message,
      details: Object.keys(details).length ? details : undefined,
    };
  }
  return { message: String(e) };
}

/**
 * Tracks a single async request: loading, error, success, data, and a stable execute function.
 * Use this globally for login, register, form submits, or any one-off request that doesn’t need caching.
 *
 * Built on TanStack Query’s useMutation so you get consistent behavior and optional devtools.
 *
 * @example
 * const tracker = useRequestTracker(apiLogin);
 * await tracker.execute({ email, password });
 * if (tracker.isSuccess) { ... }
 * if (tracker.isError) { toast.error(tracker.errorMessage); }
 */
export function useRequestTracker<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">,
): RequestTrackerResult<TData, TVariables> {
  const mutation = useMutation({
    mutationFn,
    ...options,
  });

  const rawError = mutation.error;
  const error: RequestError | null = rawError ? normalizeError(rawError) : null;
  const details =
    (error?.details as RequestTrackerResult<TData, TVariables>["details"]) ??
    null;

  return {
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    error,
    errorMessage: error?.message ?? null,
    details,
    execute: (variables: TVariables) => mutation.mutateAsync(variables),
    reset: () => mutation.reset(),
    mutation,
  };
}
