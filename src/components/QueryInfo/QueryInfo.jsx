import React, { Component } from 'react';
import fetchAPI from '../../services/QueryApi';
import QueryErrorView from './QueryErrorView';
import ImageGallery from '../ImageGallery';
import QueryPending from '../Loader';

class QueryInfo extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });

      setTimeout(() => { 
        fetchAPI.queryApi(nextQuery)
          .then(data => data.hits)
          .then(images => this.setState({ images, status: 'resolved' }))
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1000);
    }
  }

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'pending') {
      return <QueryPending />;
    }

    if (status === 'rejected') {
      return <QueryErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return <ImageGallery images={images} />;
    }
  }
}

export default QueryInfo;

// ===============================================================
/* render() {
    const { images, loading, error } = this.state;
    return (
      <div>
        {error && <h2>{error.message}</h2>}
        {loading && <div>Loading...</div>}
        {images && (
          <ul>
            {images.map(({ id, webformatURL, tags }) => {
              return (
                <li key={id}>
                  <img src={webformatURL} alt={tags} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  } */
