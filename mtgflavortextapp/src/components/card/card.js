import React, { Component } from 'react';
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
    this.setState({ loading: false });
  }

  render() {
    const { fetching, card, loading } = this.state;

    const { onClick } = this.props;
    
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

    const clickable = loading ? null : onClick;

    return (
      <div className={cardClass} onClick={clickable} >
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
