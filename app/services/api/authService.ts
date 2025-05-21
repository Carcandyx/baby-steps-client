import { apiClient } from './apiClient';

// User interface
export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
}

// Auth response interface
export interface AuthResponse {
	user: User;
	token: string;
}

// Login request interface
export interface LoginRequest {
	email: string;
	password: string;
	[key: string]: unknown;
}

// Signup request interface
export interface SignupRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	[key: string]: unknown;
}

// Custom authentication error
export class AuthError extends Error {
	status: number;
	error: string;

	constructor(message: string, status = 400, error = 'auth_error') {
		super(message);
		this.name = 'AuthError';
		this.status = status;
		this.error = error;
	}
}

// Internal functions
const logout = (): void => {
	localStorage.removeItem('authToken');
	localStorage.removeItem('user');
};

/**
 * Authentication service
 */
export const authService = {
	/**
	 * Login with email and password
	 */
	login: async (credentials: LoginRequest): Promise<AuthResponse> => {
		try {
			const response = await apiClient.post<AuthResponse>(
				'/auth/sign-in',
				credentials
			);

			// Save token to localStorage
			if (response.token) {
				localStorage.setItem('authToken', response.token);
				localStorage.setItem('user', JSON.stringify(response.user));
			}

			return response;
		} catch (error) {
			console.error('Login error:', error);

			// Convert to AuthError for consistent error handling
			if (error && typeof error === 'object' && 'message' in error) {
				const status = 'status' in error ? (error.status as number) : 400;
				const errorCode =
					'error' in error ? (error.error as string) : 'auth_error';
				throw new AuthError(error.message as string, status, errorCode);
			}

			// Fallback for unexpected errors
			throw new AuthError('Error during login. Please try again.');
		}
	},

	/**
	 * Register a new user
	 */
	signup: async (userData: SignupRequest): Promise<AuthResponse> => {
		try {
			const response = await apiClient.post<AuthResponse>(
				'/auth/sign-up',
				userData
			);

			// Save token to localStorage
			if (response.token) {
				localStorage.setItem('authToken', response.token);
				localStorage.setItem('user', JSON.stringify(response.user));
			}

			return response;
		} catch (error) {
			console.error('Signup error:', error);

			// Convert to AuthError for consistent error handling
			if (error && typeof error === 'object' && 'message' in error) {
				const status = 'status' in error ? (error.status as number) : 400;
				const errorCode =
					'error' in error ? (error.error as string) : 'auth_error';
				throw new AuthError(error.message as string, status, errorCode);
			}

			// Fallback for unexpected errors
			throw new AuthError('Error during registration. Please try again.');
		}
	},

	/**
	 * Logout the current user
	 */
	logout,

	/**
	 * Get the current authenticated user
	 */
	getCurrentUser: (): User | null => {
		const userStr = localStorage.getItem('user');
		if (!userStr) return null;

		try {
			return JSON.parse(userStr) as User;
		} catch (error) {
			console.error('Error parsing user data:', error);
			return null;
		}
	},

	/**
	 * Check if the user is authenticated
	 */
	isAuthenticated: (): boolean => {
		return !!localStorage.getItem('authToken');
	},

	/**
	 * Verify the current token is valid by checking localStorage
	 * No API call is made - we simply trust that if the token exists, it's valid
	 */
	verifyToken: async (): Promise<boolean> => {
		return authService.isAuthenticated();
	},
};

// Export logout for API client to use
export { logout };
