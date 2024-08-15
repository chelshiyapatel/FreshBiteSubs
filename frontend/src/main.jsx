import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { AuthProvider } from './context/AuthContext.jsx';

// Here I create a new ApolloClient instance
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',  // This is GraphQL server endpoint
  cache: new InMemoryCache(), // Here I set Apollo cache
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // Here I provide ApolloClient to the entire application
  <ApolloProvider client={client}> 
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider> 
  </ApolloProvider>
);
