/**
 * Token Management Utilities
 * Handles authentication token storage and retrieval
 */

const TOKEN_KEY = 'summit_auth_token';

export const authStorage = {
    /**
     * Get the stored authentication token
     */
    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(TOKEN_KEY);
    },

    /**
     * Store authentication token
     */
    setToken: (token: string): void => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(TOKEN_KEY, token);
    },

    /**
     * Remove authentication token
     */
    removeToken: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(TOKEN_KEY);
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: (): boolean => {
        return !!authStorage.getToken();
    },
};
