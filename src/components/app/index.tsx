import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider as ReduxProvider } from 'react-redux';

import store from './redux/store';

import GlobalStyles from './styles';

import Header from '../header';
import Root from '../root';

export default hot(function App() {
  return (
    <>
      <GlobalStyles />
      <ReduxProvider store={store}>
        <Header />
        <Root />
      </ReduxProvider>
    </>
  );
});
