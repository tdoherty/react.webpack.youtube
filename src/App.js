import React, { Component } from 'react';
import Search from './search';
import SearchResults from './search-results';
import NowPlaying from './now-playing';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      term: "",
      nowPlaying: null
    };
  }

  onSearch(term) {
    this.setState({
      term: term,
      nowPlaying: null
    });
  }

  onNowPlaying(videoId) {
    this.setState({ nowPlaying: videoId });
  }

  render() {
    return (
      <div>
        <h1>{this.state.term}</h1>
        <Search search={this.onSearch.bind(this)}/>
        { !this.state.nowPlaying ?
            <SearchResults term={this.state.term} nowPlaying={this.onNowPlaying.bind(this)}/> : null }
        { this.state.nowPlaying ? <NowPlaying nowPlaying={this.state.nowPlaying} /> : null}
      </div>
    );
  }
}
