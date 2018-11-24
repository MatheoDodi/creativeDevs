import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props;

    const experienceItems = experience.map(expItem => (
      <li key={expItem._id} className="list-group-item">
        <h4>{expItem.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD" date={expItem.from} />
          {' - '}
          {expItem.current ? (
            'Present'
          ) : (
            <Moment format="YYYY/MM/DD" date={expItem.to} />
          )}
        </p>
        <p>
          <strong>Position:</strong> {expItem.title}
        </p>
        <p>
          <strong>Description:</strong> {expItem.description}
        </p>
      </li>
    ));
    const educationItems = education.map(eduItem => (
      <li className="list-group-item">
        <h4>{eduItem.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD" date={eduItem.from} />
          {' - '}
          {eduItem.current ? (
            'Present'
          ) : (
            <Moment format="YYYY/MM/DD" date={eduItem.to} />
          )}
        </p>
        <p>
          <strong>Degree: </strong>
          {eduItem.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {eduItem.fieldofstudy}
        </p>
        <p>
          <strong>Description:</strong> {eduItem.description}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-danger">Experience</h3>
          <ul className="list-group">{experienceItems}</ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-danger">Education</h3>
          <ul className="list-group">{educationItems}</ul>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
