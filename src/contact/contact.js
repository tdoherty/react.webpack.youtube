import React, { Component } from 'react';

export default class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      avatar: 'http://photos4.meetupstatic.com/photos/member/5/1/7/e/member_249560862.jpeg',
      links: [

      ]
    }
  }

  render() {
    var url='', target='',text='';
    return (
      <div id="mainContent">
        <img src={this.state.avatar} className="img-polaroid" style={{'float': 'left', 'marginRight': '15px'}} />
        <div style={{'float': 'left', 'width': '800px'}}>
          <h3>Tim Doherty</h3>
          <p>I'm a software engineer, avid SCUBA diver, amateur underwater photographer, and occasional musician living in
              southern California. My passion is solving problems and building things with technology.</p>

          <ul className="unstyled">
              <li className="contactLink">
                <a className="btn btn-small" href={url} target={target}>{text}</a>
              </li>
          </ul>
        </div>
      </div>
    );
  }
}


