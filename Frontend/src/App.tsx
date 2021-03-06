import MovieSearch from "./components/MovieSearch";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://it2810-37.idi.ntnu.no:4000/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <MovieSearch />
    </ApolloProvider>
  );
}

export default App;
