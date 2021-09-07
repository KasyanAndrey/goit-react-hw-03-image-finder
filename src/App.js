import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import QueryInfo from './components/QueryInfo';
import Searchbar from './components/Searchbar';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <QueryInfo searchQuery={this.state.searchQuery} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;

// const API_KEY = '20167067-fa9a23327fba47dd7ecb29229';
// const BASE_URL = 'https://pixabay.com/api/';
// let queryParams = '?q=query&page=1';

/* state = {
    apiKey: '20167067-fa9a23327fba47dd7ecb29229',
    url: 'https://pixabay.com/api/',
    searcQuery: '',
    page: 1,
    images: null,
    loading: false,
  };

  componentDidMount() {
    const { url, searcQuery, page, apiKey } = this.state;
    this.setState({ loading: true });

    fetch(
      `${url}?q=${searcQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(response => response.json())
      .then(images => this.setState({ images }))
      .finally(() => this.setState({ loading: false }));
  } */
