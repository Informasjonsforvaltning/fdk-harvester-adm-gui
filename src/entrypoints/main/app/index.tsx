import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import ThemeProvider from '@fellesdatakatalog/theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import env from '../../../env';

import AuthProvider from '../../../providers/auth';

import store from '../redux/store';

import GlobalStyles from '../styles';

import Router from '../router';

const { FDK_CMS_BASE_URI } = env;

const client = new ApolloClient({
  uri: `${FDK_CMS_BASE_URI}/graphql`,
  cache: new InMemoryCache()
});

const App: FC = () => (
  <ThemeProvider>
    <GlobalStyles />
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ReduxProvider>
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
