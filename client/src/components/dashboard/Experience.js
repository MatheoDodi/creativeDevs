import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { handleDeleteExperience } from '../../actions/profileActions';

class Experience extends Component {
  render() {
    const { exp } = this.props;
    const experience =
      exp.length > 0 ? (
        exp.map(exp => (
          <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
              <Moment format="YYYY/MM/DD" date={exp.from} /> -{' '}
              {exp.to ? (
                <Moment format="YYYY/MM/DD" date={exp.to} />
              ) : (
                'Present'
              )}
            </td>
            <td>
              <button
                onClick={() =>
                  this.props.dispatch(handleDeleteExperience(exp._id))
                }
                className="btn btn-info"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td>
            <small>You haven't added any experience yet</small>
          </td>
        </tr>
      );
    return (
      <div className="mb-5">
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

export default connect()(Experience);
