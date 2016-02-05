import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';

export default class RelatedVideos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      startIndex: 1,
      maxResults: 20
    };
  }

  componentWillReceiveProps(props) {
    this.doSearch(props);
  }

  componentWillMount() {
    this.doSearch(this.props);
  }

  handleNowPlaying(video) {
    this.props.nowPlaying(video);
  }

  doSearch(nextProps) {
    return $.get(this.url(nextProps)).done(this.getVideos.bind(this));
  }

  url (nextProps) {
    return `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${this.props.nowPlaying.id}&maxResults=${this.state.maxResults}&key=${this.props.ytKey}`;
  }

  getVideos(searchResults) {
    var videoIds = searchResults.items.reduce((prev, curr, idx) => prev + (prev ? ',' : '') + curr.id.videoId, '');
    var url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${this.props.ytKey}`;
    this.searchResults = searchResults; //for use later, without a setState call
    $.get(url).done(this.onSearchComplete.bind(this));
  }

  onSearchComplete(videos) {
    var completeResults = videos.items.map(video => {
      var searchResult = this.searchResults.items.find(result => result.id.videoId === video.id);
      if (searchResult) {
        video.snippet = searchResult.snippet;
      }
      return video;
    });
    this.setState({ results: completeResults });
  }

  render() {
    return (
      <ul className="unstyled" id="relatedVideos">
        {this.state.results.map((el, index) => {
          var videoUrl = `#/nowplaying/${el.id}`;
          // var duration = moment.duration(el.contentDetails.duration).asMinutes();
          var duration = moment.utc(moment.duration(el.contentDetails.duration).asMilliseconds()).format("HH:mm:ss");
          return (
            <li key={el.id} className="video-list-item">
              <a href='#/nowplaying/' onClick={this.handleNowPlaying.bind(this, el)}>
                  <span className="ux-thumb-wrap">
                      <span className="video-thumb ux-thumb yt-thumb-default-120 ">
                          <span className="yt-thumb-clip">
                              <span className="yt-thumb-clip-inner">
                                  <img width="120" alt="Thumbnail" src={el.snippet.thumbnails.default.url} />
                                  <span className="vertical-align">
                              </span>
                              </span>
                          </span>
                      </span>
                      <span className="video-time">{duration}</span>
                  </span>
                  <span className="title" title={el.snippet.title}>{el.snippet.title}</span>
                  {/*<span className="stat">by {{authorName}}</span>*/}
                  <span className="stat"> {el.statistics.viewCount} views </span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}