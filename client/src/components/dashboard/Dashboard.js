import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetCurrentProfile());
  }

  render() {
    return <div>Dashboard</div>;
  }
}

export default connect()(Dashboard);
