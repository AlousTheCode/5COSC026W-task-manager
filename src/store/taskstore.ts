import { create } from 'zustand';
import { Task } from '../types';
import { taskService } from '../services/taskService';

// Store'un içinde hangi verilerin ve fonksiyonların olacağını tanımlıyoruz
interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  loadTasks: () => Promise<void>;
}

// Zustand hook'umuzu oluşturuyoruz
export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  // Veriyi çeken ve loading/error durumlarını yöneten aksiyon
  loadTasks: async () => {
    // İşlem başlarken loading state'i aktifleştir ve eski hataları temizle
    set({ isLoading: true, error: null });
    
    try {
      const data = await taskService.fetchTasks();
      // Veri başarıyla gelirse loading'i kapat ve veriyi kaydet
      set({ tasks: data, isLoading: false });
    } catch (error) {
      // Hata olursa loading'i kapat ve hatayı kaydet
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  }
}));