import React, { Component } from 'react';
import './App.css';

import ImageGallery from './components/ImageGallery';

class App extends Component {
  render() {
    return (
      <div className="container">
        <ImageGallery />
      </div>
    );
  }
}

export default App;
