import React from 'react';
import { connect } from 'react-redux';
import { urlActions } from '../_actions';
import './DashboardSection.css'

class DashboardSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            urlToShorten: '',
            alias: '',
            submitted: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDelete(alias) {
      const { dispatch } = this.props;
      dispatch(urlActions._delete(alias));
    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit(e) {
      e.preventDefault();

      const { urlToShorten, alias } = this.state;
      this.setState({ 
        submitted: true, 
        urlToShorten: '',
        alias: ''
      });
      const { dispatch } = this.props;
      if (urlToShorten && alias) {
        dispatch(urlActions.create(urlToShorten, alias));
      } else if (urlToShorten) {
        dispatch(urlActions.create(urlToShorten));
      }
    }

    render() {
        const { urls } = this.props;
        const { urlToShorten, alias } = this.state;
        return (
            <div id="dashboard" className="mb-3">
              <div className="container">
                <div className="row">
                  <section role="main" className="col-md-12 px-4">
                    <h2>Generate Short Link</h2>
                    <hr />
                    <form id="short-links-alias" onSubmit={this.handleSubmit} className="row">
                      <div className="col-md-6">
                        <p>Shorten this Url:</p>
                        <div className="input-group mb-3">
                          <input type="text" name="urlToShorten" value={urlToShorten} onChange={this.handleChange} className="form-control" placeholder="Insert URL to shorten here..." aria-label="Insert URL to shorten here..." aria-describedby="basic-addon2" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <p>Alias (Optional):</p>
                        <p className="alias-name">unkri.ch/</p>
                        <div className="input-group mb-3 alias-input">
                          <input type="text" name="alias" value={alias} onChange={this.handleChange} className="form-control" placeholder="alias" aria-label="Insert URL to shorten here..." aria-describedby="basic-addon2" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <input className="btn btn-outline-secondary" type="submit" value="Shorten" />
                      </div>
                    </form>

                    <h2 className="pt-5 pb-2 mb-3 border-bottom">My Shortened URLs</h2>
                    <div className="table-responsive mb-5">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>URL</th>
                            <th>Alias</th>
                            <th># Visits</th>
                            <th>Date Created</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        {urls.loading && <em>Loading urls...</em>}
                        {urls.error && <span className="text-danger">ERROR: {urls.error}</span>}
                        {urls.items &&
                            <tbody>
                                {urls.items.map((url, index) =>
                                  <tr key={index}>
                                    <td>{url.title}</td>
                                    <td><a href={url.originalUrl}>{url.originalUrl}</a></td>
                                    <td><a href={"https://unkri.ch/" + url._id}>{url._id}</a></td>
                                    <td>{url.numVisits}</td>
                                    <td>{url.createdAt}</td>
                                    <td><button onClick={() => this.handleDelete(url._id)} className="link-button">X</button></td>
                                  </tr>
                                )}
                            </tbody>
                        }
                      </table>
                    </div>
                  </section>
                </div>
              </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedDashboardSection = connect(mapStateToProps)(DashboardSection);
export { connectedDashboardSection as DashboardSection }; 