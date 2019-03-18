import React from 'react';
import { connect } from 'react-redux';
import { urlActions, userActions } from '../_actions';

import { LoginRegisterForm } from '../LoginRegisterForm'
import './Navbar.css'

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.isAuthorized = this.isAuthorized.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
      this.props.dispatch(userActions.logout());
      this.props.dispatch(urlActions.getAll());
    }

    isAuthorized() {
      if (this.props.loggedIn) {
        return (
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <button className="nav-link" onClick={this.logout}><b>Logout</b></button>
            </li>
          </ul>
        )
      } else {
        return <LoginRegisterForm />;
      }
    }

    render() {
        return (
          <div className="container-fluid nav-grey">
            <div className="container d-flex p-3 mx-auto flex-column">
              <header className="masthead mb-auto">
                <div className="inner">
                  <h3 className="masthead-brand">unkri.ch</h3>
                  <nav className="nav nav-masthead justify-content-center">
                    <ul className="nav navbar-nav navbar-right">
                      { this.isAuthorized() }
                    </ul>
                  </nav>
                </div>
              </header>
            </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    };
}

const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar }; 