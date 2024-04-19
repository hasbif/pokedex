'use client'

import CardList from "@/components/card-list";
import Header from "@/components/header";
import { client } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { Stack } from "@chakra-ui/react";
import { ListProvider } from "./provider";

export default function Home() {
  return (
    <ApolloProvider client={client()}>
      <ListProvider>
        <Header />
        <Stack width='100%' p='8'>
          <CardList />
        </Stack>
      </ListProvider>
    </ApolloProvider>
  );
}
