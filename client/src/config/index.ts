const DEBUG = process.env.NODE_ENV === 'development';

const ENDPOINT = DEBUG ? 'http://localhost:8000/graphql' : '';

const config = {
  /** true if NODE_ENV is set to development */
  DEBUG,
  /** graphql server url */
  ENDPOINT,
};

export default config;
