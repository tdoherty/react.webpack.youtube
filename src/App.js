
import React, { Component } from 'react';
import SearchLayout from './search/layout';
import NowPlayingLayout from './now-playing/layout';
import Nav from './nav/nav';
import Container from './container';
import ContactLayout from './contact/contact';
import $ from 'jquery';
import youtube from './youtube';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: 'AIzaSyCuJFmoItCm1a2QpfAkM2u5yrd-IBD7tQQ',
      layout: SearchLayout,
      results: [],
      searchResults: [],
      comments: { items: [] },
      relatedVideos: [],
      term: "",
      nowPlaying: null,
      navItems: [
        { title: 'Home', layout: null },
        { title: 'Search', layout: SearchLayout},
        { title: 'Contact', layout: ContactLayout}
      ]
    };
  }

  doSearch(term) {
    youtube.doSearch(term)
      .then(youtube.getVideos.bind(this))
      .then(youtube.onSearchComplete.bind(this))
      .then(this.setSearchResults.bind(this));
  }

  getRelatedVideos(videoId) {
    youtube.getRelatedVideos(videoId)
      .then(youtube.getVideos.bind(this))
      .then(youtube.onSearchComplete.bind(this))
      .then(this.setRelatedVideos.bind(this));
  }

  setSearchResults(results) {
    this.setState({ searchResults: results });
  }

  setRelatedVideos(results) {
    this.setState({ relatedVideos: results });
  }

  onSearch(term) {
    this.setState({
      term: term,
      nowPlaying: null,
      layout: SearchLayout
    });
    this.doSearch(term);
  }

  onNowPlaying(video) {
    this.setState({
      nowPlaying: video,
      layout: NowPlayingLayout
    });

    youtube.fetchComments(video.id)
      .then(this.onCommentsFetched.bind(this))

    this.getRelatedVideos(video.id);
  }

  onNavClick(navItem) {
    this.setState({ layout: navItem });
  }

  onCommentsFetched(data) {
    this.setState({ comments: data });
  }

  render() {

    return (
      <div>
        <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="navbar-inner">
                <div className="container-fluid">
                    <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="brand" href="#">React.Webpack.Youtube</a>

                    <div className="nav-collapse collapse">
                        <p className="navbar-text pull-right">
                            Logged in as <a href="#" className="navbar-link">Username</a>
                        </p>
                        <Nav className={"nav"} navItems={this.state.navItems} onNavClick={this.onNavClick.bind(this)} />
                    </div>
                </div>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row-fluid">
                <div className="span2">
                    <div className="well sidebar-nav">
                       <Nav className={"nav nav-list"} navItems={this.state.navItems} onNavClick={this.onNavClick.bind(this)} />
                        <ul className="nav nav-list">
                            <li className="nav-header">Recent Videos</li>
                        </ul>
                        <div >
                            <ul className="nav nav-list unstyled" id="recentVideos"></ul>
                        </div>
                    </div>
                </div>
                <div className="span10">
                    <div className="row-fluid">
                        <div className="span12">
                            <h2>React.Webpack.youtube</h2>

                            <Container layout={this.state.layout}
                                       search={this.onSearch.bind(this)}
                                       term={this.state.term}
                                       onNowPlaying={this.onNowPlaying.bind(this)}
                                       nowPlaying={this.state.nowPlaying}
                                       searchResults={this.state.searchResults}
                                       relatedVideos={this.state.relatedVideos}
                                       comments={this.state.comments} />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <footer>
                <p>&copy; Company 2016</p>
            </footer>

        </div>
      </div>
    );
  }
}
