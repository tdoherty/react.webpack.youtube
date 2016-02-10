import React, { Component } from 'react';
import Comments from './comments';
import RelatedVideos from './related-videos';

export default class NowPlaying extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var src = `http://www.youtube.com/embed/${this.props.nowPlaying.id}`;
    return (
      <div style={{ 'clear': 'both' }}>
        <div style={{ 'float': 'left', 'width': '600px' }}>
          <div className="nowPlaying" id="nowPlaying" >
            <iframe width="560" height="386"
              src={src}
              allowFullScreen style={{'border': '1px solid black'}}></iframe>
            <h4>{this.props.nowPlaying.snippet.title}</h4>
          </div>
          <Comments nowPlaying={this.props.nowPlaying}
                    comments={this.props.comments} />
        </div>
        <div style={{ 'float': 'left', 'marginLeft': '15px', 'width': '300px' }} className="related">
            <RelatedVideos onNowPlaying={this.props.onNowPlaying}
                           relatedVideos={this.props.relatedVideos} />
        </div>
      </div>
    );
  }
}
