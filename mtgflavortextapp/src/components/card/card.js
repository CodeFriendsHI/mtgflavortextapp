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

  handleImageLoad = () => {
    console.log('loaded!');
    this.setState({ loading: false });
  }

  render() {
    const { fetching, card, loading } = this.state;
    
    if (fetching) {
      return (
        <div className='card'>
          <img src="/cardback.jpg" alt="" />
        </div>
      )
    }
    
    const { flavor_text, image_uris, name } = card;

    const imgSrc = loading ? '/cardback.jpg' : image_uris.border_crop;
    const cardClass = loading ? 'card' : 'card doaflip';

    return (
      <div className={cardClass}>
        <img
          className='card__front'
          src={imgSrc}
          alt=''
        />
        <img
          className='card__back'
          src={image_uris.border_crop}
          alt=''
          onLoad={this.handleImageLoad}
        />
      </div>
    )
  }
}
