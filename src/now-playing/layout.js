import React, { Component } from 'react';
import Search from '../search/search';
import NowPlaying from './now-playing';

export default class NowPlayingLayout extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="mainContent">
        <Search search={this.props.search}/>
        <NowPlaying nowPlaying={this.props.nowPlaying}
                    onNowPlaying={this.props.onNowPlaying}
                    relatedVideos={this.props.relatedVideos}
                    comments={this.props.comments} />
      </div>
    );
  }
}
