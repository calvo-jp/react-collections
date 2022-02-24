import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import Landing from './pages/Landing';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <GlobalStyle />
    </>
  );
};

export default App;
