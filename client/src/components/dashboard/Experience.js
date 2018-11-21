import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Experience extends Component {
  render() {
    const experiece = this.props.exp.map(exp => (
      <tr key={exp.id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          {exp.from} - {exp.to}
        </td>
        <td>
          <button className="btn btn-info">Delete</button>
        </td>
      </tr>
    ));
    return (
      <div className>
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
          <tbody>{experiece}</tbody>
        </table>
      </div>
    );
  }
}

export default connect()(withRouter(Experience));
