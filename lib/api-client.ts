import { OpenAPI } from './generated';
import { authStorage } from './auth';

/**
 * Configure the generated API client
 * This must be called before making any API requests
 */
export function configureApiClient() {
    // Set the base URL from environment variable or default
    OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://summit.mellonhardware.com/api/v1';

    // Configure authentication token
    OpenAPI.TOKEN = async () => {
        return authStorage.getToken() || '';
    };

    // Set default headers
    OpenAPI.HEADERS = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
}

// Initialize the API client configuration
configureApiClient();

// Re-export all services and types from generated SDK
export * from './generated';
