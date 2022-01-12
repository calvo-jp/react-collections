import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const server = new ApolloServer({ typeDefs, resolvers });

const serve = async () => {
  try {
    const details = await server.listen();
    console.log('Server running at %s', details.url);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

serve();
