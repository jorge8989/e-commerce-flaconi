import React, { Component } from 'react';
import './Header.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="https://www.flaconi.de">
            <img
              src="https://cdn.flaconi.de/themes/flaconi/assets/20180403150354/images/svg/logo-flaconi.svg"
              className="d-inline-block center"
              width="187px"
              height="38px"
              alt="Falconi Logo"
            />
          </a>
        </nav>
      </div>
    );
  }
}
