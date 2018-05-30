import React, { Component } from "react";
import "./arrowhead.css";
export default class componentName extends Component {
  render() {
    return (
      <div className="arrowHead">
        <a href='#result'>
          <div>
            <i class="arrow down" />
          </div>
          <div>
            <i class="arrow down" />
          </div>
          <div>
            <i class="arrow down" />
          </div>
        </a>
      </div>
    );
  }
}
