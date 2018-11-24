import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileGithub extends Component {
  state = {
    clientId: 'b667cc4d9157a4a6f26a',
    clientSecret: '349e43b51e81234cb8dbe116734b06dfb2f1e840',
    count: 5,
    sort: 'created: asc',
    repos: []
  };

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ repos: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} class="card card-body mb-2">
        <div class="row">
          <div class="col-md-6">
            <h4>
              <Link to={repo.html_url} class="text-danger" target="_blank">
                {' '}
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div class="col-md-6">
            <span class="badge badge-danger mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span class="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span class="badge badge-success">Forks: {repo.forks_count}</span>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="mb-5">
        <hr />
        <h3 class="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

export default ProfileGithub;
