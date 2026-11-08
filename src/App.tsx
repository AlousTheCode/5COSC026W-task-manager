import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';

export default function App() {
  return (
    <Router>
      <div>
        {/* Basit bir üst menü (Navigation Bar) */}
        <nav style={{ padding: '1rem', backgroundColor: '#f3f4f6', marginBottom: '1rem' }}>
          <Link to="/" style={{ marginRight: '1rem', fontWeight: 'bold', color: '#333', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/tasks" style={{ fontWeight: 'bold', color: '#333', textDecoration: 'none' }}>Tasks</Link>
        </nav>

        {/* URL'ye göre hangi sayfanın gösterileceğini belirleyen kısım */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </div>
    </Router>
  );
}