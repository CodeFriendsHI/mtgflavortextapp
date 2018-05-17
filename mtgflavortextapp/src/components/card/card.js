import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group';
import './card.css';

import api from '../../api';

export default class Card extends Component {

  state = {
    fetching: true,
    loading: true,
    card: null,
    image: "/cardback.jpg",
  };

  async componentDidMount() {
    try {
      while (true) {
        const data = await api.get('random');
        const { result } = data;
  
        if (!result.flavor_text) {
          continue;
        }

        this.setState({
          fetching: false,
          card: result,
        });

        break
      }

    } catch (error) {
      console.error(error);
    }
  }

  handleImageLoad() {
    console.log('Loaded!');
  }

  render() {
    const { fetching, card } = this.state;
    
    if (fetching) {
      return (
        <div className='card'>
          <img src="/cardback.jpg" alt="" />
        </div>
      )
    }
    
    const { flavor_text, image_uris, name } = card;

    return (
      <div className='card'>
        <img
          src={image_uris.border_crop}
          alt=""
          onLoad={this.handleImageLoad}
        />
      </div>
    )
  }
}
