import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

class Experience extends Component {
  render() {
    const { exp } = this.props;
    const experience = exp.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD" date={exp.from} /> -
          {exp.to ? <Moment format="YYYY/MM/DD" date={exp.to} /> : 'Present'}
        </td>
        <td>
          <button className="btn btn-info">Delete</button>
        </td>
      </tr>
    ));
    console.log(experience);
    return (
      <div>
        <h4 className="mb-4">Experience</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

export default connect()(withRouter(Experience));
