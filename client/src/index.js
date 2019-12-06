import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Cookies from 'js-cookie';
import { typeDefs, resolvers } from './resolvers'

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: httpLink,
    cache,
    typeDefs,
    resolvers
});

cache.writeData({
    data: {    
      isLoggedIn: !!Cookies.get('token'),
      user: {
          __typename: "User"
      }
    },
  });

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();