import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { HomePage } from '../HomePage';
import { RedirectHandler } from '../RedirectHandler';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
          <div>
              {alert.message &&
                  <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <Router history={history}>
                  <div>
                      <Route exact path="/" component={HomePage} />
                      <Route path="/:hash" component={RedirectHandler} />
                  </div>
              </Router>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 