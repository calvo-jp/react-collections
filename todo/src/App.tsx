import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Todos from './pages/Todos';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/todos" element={<Todos />} />
        <Route path="*" element={<Navigate to="/todos" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
