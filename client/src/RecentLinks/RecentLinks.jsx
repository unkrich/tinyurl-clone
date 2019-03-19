import React from 'react';
import { connect } from 'react-redux';

import './RecentLinks.css'

class RecentLinks extends React.Component {
    constructor(props) {
        super(props);

        this.copyUrl = this.copyUrl.bind(this);
    }

    copyUrl(str) {
      var el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style = {position: 'absolute', left: '-9999px'};
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }

    render() {
      const { urls } = this.props;
      return (
        <div>
          {urls.loading && <em>Loading urls...</em>}
          {urls.error && <span className="text-danger">ERROR: {urls.error}</span>}
          {urls.items && urls.items.length > 0 &&
            <section id="recent-links">
              <div className="lead row">
                <div className="card col-md-8 offset-md-2">
                  <div className="card-header">
                    Most Recent Links
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {urls.items.slice(urls.items.length - Math.min(urls.items.length, 3),urls.items.length).reverse().map((url, index) =>
                          <li className="list-group-item" key={index}>
                            <a href={url.originalUrl} className="title" target="_blank" rel="noopener noreferrer">{url.title}</a>
                            <a href={url.originalUrl} className="link" target="_blank" rel="noopener noreferrer">{url.originalUrl}</a>
                            <div className="short-link-row">
                              <div className="float-left">   
                                <a href={"https://unkri.ch/" + url._id} className="short-link" target="_blank" rel="noopener noreferrer">https://unkri.ch/{url._id}</a>
                                <button type="button" className="btn btn-outline-info" onClick={() => {this.copyUrl("https://unkri.ch/" + url._id)}}>Copy</button>
                              </div>
                              <div className="float-right">
                                # Clicks: {url.numVisits}
                              </div>
                            </div>
                          </li>
                        )}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          }
        </div>
      );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedRecentLinks = connect(mapStateToProps)(RecentLinks);
export { connectedRecentLinks as RecentLinks }; 