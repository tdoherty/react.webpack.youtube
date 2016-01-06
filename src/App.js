import React, { Component } from 'react';
import Search from './search';
import SearchResults from './search-results';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      term: ""
    };
  }

  onSearch(term) {
    this.setState({ term: term });
  }

  render() {
    return (
      <div>
        <h1>{this.state.term}</h1>
        <Search search={this.onSearch.bind(this)}/>
        <SearchResults term={this.state.term}/>
      </div>
    );
  }
}
