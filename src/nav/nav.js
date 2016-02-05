import React, { Component } from 'react';

export default class Nav extends Component {

  constructor(props) {
    super(props);
  }

  onNavClick(navItem, e) {
    e.preventDefault();
    this.props.onNavClick(navItem);
  }

  render() {
    return (
      <ul className={this.props.className}>
        {
          this.props.navItems.map((navItem, index) => {
            return (
              <li key={index}><a href="" onClick={this.onNavClick.bind(this, navItem.layout)}>{navItem.title}</a></li>
            );
          })
        }
      </ul>

    );
  }
}
