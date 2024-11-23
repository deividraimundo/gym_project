"use client";
import { HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const apolloUri = "/api/graphql";

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

function makeClient() {
  const httpLink = onError((e) => {
    const msg = e.graphQLErrors?.[0]?.message;
    if (msg === "Necessário estar logado" || msg === "RELOAD") {
      window.location.href = "/";
    }
  }).concat(
    new HttpLink({
      uri: apolloUri,
    })
  );

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
