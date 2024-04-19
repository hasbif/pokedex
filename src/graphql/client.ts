import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';

export const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache(),
});

export const serverClient = new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta')