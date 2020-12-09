import React from 'react';
import PropTypes from 'prop-types';
import IconSVG from './IconSVG';
import { logout } from '../../services/authentication';

export default function Menu() {
  return (
    <div className="menu dropdown">
      <button
        data-toggle="dropdown"
        aria-haspopup="true"
        className="menu-button"
        type="button"
        id="dropdownMenuButton"
        aria-expanded="false"
      >
        <IconSVG icon="th-menu" height="4rem" width="4rem" fill="#224074" />
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="/profile">
          Your profile
        </a>
        <a className="dropdown-item" href="/security">
          Your security
        </a>
        <div className="dropdown-divider" />
        <a
          className="dropdown-item menu-sign-out"
          href="/login"
          onClick={logout}
        >
          Sign out
        </a>
      </div>
    </div>
  );
}
