import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Core from './core';
import Movie from './movie';
import Movies from './movies';
import Container from './core/components/Container';
import Wishlist from './wishlist';

const Root = ({ store }) => (
  <Provider store={store}>
    <Core>
      <Switch>
        <Route exact path="/">
          <Movies />
        </Route>
        <Route path="/movies/:genre/:id">
          <Movie />
        </Route>
        <Route path="/tv-shows">
          <Container>
            <h1>TV Shows</h1>
            <p>Cooming soon!</p>
          </Container>
        </Route>
        <Route path="/wishlist">
          <Wishlist />
        </Route>
      </Switch>
    </Core>
  </Provider>
);

export default Root;
