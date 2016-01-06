import React, { Component } from 'react';

export default class NowPlaying extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var src = `http://www.youtube.com/embed/${this.props.nowPlaying}`;
    return (
      <iframe width="560" height="386"
        src={src}
        allowfullscreen style={{'border': '1px solid black'}}></iframe>
    );
  }
}
