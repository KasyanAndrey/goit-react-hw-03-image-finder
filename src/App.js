import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

import './App.css';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div className="container">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {searchQuery && <ImageGallery searchQuery={searchQuery} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
