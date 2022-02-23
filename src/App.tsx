import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import styled from 'styled-components';
import Landing from './pages/Landing';

const Container = styled.div`
  min-height: 100vh;
  background-color: #1b262c;
  color: #bbe1fa;
`;

const App = () => {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
