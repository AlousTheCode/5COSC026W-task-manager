import { useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import TaskForm from '../components/TaskForm';

export default function TasksPage() {
  // Extract all needed actions from the store, including the new toggle and delete functions
  const { 
    tasks, isLoading, error, loadTasks,
    searchQuery, filterStatus, filterPriority,
    setSearchQuery, setFilterStatus, setFilterPriority,
    toggleTaskStatus, deleteTask
  } = useTaskStore();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' 
      ? true 
      : filterStatus === 'completed' 
        ? task.completed 
        : !task.completed;
        
    const matchesPriority = filterPriority === 'all' 
      ? true 
      : task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center', fontSize: '1.2rem' }}>Loading tasks... Please wait.</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', color: 'red', textAlign: 'center' }}><strong>Error:</strong> {error}</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Task Management</h1>
      
      <TaskForm />
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', flex: 1, minWidth: '200px' }}
        />
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'pending')}
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <select 
          value={filterPriority} 
          onChange={(e) => setFilterPriority(e.target.value as 'all' | 'low' | 'medium' | 'high')}
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
            No tasks found matching your criteria.
          </p>
        ) : (
          filteredTasks.map((task) => (
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
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </h3>
              <p style={{ margin: '0 0 1rem 0', color: '#4b5563' }}>{task.description}</p>
              
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                <span><strong>Priority:</strong> {task.priority.toUpperCase()}</span>
                <span><strong>Due:</strong> {task.dueDate}</span>
                <span><strong>Status:</strong> {task.completed ? '✅ Completed' : '⏳ Pending'}</span>
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={() => toggleTaskStatus(task.id)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    backgroundColor: task.completed ? '#f59e0b' : '#10b981', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {task.completed ? 'Mark Pending' : 'Mark Completed'}
                </button>
                <button 
                  onClick={() => deleteTask(task.id)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    backgroundColor: '#ef4444', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}