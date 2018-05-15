import React, { Component } from "react";

import Card from "../../components/card";

import './home.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className='cards'>
          <Card />
          <Card />
        </div>
      </div>
    );
  }
}
