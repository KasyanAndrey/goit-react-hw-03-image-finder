import React, { Component } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  onSubmit = event => {
    event.preventDefault();
    
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;

    if (searchQuery.trim() === '') {
      toast.error('Enter what you need to find.');
      return;
    }

    onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.onSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            name="searchQuery"
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
