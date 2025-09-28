import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

const authLink = new SetContextLink(({ headers }) => {
  let token = "";

  if (typeof window !== "undefined") {
    try {
      token = localStorage.getItem("token") || "";

      if (!token) {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
        if (tokenCookie) {
          token = tokenCookie.split('=')[1];
        }
      }
    } catch (error) {
      console.warn("Error accessing localStorage:", error);
    }
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      if (message.includes("Authentication required") || message.includes("Unauthorized")) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth-error"));
        }
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);

    if (networkError.message.includes("401") || networkError.message.includes("Unauthorized")) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth-error"));
      }
    }
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          myCurrentPokemon: {
            merge: false,
          },
          myPokemons: {
            merge: false,
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default client;