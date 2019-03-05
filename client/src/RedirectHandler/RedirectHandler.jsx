import React from 'react'
import { Redirect } from 'react-router-dom'

// import { urlActions } from '../_actions';

class RedirectHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            originalUrl: '/'
        }

        this.setRedirect = this.setRedirect.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    setRedirect(hash) {
        const requestOptions = {
            method: 'GET'
        };

        var apiUrl = "http://localhost:4000";
        console.log(hash)

        var self = this;
        fetch(`${apiUrl}/urls/${hash}`, requestOptions)
        .then((resp) => resp.json())
        .then(function(data) {
            self.setState({
              redirect: true,
              originalUrl: data.originalUrl
            })
        });

        return <div></div>
    }

    renderRedirect() {
        if (this.state.redirect) {
            if (this.state.originalUrl !== undefined) {
                window.location.replace(this.state.originalUrl);
                return <div></div>;
            } else {
                return <Redirect to={'/'} />
            }
        }
        return null;
    }

    render() {
        const { hash } = this.props.match.params;
        return (
           <div>
                { this.setRedirect(hash) }
                { this.renderRedirect() }
           </div>
        )
    }
}

export { RedirectHandler }; 