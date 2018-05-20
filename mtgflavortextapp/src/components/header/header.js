import React, { Component } from "react";
import "./header.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class Header extends Component {
  componentWillLeave() {
    console.info("hallo");
  }

  render() {
    const { show } = this.props;

    return (
      <div className="header">
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionLeaveTimeout={500}
          transitionEnterTimeout={500}
          transitionName={{
            appear: "appear",
            appearActive: "appearActive"
          }}
        >
          <div className="header__item" />
          <div className="header__item" />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
