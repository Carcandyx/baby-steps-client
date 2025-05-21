import { apiClient } from './apiClient';
import { Baby } from '@/app/components/babyCard';

// Define the payload interface for creating a baby as a Record type
export type CreateBabyPayload = {
	name: string;
	birthDate: Date;
	height?: string;
	weight?: string;
	gender: 'MALE' | 'FEMALE';
} & Record<string, unknown>;

// Define the payload interface for deleting a baby
export type DeleteBabyPayload = {
	babyId: string;
};

// Extended Baby interface with gender field
export interface ExtendedBaby extends Baby {
	gender?: 'MALE' | 'FEMALE';
}

// Task interface
export interface BabyTask {
	_id: string;
	title: string;
	description?: string;
	completed: boolean;
	deadlineDate: Date;
}

// Interface for creating a task
export type CreateTaskPayload = {
	title: string;
	description: string;
	babyId: string;
	deadlineDate: Date;
} & Record<string, unknown>;

// Interface for updating a task completion status
export type UpdateTaskCompletionPayload = {
	completed: boolean;
	babyId: string;
} & Record<string, unknown>;

class BabyService {
	/**
	 * Fetches the list of babies for the logged in user
	 * @returns Promise with the list of babies
	 */
	async getBabies(): Promise<ExtendedBaby[]> {
		try {
			// Pass true for authenticated parameter to include the token
			return await apiClient.get<ExtendedBaby[]>('/baby', true);
		} catch (error) {
			console.error('Error fetching babies:', error);
			throw error;
		}
	}

	/**
	 * Fetches a single baby by ID
	 * @param babyId The ID of the baby to fetch
	 * @returns Promise with the baby details
	 */
	async getBabyById(babyId: string): Promise<ExtendedBaby> {
		try {
			// Pass true for authenticated parameter to include the token
			return await apiClient.get<ExtendedBaby>(`/baby/${babyId}`, true);
		} catch (error) {
			console.error(`Error fetching baby with ID ${babyId}:`, error);
			throw error;
		}
	}

	/**
	 * Fetches tasks for a specific baby
	 * @param babyId The ID of the baby to fetch tasks for
	 * @returns Promise with the list of tasks
	 */
	async getBabyTasks(babyId: string): Promise<BabyTask[]> {
		try {
			// Pass true for authenticated parameter to include the token
			return await apiClient.get<BabyTask[]>(`/task/baby/${babyId}`, true);
		} catch (error) {
			console.error(`Error fetching tasks for baby with ID ${babyId}:`, error);
			throw error;
		}
	}

	/**
	 * Fetches all tasks for the user
	 * @returns Promise with the list of all tasks
	 */
	async getAllTasks(): Promise<BabyTask[]> {
		try {
			// Pass true for authenticated parameter to include the token
			return await apiClient.get<BabyTask[]>('/task', true);
		} catch (error) {
			console.error('Error fetching all tasks:', error);
			throw error;
		}
	}

	/**
	 * Creates a new baby for the logged in user
	 * @param babyData The baby data to create
	 * @returns Promise with the created baby
	 */
	async createBaby(babyData: CreateBabyPayload): Promise<ExtendedBaby> {
		try {
			// Pass true for authenticated parameter to include the token
			return await apiClient.post<ExtendedBaby>('/baby', babyData, true);
		} catch (error) {
			console.error('Error creating baby:', error);
			throw error;
		}
	}

	/**
	 * Deletes a baby by ID
	 * @param babyId The ID of the baby to delete
	 * @returns Promise indicating success
	 */
	async deleteBaby(babyId: string): Promise<void> {
		try {
			// Send babyId in the payload as requested by the API
			const payload: DeleteBabyPayload = { babyId };
			await apiClient.delete('/baby', payload, true);
		} catch (error) {
			console.error('Error deleting baby:', error);
			throw error;
		}
	}

	/**
	 * Creates a new task
	 * @param taskData The task data to create
	 * @returns Promise with the created task
	 */
	async createTask(taskData: CreateTaskPayload): Promise<BabyTask> {
		try {
			// Pass true for authenticated parameter to include the token
			return await apiClient.post<BabyTask>('/task', taskData, true);
		} catch (error) {
			console.error('Error creating task:', error);
			throw error;
		}
	}

	/**
	 * Updates a task's completion status
	 * @param taskId The ID of the task to update
	 * @param updateData The data to update the task with
	 * @returns Promise with the updated task
	 */
	async updateTaskCompletion(
		taskId: string,
		updateData: UpdateTaskCompletionPayload
	): Promise<BabyTask> {
		try {
			// Pass true for authenticated parameter to include the token
			return await apiClient.patch<BabyTask>(
				`/task/${taskId}`,
				updateData,
				true
			);
		} catch (error) {
			console.error(`Error updating task with ID ${taskId}:`, error);
			throw error;
		}
	}
}

export const babyService = new BabyService();
