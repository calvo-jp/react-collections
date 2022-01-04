import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '@fontsource/ibm-plex-sans/100.css';
import '@fontsource/ibm-plex-sans/200.css';
import '@fontsource/ibm-plex-sans/300.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import config from './config';
import Landing from './pages/Landing';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

const apolloClient = new ApolloClient({
  uri: config.ENDPOINT,
  cache: new InMemoryCache(),
});
