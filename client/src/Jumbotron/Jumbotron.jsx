import React from 'react';
import { connect } from 'react-redux';
import { urlActions } from '../_actions';

import './Jumbotron.css'

class Jumbotron extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          urlToShorten: '',
          submitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { urlToShorten } = this.state;
        this.setState({ submitted: true, urlToShorten: '' });
        const { dispatch } = this.props;
        if (urlToShorten) {
            dispatch(urlActions.create(urlToShorten));
        }
    }

    render() {
        const { urlToShorten } = this.state;
        return (
          <div className="jumbotron text-white">
            <div className="container">
              <div className="row">
                <div className="col-xl-9 mx-auto">
                  <h1 className="cover-heading">Generate & Track Personalized Short Links</h1>
                  <p className="lead">Personalize, track and optimize every link with unkri.ch, a personalized short link generator.</p>
                </div>
                <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                 <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                      <input type="text" name="urlToShorten" value={urlToShorten} onChange={this.handleChange} className="form-control" placeholder="Insert URL to shorten here..." aria-label="Insert URL to shorten here..." aria-describedby="basic-addon2" />
                      <div className="input-group-append">
                        <input type="submit" className="btn btn-outline-secondary" value="Shorten" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedJumbotron = connect(mapStateToProps)(Jumbotron);
export { connectedJumbotron as Jumbotron }; 