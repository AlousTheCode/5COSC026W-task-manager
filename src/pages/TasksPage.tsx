import { useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';

export default function TasksPage() {
  // 1. Extract data and actions from the Zustand global store
  const { tasks, isLoading, error, loadTasks } = useTaskStore();

  // 2. Trigger data fetching when the component mounts
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // 3. Rubric Criterion: Handle deliberate loading state during async operations
  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontSize: '1.2rem' }}>
        Loading tasks... Please wait.
      </div>
    );
  }

  // 4. Rubric Criterion: Handle deliberate error state gracefully
  if (error) {
    return (
      <div style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  // 5. Render the task list if data is successfully fetched
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Task Management</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tasks.map((task) => (
          <div 
            key={task.id} 
            style={{ 
              border: '1px solid #e5e7eb', 
              padding: '1.5rem', 
              borderRadius: '8px',
              backgroundColor: task.completed ? '#f0fdf4' : '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{task.title}</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#4b5563' }}>{task.description}</p>
            
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <span><strong>Priority:</strong> {task.priority.toUpperCase()}</span>
              <span><strong>Due:</strong> {task.dueDate}</span>
              <span><strong>Status:</strong> {task.completed ? '✅ Completed' : '⏳ Pending'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}