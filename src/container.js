import React, { Component } from 'react';

export default class Container extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <this.props.layout {...this.props} />
    );
  }
}
