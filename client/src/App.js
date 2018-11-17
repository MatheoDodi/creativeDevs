import React, { Component, Fragment } from 'react';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Landing />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
