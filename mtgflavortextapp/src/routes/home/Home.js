import React, { Component } from "react";

import Card from "../../components/card";

import './home.css';

export default class Home extends Component {
  
  handleClick = () => {
    console.info('hallo');
  }

  render() {
    return (
      <div>
        <div className='cards'>
          <Card onClick={this.handleClick}/>
          <Card onClick={this.handleClick}/>
        </div>
      </div>
    );
  }
}
