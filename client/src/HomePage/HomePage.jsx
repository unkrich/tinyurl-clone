import React from 'react';
import { connect } from 'react-redux';
import { urlActions } from '../_actions';

import { Navbar } from '../Navbar'
import { Jumbotron } from '../Jumbotron'
import { RecentLinks } from '../RecentLinks'
import { DashboardSection } from '../DashboardSection'
import './HomePage.css'

class HomePage extends React.Component {
    constructor(props) {
      super(props);

      this.shouldRenderDashboard = this.shouldRenderDashboard.bind(this);
    }

    componentDidMount() {
      this.props.dispatch(urlActions.getAll());
    }

    shouldRenderDashboard() {
      const { urls, loggedIn } = this.props;
      if (loggedIn) {
        return <DashboardSection urls={urls} />;
      } else {
        return <div></div>;
      }
    }

    render() {
        const { urls } = this.props;
        return (
          <div>
            <Navbar />
            <main role="main">
              <Jumbotron />
              <RecentLinks urls={urls} />
            </main>

            { this.shouldRenderDashboard() }

            <footer className="container text-center">
              <p>Built and <a href="https://github.com/unkrich/unkri.ch">open sourced</a> by <a href="http://kevinunkrich.com">Kevin Unkrich</a></p>
            </footer>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { urls, authentication } = state;
    const { user, loggedIn } = authentication;
    return {
        user,
        loggedIn,
        urls
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };