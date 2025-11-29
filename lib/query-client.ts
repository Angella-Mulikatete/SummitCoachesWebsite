import { QueryClient } from '@tanstack/react-query';

/**
 * Create and configure React Query client
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Stale time: Data stays fresh for 5 minutes
            staleTime: 5 * 60 * 1000,

            // Cache time: Keep unused data in cache for 10 minutes
            gcTime: 10 * 60 * 1000,

            // Retry failed requests up to 3 times
            retry: 3,

            // Retry delay increases exponentially
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

            // Refetch on window focus in production
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',

            // Refetch on reconnect
            refetchOnReconnect: true,
        },
        mutations: {
            // Retry mutations once on failure
            retry: 1,
        },
    },
});
