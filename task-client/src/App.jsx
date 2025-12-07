import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './pages/TodoList.jsx';
import MainLayout from './layouts/MainLayout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout><TodoList /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
