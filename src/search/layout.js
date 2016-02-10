import React, { Component } from 'react';
import Search from './search';
import SearchResults from './search-results';

export default class SearchLayout extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="mainContent">
        <Search search={this.props.search}/>
        <SearchResults onNowPlaying={this.props.onNowPlaying}
                       searchResults={this.props.searchResults} />
      </div>
    );
  }
}
