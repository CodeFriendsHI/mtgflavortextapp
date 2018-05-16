import React, { Component } from 'react'
import './card.css';

import api from '../../api';

export default class Card extends Component {

  state = {
    loading: true,
    card: null,
  };

  async componentDidMount() {
    try {
      const data = await api.get('random');
      const { result } = data;

      this.setState({
        loading: false,
        card: result,
      });

    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { loading, card } = this.state;
    
    if (loading) {
      return (
        <div>
          Loading...
        </div>
      )
    }
    
    const { flavor_text, image_uris, name } = card;

    return (
      <div className='card'>
        <div>
          <h3>{name}</h3>
          <i>{flavor_text}</i>
          <img src={image_uris.normal} alt="" />
        </div>
      </div>
    )
  }
}
