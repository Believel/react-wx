import React, { Component } from 'react'
import './index.scss';

export default class Box extends Component {
  render() {
    return (
      <div className="box">
        {this.props.children}
      </div>
    )
  }
}
