import { create } from 'zustand';
import type { Task } from '../types';
import { taskService } from '../services/taskService';

// Define the shape of the store's state and actions
interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  
  searchQuery: string;
  filterStatus: 'all' | 'completed' | 'pending';
  filterPriority: 'all' | 'low' | 'medium' | 'high';
  
  loadTasks: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: 'all' | 'completed' | 'pending') => void;
  setFilterPriority: (priority: 'all' | 'low' | 'medium' | 'high') => void;
  
  // Action to add a new task (omits ID since we generate it)
  addTask: (newTask: Omit<Task, 'id'>) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,
  
  searchQuery: '',
  filterStatus: 'all',
  filterPriority: 'all',

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

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  setFilterPriority: (priority) => set({ filterPriority: priority }),

  // Add a new task to the beginning of the list with an auto-generated ID
  addTask: (newTask) => set((state) => {
    const taskWithId: Task = {
      ...newTask,
      id: crypto.randomUUID(), // Generate a unique ID natively
    };
    return { tasks: [taskWithId, ...state.tasks] };
  }),
}));