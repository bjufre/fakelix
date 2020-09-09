import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import Container from '../../core/components/Container';

const Header = ({ wishlistCount }) => (
  <Container>
    <header className="movies-header">
      <div className="header-left">
        <Link to="/">
          <div id="logo">
            <img src='/static/img/logo.svg' alt="Marvel Comics" />
          </div>
        </Link>

        <nav className="navigation" role="navigation">
          <ul>
            <li>
              <NavLink exact activeClassName="active" to="/">Movies</NavLink>
            </li>
            {/* <li>
              <NavLink exact activeClassName="active" to="/tv-shows">TV Shows</NavLink>
            </li> */}
          </ul>
        </nav>
      </div>

      <div className="header-right">
        <NavLink exact activeClassName="active" to="/wishlist" className="wishlist-link">
          {/* TODO: Make this change color based on whether we have items in the wishlist */}
          <i aria-hidden className="fas fa-heart"/> Wishlist
          {wishlistCount > 0 ? <small className="wishlist-count">({wishlistCount})</small> : null}
        </NavLink>
      </div>
    </header>
  </Container>
);

export default Header;
