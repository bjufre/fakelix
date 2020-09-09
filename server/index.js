import fs from 'fs';
import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import express from 'express';
import expressStatic from 'express-static';
import Root from '../src/Root';
import configureStore from '../src/store';
import { StaticRouter } from 'react-router-dom';
import { fetchMovies, fetchMovie } from '../src/store/actions';

const formatHTML = async (appStr, helmet) => {
  return new Promise((resolve, reject) => {
    fs.readFile('public/index.html', 'utf8', (err, data) => {
      if (err) return reject(err);
      let result = data.replace('<div id="root"></div>', `<div id="root">${appStr}</div>`);
      result = result.replace('<!-- helmet-title -->', helmet.title.toString());
      result = result.replace('<!-- helmet-meta -->', helmet.meta.toString());
      result = result.replace('<!-- helmet-link -->', helmet.link.toString());
      return resolve(result);
    });
  });
}

const app = express();

app.use('/static', expressStatic('public', { index: false }));

app.get('/*', async (req, res) => {
  const { store } = configureStore();
  const app = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <Root store={store} />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();
  // Trigger action to fetch
  const html = await formatHTML(app, helmet);

  return res.send(html);
});

app.listen(3000);
