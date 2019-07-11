import React from 'react';
import OctocatList from './components/OctocatList';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:8080/graphql/'
})

const client = new ApolloClient ({
  cache,
  link,
})

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Liste des Octocats</h1>
          <OctocatList/>
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
