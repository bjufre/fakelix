import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';

import Root from './Root';
import configureStore from './store';

import '../sass/index.sass';

const { store } = configureStore();

hydrate(
  <BrowserRouter>
    <Root store={store} />
  </BrowserRouter>,
  document.getElementById('root')
);
