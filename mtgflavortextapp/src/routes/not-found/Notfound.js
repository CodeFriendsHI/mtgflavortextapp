import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Notfound extends Component {

  render() {
    return (
      <div>
        <Helmet title="Síða fannst ekki" />
        <p>Síða fannst ekki</p>
      </div>
    );
  }
}