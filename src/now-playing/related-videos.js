import React, { Component } from 'react';
import moment from 'moment';

export default class RelatedVideos extends Component {

  constructor(props) {
    super(props);
  }

  handleNowPlaying(video) {
    this.props.onNowPlaying(video);
  }

  render() {
    return (
      <ul className="unstyled" id="relatedVideos">
        {this.props.relatedVideos.map((el, index) => {
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
