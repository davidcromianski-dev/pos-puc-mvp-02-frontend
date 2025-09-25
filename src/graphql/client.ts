import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;