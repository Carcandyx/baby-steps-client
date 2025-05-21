/**
 * Base API client for making HTTP requests
 * Using the Fetch API with standard Next.js environment variables
 */

import { logout } from './authService';

// Use the environment variable for API base URL
const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// Request options type
interface RequestOptions {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	headers?: Record<string, string>;
	body?: Record<string, unknown> | unknown[];
	authenticated?: boolean;
}

// Error response type from the server
interface ServerErrorResponse {
	error: string;
	message: string;
	statusCode: number;
}

// Standardized error format for client handling
interface ClientErrorResponse {
	status: number;
	message: string;
	error: string;
}

/**
 * Get the authentication token from localStorage
 */
const getAuthToken = (): string | null => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('authToken');
	}
	return null;
};

/**
 * Handle unauthorized (401) response by logging out
 */
const handleUnauthorized = () => {
	console.warn('Unauthorized access detected - logging out');
	logout();

	// If we're in the browser, redirect to login
	if (typeof window !== 'undefined') {
		window.location.href = '/login';
	}
};

/**
 * Base request function
 */
export const request = async <T>(
	endpoint: string,
	options: RequestOptions
): Promise<T> => {
	try {
		// Prepare URL
		const url = endpoint.startsWith('http')
			? endpoint
			: `${API_BASE_URL}${endpoint}`;

		// Set up headers
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			...options.headers,
		};

		// Add authentication token if required
		if (options.authenticated) {
			const token = getAuthToken();
			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			} else {
				throw new Error('Authentication required but no token found');
			}
		}

		// Prepare request options
		const requestOptions: RequestInit = {
			method: options.method,
			headers,
			credentials: 'include', // Include cookies for cross-origin requests
		};

		// Add body if provided
		if (options.body) {
			requestOptions.body = JSON.stringify(options.body);
		}

		// Make the request
		const response = await fetch(url, requestOptions);

		// Parse the response data
		let data;

		// Check if response has content
		const contentLength = response.headers.get('Content-Length');
		const hasContent = contentLength === null || parseInt(contentLength) > 0;

		if (response.ok) {
			// Handle successful responses
			if (hasContent) {
				// Try to parse as JSON for responses with content
				try {
					data = await response.json();
				} catch {
					// If JSON parsing fails, try to read as text
					const responseClone = response.clone();
					const text = await responseClone.text();
					data = text ? { message: text } : {};
				}
			} else {
				// For empty responses (like 204 No Content)
				data = {};
			}
		} else {
			// Handle error responses
			try {
				data = await response.json();
			} catch {
				// If parsing as JSON fails, try as text
				const text = await response.text();
				data = { message: text || response.statusText };
			}
		}

		// Check for 401 Unauthorized responses and handle them
		if (response.status === 401) {
			handleUnauthorized();
			const unauthorizedError: ClientErrorResponse = {
				status: 401,
				message: 'Session expired. Please log in again.',
				error: 'unauthorized',
			};
			throw unauthorizedError;
		}

		// Handle error responses
		if (!response.ok) {
			// Check if the response matches our server's error format
			if (
				data &&
				'error' in data &&
				'message' in data &&
				'statusCode' in data
			) {
				const serverError = data as ServerErrorResponse;
				const clientError: ClientErrorResponse = {
					status: serverError.statusCode,
					message: serverError.message,
					error: serverError.error,
				};
				console.error('API Error:', clientError);
				throw clientError;
			} else {
				// Fallback for other error formats
				const fallbackError: ClientErrorResponse = {
					status: response.status,
					message: data?.message || response.statusText,
					error: 'unknown_error',
				};
				console.error('API Error (Fallback):', fallbackError);
				throw fallbackError;
			}
		}

		return data as T;
	} catch (error) {
		// If it's already a ClientErrorResponse, just rethrow it
		if (
			error &&
			typeof error === 'object' &&
			'status' in error &&
			'message' in error
		) {
			throw error;
		}

		// Otherwise, convert to a ClientErrorResponse
		const clientError: ClientErrorResponse = {
			status: 500,
			message:
				error instanceof Error ? error.message : 'Unknown error occurred',
			error: error instanceof Error ? error.name : 'unknown_error',
		};
		console.error('API Request Failed:', clientError);
		throw clientError;
	}
};

// Helper methods for different HTTP verbs
export const apiClient = {
	get: <T>(endpoint: string, authenticated = false, headers = {}) =>
		request<T>(endpoint, { method: 'GET', headers, authenticated }),

	post: <T>(
		endpoint: string,
		body: Record<string, unknown>,
		authenticated = false,
		headers = {}
	) => request<T>(endpoint, { method: 'POST', body, headers, authenticated }),

	put: <T>(
		endpoint: string,
		body: Record<string, unknown>,
		authenticated = false,
		headers = {}
	) => request<T>(endpoint, { method: 'PUT', body, headers, authenticated }),

	patch: <T>(
		endpoint: string,
		body: Record<string, unknown>,
		authenticated = false,
		headers = {}
	) => request<T>(endpoint, { method: 'PATCH', body, headers, authenticated }),

	delete: <T>(
		endpoint: string,
		body?: Record<string, unknown>,
		authenticated = false,
		headers = {}
	) =>
		request<T>(endpoint, {
			method: 'DELETE',
			...(body && { body }),
			headers,
			authenticated,
		}),
};
