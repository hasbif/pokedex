import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import fetch from 'cross-fetch'

export const client = ()=>{
  return new ApolloClient({
    link: new HttpLink({ uri: 'https://beta.pokeapi.co/graphql/v1beta', fetch }),
    // uri: 'https://beta.pokeapi.co/graphql/v1beta',
    cache: new InMemoryCache(),
  });
}

// const client = new ApolloClient({ link:  });