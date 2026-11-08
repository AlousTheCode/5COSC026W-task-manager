import { create } from 'zustand';
import type { Task } from '../types';
import { taskService } from '../services/taskService';

// Define the shape of the store's state and actions
interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  loadTasks: () => Promise<void>;
}

// Create the Zustand store hook
export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  // Action to fetch data and manage loading/error states
  loadTasks: async () => {
    // Activate loading state and clear any previous errors before fetching
    set({ isLoading: true, error: null });
    
    try {
      const data = await taskService.fetchTasks();
      // If successful, save data and disable loading state
      set({ tasks: data, isLoading: false });
    } catch (error) {
      // If an error occurs, save the error message and disable loading state
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  }
}));