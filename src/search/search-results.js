import React, { Component } from 'react';
import moment from 'moment';

export default class SearchResults extends Component {

  constructor(props) {
    super(props);
  }

  handleNowPlaying(video) {
    this.props.onNowPlaying(video);
  }

  render() {
    return (
      <section>
        <div className="primary-col">
          <ul className="unstyled" id="searchResults">
            {this.props.searchResults.map((el, index) => {
              var videoUrl = `#/nowplaying/${el.id}`;
              // var duration = moment.duration(el.contentDetails.duration).asMinutes();
              var duration = moment.utc(moment.duration(el.contentDetails.duration).asMilliseconds()).format("HH:mm:ss");
              return (
                <li key={el.id} className="yt-lockup2 yt-lockup2-video yt-uix-tile context-data-item clearfix">
                  <div>
                    <div className="yt-lockup2-thumbnail">
                      <a className="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink contains-addto" onClick={this.handleNowPlaying.bind(this, el)}>
                          <span className="video-thumb ux-thumb yt-thumb-default-185">
                              <span className="yt-thumb-clip">
                                  <span className="yt-thumb-clip-inner">
                                      <img width="185" src={el.snippet.thumbnails.default.url} alt="Thumbnail" />
                                      <span className="vertical-align"></span>
                                  </span>
                              </span>
                          </span>
                          <span className="video-time">{duration}</span>
                      </a>
                    </div>

                    <div className="yt-lockup2-content">
                      <h5 className="yt-lockup2-title" style={{'margin': 0}}>
                        <a href={videoUrl} title={el.snippet.title}>{el.snippet.title}</a>
                      </h5>

                      <p className="yt-lockup2-meta">
                        {/*by <strong>{el.authorName}</strong>
                        <span className="metadata-separator">•</span>
                        1 year ago*/}
                        <span className="metadata-separator">•</span>
                        {el.statistics.viewCount} views
                      </p>

                      <p dir="ltr" className="yt-lockup2-description">{el.snippet.description}</p>

                      {/*<div className="yt-lockup2-badges">
                        <ul className="item-badge-line">
                            <li className="item-badge-label">HD</li>
                        </ul>
                      </div>*/}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}
