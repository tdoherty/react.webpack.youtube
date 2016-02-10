import React, { Component } from 'react';

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: ""
    };
  }

  handleTermEvent(e) {
    this.setState({term:e.target.value});
  }

  handleTermSubmit(e) {
    e.preventDefault();
    this.props.search(this.state.term);
  }

  render() {
    return (
        <form onSubmit={this.handleTermSubmit.bind(this)}>
          <input value={this.state.term} onChange={this.handleTermEvent.bind(this)} className="app-header__search" type="text" placeholder="Search" />
        </form>
      );
  }
}
