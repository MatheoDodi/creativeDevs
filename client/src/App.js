import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, handleLogoutUser } from './actions/authActions';
import { clearProfile } from './actions/profileActions';
import { store } from './store';
import jwt_decode from 'jwt-decode';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/common/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import PrivateRoute from './components/common/PrivateRoute';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(handleLogoutUser());
    store.dispatch(clearProfile);
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
            </div>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
