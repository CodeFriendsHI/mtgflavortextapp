import React, { Component } from "react";
//import Helmet from "react-helmet";
import { Switch, Route } from "react-router-dom";

import Home from "./routes/home";
import NotFound from "./routes/not-found";
import Header from './components/header';
import Button from './components/button';
import "./App.css";

class App extends Component {

  state = {
    show: true,
  }

  headerClick = () => {
    this.setState({
      show: false,
    });
  }
  render() {
    const {
      show,
    } = this.state;

    if(show) {
      return (
        <main className="main">
          <Header show={show}/>
          <Button name='mainpage__button' content='Lets Begin!' headerClick={this.headerClick} />
        </main>
      ); 
    } else {
      return (
        <main className="main">
          <div className="main__content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
      ); 
    }
  }
}

export default App;
