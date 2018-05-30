import React, { Component } from "react";
import "./card.css";

import api from "../../api";

export default class Card extends Component {
  state = {
    fetching: true,
    loading: true,
    card: null,
    image: "/cardback.jpg",
    error: false
  };

  onClick = async () => {
    const { collector_number, set } = this.state.card;

    this.setState({ fetching: true });
    try {
      await api.post(collector_number, set);
    } catch (error) {
      this.setState({
        error: false
      });
    }
  };

  async componentDidMount() {
    try {
      await this.fetchData();
    } catch (error) {
      this.setState({
        error: true
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.fetching !== prevState.fetching) {
      this.setState({ loading: true });

      try {
        await this.fetchData();
      } catch (error) {
        this.setState({
          error: true
        });
      }
    }
  }

  handleImageLoad = () => {
    this.setState({ loading: false });
  };

  fetchData = async () => {
    const data = await api.get("random");
    const { result } = data;

    this.setState({
      fetching: false,
      card: result
    });
  };

  render() {
    const { fetching, card, loading, error } = this.state;

    if (fetching) {
      return (
        <div className="card">
          <img src="/cardback.jpg" alt="" />
        </div>
      );
    }

    if (error) {
      return <div>Big error!</div>;
    }

    const { flavor_text, image_uris, name } = card;

    const imgSrc = loading ? "/cardback.jpg" : image_uris.border_crop;
    const cardClass = loading ? "card" : "card doaflip";

    const clickAble = loading ? null : this.onClick;

    return (
      <div className={cardClass} onClick={clickAble}>
        <img className="card__front" src={imgSrc} alt="" />
        <img
          className="card__back"
          src={image_uris.border_crop}
          alt=""
          onLoad={this.handleImageLoad}
        />
      </div>
    );
  }
}
