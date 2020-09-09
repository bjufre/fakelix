import React from "react";
import { connect } from "react-redux";
import cn from "classnames";

import { getWishlist } from "../store/reducers";
import Header from "./components/Header";

const Core = ({ isFetching, wishlistCount, children }) => (
  <div id="movie-app">
    <Header wishlistCount={wishlistCount} />

    {children}
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  wishlistCount: getWishlist(state).length,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Core);
