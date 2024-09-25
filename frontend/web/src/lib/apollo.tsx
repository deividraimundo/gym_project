"use client";
import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const apolloUri =
  typeof window === "undefined"
    ? "http://localhost:8080/api/graphql"
    : "/api/graphql";

function makeClient() {
  const httpLink = new HttpLink({
    uri: apolloUri,
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
