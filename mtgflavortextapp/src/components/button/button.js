import React, { Component } from "react";

import "./button.css";
export default class Button extends Component {

  render() {
    const { name, content, headerClick } = this.props;

    return (
      <button className={name} onClick={headerClick}>
        {content}
      </button>
    );
  }
}
