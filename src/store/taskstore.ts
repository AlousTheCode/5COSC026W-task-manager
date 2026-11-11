import { create } from 'zustand';
import type { Task } from '../types';
import { taskService } from '../services/taskService';

// Define the shape of the store's state, including filters and search
interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  
  // Filter and search states
  searchQuery: string;
  filterStatus: 'all' | 'completed' | 'pending';
  filterPriority: 'all' | 'low' | 'medium' | 'high';
  
  // Actions
  loadTasks: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: 'all' | 'completed' | 'pending') => void;
  setFilterPriority: (priority: 'all' | 'low' | 'medium' | 'high') => void;
}

// Create the Zustand store hook
export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,
  
  // Initial filter states
  searchQuery: '',
  filterStatus: 'all',
  filterPriority: 'all',

  // Action to fetch data
  loadTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await taskService.fetchTasks();
      set({ tasks: data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },

  // Actions to update filters
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  setFilterPriority: (priority) => set({ filterPriority: priority }),
}));