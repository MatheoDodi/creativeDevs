import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { handleDeleteEducation } from '../../actions/profileActions';

class Education extends Component {
  render() {
    const { edu } = this.props;
    const education = edu.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="YYYY/MM/DD" date={edu.from} /> -{' '}
          {edu.to ? <Moment format="YYYY/MM/DD" date={edu.to} /> : 'Present'}
        </td>
        <td>
          <button
            onClick={() => this.props.dispatch(handleDeleteEducation(edu._id))}
            className="btn btn-info"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

export default connect()(Education);
