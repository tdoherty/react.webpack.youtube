import React, { Component } from 'react';
import $ from 'jquery';

export default class SearchResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      startIndex: 1,
      term: props.term
    };

    // this.doSearch(this.state.term);

  }

  // handleTermEvent(e) {
  //   this.setState({ term: e.target.value });
  // }

  // handleTermSubmit(e) {
  //   e.preventDefault();

  //   this.props.search(this.state.term);
  //   this.doSearch(this.state.term);
  //   // this.setState({term: ""});

  // }

  componentWillReceiveProps(props) {
    this.setState({ term: props.term });
    this.doSearch(props);
  }

  componentWillUpdate() {
  }

  doSearch(nextProps) {
    return $.get(this.url(nextProps)).done(this.onSearchComplete);
  }

  onSearchComplete(data) {
    this.setState({ results: data });
  }

  url (nextProps) {
    return 'http://gdata.youtube.com/feeds/videos?vq=' + nextProps.term + '&format=5&max-results=20&start-index=' +
      this.state.startIndex + '&alt=json-in-script';
  }

  render() {
    return (
        <div>
          {this.state.results.map((el) => {
            return (
              <div>
                <div class="yt-lockup2-thumbnail">
                  <a class="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink contains-addto" href="#/nowplaying/{ el.statesource }">
                      <span class="video-thumb ux-thumb yt-thumb-default-185 ">
                          <span class="yt-thumb-clip">
                              <span class="yt-thumb-clip-inner">
                                  <img width="185" src="{el.statethumbnail}" alt="Thumbnail" />
                                  <span class="vertical-align"></span>
                              </span>
                          </span>
                      </span>
                      <span class="video-time">{el.duration}</span>
                  </a>
                </div>

                <div class="yt-lockup2-content">
                  <h5 class="yt-lockup2-title" style="margin:0;">
                    <a href="#/nowplaying/{el.source }" title="{this.state.title.$t }">{el.title.$t}</a>
                  </h5>

                  <p class="yt-lockup2-meta"> by <strong>{el.authorName}</strong>
                    <span class="metadata-separator">•</span>
                    1 year ago
                    <span class="metadata-separator">•</span>
                    {el.yt$statistics.viewCount} views
                  </p>

                  <p dir="ltr" class="yt-lockup2-description">{el.description}</p>

                  <div class="yt-lockup2-badges">
                    <ul class="item-badge-line">
                        <li class="item-badge-label ">HD</li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}