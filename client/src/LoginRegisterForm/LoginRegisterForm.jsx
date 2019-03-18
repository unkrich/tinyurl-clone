import React from 'react';
import { connect } from 'react-redux';
import { urlActions, userActions } from '../_actions';

import './LoginRegisterForm.css'

class LoginRegisterForm extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            register: false,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password, register } = this.state;

        const { dispatch } = this.props;
        if (email && password && !register) {
            dispatch(userActions.login(email, password)).then(() => {
              dispatch(urlActions.getAll());
            });
        } else if (email && password && register) {
            const user = {
              email: email,
              password: password
            };
            dispatch(userActions.register(user)).then(() => {
              dispatch(urlActions.getAll());
            });;
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, register, submitted } = this.state;
        return (
          <li class="dropdown">
            <button class="dropdown-toggle nav-link" data-toggle="dropdown"><b>Login | Register</b> <span class="caret"></span></button>
            <ul id="login-dp" class="dropdown-menu dropdown-menu-right">
              <li>
                 <div class="row">
                    <div class="col-md-12">
                      <div>
                       <form class="form" onSubmit={this.handleSubmit} id="login-nav">
                          <div class="form-group">
                            <label class="sr-only" for="exampleInputEmail2">Email</label>
                            <input type="email" className="form-control"  id="exampleInputEmail2" name="email" value={email} onChange={this.handleChange} placeholder="Email Address" />
                            {submitted && !email &&
                                <div className="help-block">Email address is required</div>
                            }
                          </div>
                          <div class="form-group">
                            <label class="sr-only" for="exampleInputPassword2">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword2" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                          </div>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-sm btn-secondary active" onClick={() => {this.setState({register: false})}} >
                              <input type="radio" id="option1" autocomplete="off" checked={register === false} /> Sign In
                            </label>
                            <label class="btn btn-sm btn-secondary" onClick={() => {this.setState({register: true})}} >
                              <input type="radio" id="option2" autocomplete="off" checked={register === true} /> Register
                            </label>
                          </div>
                          <div class="form-group">
                              <input type="submit" value="Go" class="btn btn-primary btn-block" />
                              {loggingIn &&
                                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="Loading..." />
                              }
                          </div>
                       </form>
                      </div>
                    </div>
                 </div>
              </li>
            </ul>
          </li>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, loggedIn } = state.authentication;
    return {
        loggingIn,
        loggedIn
    };
}

const connectedLoginRegisterForm = connect(mapStateToProps)(LoginRegisterForm);
export { connectedLoginRegisterForm as LoginRegisterForm }; 