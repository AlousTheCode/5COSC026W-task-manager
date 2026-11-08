import type { Task } from '../types';
export const taskService = {
  // Read operation (Fetch all tasks)
  fetchTasks: async (): Promise<Task[]> => {
    // Simulate API delay for loading state (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await fetch('/data/tasks.json');
    
    if (!response.ok) {
      throw new Error('Failed to fetch tasks from the server.');
    }
    
    const data: Task[] = await response.json();
    return data;
  }
};