import React, { Component } from "react";
//import Helmet from "react-helmet";
import { Switch, Route } from "react-router-dom";

import Home from "./routes/home";
import NotFound from "./routes/not-found";

/* todo fleiri routes */

import "./App.css";

class App extends Component {

  render() {
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

export default App;
