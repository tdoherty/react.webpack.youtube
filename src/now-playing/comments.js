import React, { Component } from 'react';

export default class Comments extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var src = `http://www.youtube.com/embed/${this.props.nowPlaying.id}`;
    return (
      <div className='comments'>
        <ul className="unstyled" id="comments">
        {
          this.props.comments.items.map(comment => {
            var snippet = comment.snippet.topLevelComment.snippet;
            return (
              <li className="comment" key={comment.id}>
                <span>
                  <a className="yt-user-photo " href="/user/012013014">
                      <span className="video-thumb ux-thumb yt-thumb-square-48 ">
                          <span className="yt-thumb-clip">
                              <span className="yt-thumb-clip-inner">
                                  <img width="48" src={snippet.authorProfileImageUrl} alt="012013014" data-group-key="thumb-group-2" />
                                  <span className="vertical-align"></span>
                              </span>
                          </span>
                      </span>
                  </a>
                  <div className="content" style={{ 'marginLeft': '60px' }}>
                    <p className="metadata" style={{ 'margin': 0 }}>
                      <span className="author ">
                        <a dir="ltr" className="yt-uix-sessionlink yt-user-name " href="/user/012013014">{snippet.authorDisplayName}</a>
                      </span>
                        <span dir="ltr" className="time">
                          <a href="http://www.youtube.com/comment?lc=GNkUgBesuijmO2YuwmajMW8rHX89-lbqFZyJ4nPPmPs" dir="ltr">
                              {comment.snippet.topLevelComment.publishedAt}
                          </a>
                        </span>
                    </p>
                    <div dir="ltr" className="comment-text" dangerouslySetInnerHTML={{__html: snippet.textDisplay}} />
                  </div>
                </span>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}
