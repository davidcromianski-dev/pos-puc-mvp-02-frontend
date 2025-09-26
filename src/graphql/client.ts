import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

const authLink = new SetContextLink(({ headers }) => {
  // get the authentication token from cookies or local storage
  let token = "";
  
  if (typeof window !== "undefined") {
    // Client-side: try localStorage first, then cookies
    try {
      token = localStorage.getItem("token") || "";
      
      // If not in localStorage, try to get from cookies
      if (!token) {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
        if (tokenCookie) {
          token = tokenCookie.split('=')[1];
        }
      }
    } catch (error) {
      // Handle cases where localStorage might not be available
      console.warn("Error accessing localStorage:", error);
    }
  }
  
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Error link to handle authentication errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      
      // Check if the error is authentication related
      if (message.includes("Authentication required") || message.includes("Unauthorized")) {
        // Dispatch a custom event to trigger the auth error dialog
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth-error"));
        }
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    
    // Check if the network error is authentication related
    if (networkError.message.includes("401") || networkError.message.includes("Unauthorized")) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth-error"));
      }
    }
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;