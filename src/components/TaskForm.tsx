import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';

export default function TaskForm() {
  // 1. Get the addTask function from our Zustand store
  const addTask = useTaskStore((state) => state.addTask);

  // 2. Local state for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');

  // 3. Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation: ensure title and date exist
    if (!title.trim() || !dueDate) return;

    // Send the new task to Zustand store
    addTask({
      title,
      description,
      priority,
      dueDate,
      completed: false, // New tasks are always pending initially
    });

    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
  };

  // 4. Render the form UI
  return (
    <form onSubmit={handleSubmit} style={{ 
      backgroundColor: '#f9fafb', 
      padding: '1.5rem', 
      borderRadius: '8px', 
      border: '1px solid #e5e7eb',
      marginBottom: '2rem' 
    }}>
      <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>Create New Task</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="text" 
          placeholder="Task Title (Required)" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
        />
        
        <textarea 
          placeholder="Task Description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
        />
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db', flex: 1 }}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          
          <input 
            type="date" 
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db', flex: 1 }}
          />
        </div>
        
        <button 
          type="submit"
          style={{ 
            padding: '0.75rem', 
            backgroundColor: '#2563eb', 
            color: 'white', 
            fontWeight: 'bold', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Task
        </button>
      </div>
    </form>
  );
}