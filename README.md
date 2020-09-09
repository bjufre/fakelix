# Fakelix

![Fakelix](./fakelix.png)

React App that uses the [TheMovieDatabaseAPI](https://developers.themoviedb.org/3/getting-started/introduction) to display some interesting movies as well as some of their characteristics.

This project is perfect if you want to see React + Redux in action as well as how to implement Redux with Redux Observable, and also see some playful things with Rxjs.

For example, to see some of the power involved with reactive programming.
We can take a closer look at the Movies Epic where we can see a small portion of the
functionality that they give us; like dispatching in a "fan-out" approach multiple actions
after completing another.


###### This project was created manually without any helper or boilerplate of a third-party.

---

### Main Tech :heart:

* [React](https://reactjs.org/)
* [React Router](https://reacttraining.com/react-router/)
* [Redux](https://github.com/reactjs/redux)
* [Redux Observable](https://github.com/redux-observable/redux-observable)
* [Rxjs](http://reactivex.io/rxjs/)
* [React Helmet](https://github.com/nfl/react-helmet)
* [Jest](https://jestjs.io/): Same as before, didn't quite get to it due to time constraints.


### Install
In order to play around with this app, go ahead and clone the repo into your machine:
```bash
# Go to your preferred path and run:
git clone https://github.com/bjufre/fakelix.git

cd fakelix
```

### Run it locally
If what you want is to see the application in action, run:
```bash
# Yarn users
yarn
yarn start
```

### Run the tests
To run the tests run:
```bash
# NPM users:
npm run test

# Yarn users:
yarn test
```

### Improvements / TODO(s):
- [ ] Add `Error Component` taking advantage of React Error Boundaries.
- [ ] Add `PropTypes` to be sure.
- [ ] Improve SSR
- [ ] Clean a little bit more the code for the store, maybe normalizing a bit more the separation between "genres - movies"
  - Good enough for now
