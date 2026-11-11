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
  
  addTask: (newTask: Omit<Task, 'id'>) => void;
  // New actions for toggling status and deleting
  toggleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
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

  addTask: (newTask) => set((state) => {
    const taskWithId: Task = {
      ...newTask,
      id: crypto.randomUUID(),
    };
    return { tasks: [taskWithId, ...state.tasks] };
  }),

  // Map over tasks, flip the completed boolean if the ID matches
  toggleTaskStatus: (id) => set((state) => ({
    tasks: state.tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  })),

  // Filter out the task that matches the ID to delete it
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  })),
}));