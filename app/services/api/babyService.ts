import { apiClient } from './apiClient';
import { Baby } from '@/app/components/babyCard';

class BabyService {
	/**
	 * Fetches the list of babies for the logged in user
	 * @returns Promise with the list of babies
	 */
	async getBabies(): Promise<Baby[]> {
		try {
			// Pass true for authenticated parameter to include the token
			return await apiClient.get<Baby[]>('/baby', true);
		} catch (error) {
			console.error('Error fetching babies:', error);
			throw error;
		}
	}
}

export const babyService = new BabyService();
