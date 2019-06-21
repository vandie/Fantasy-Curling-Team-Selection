import React, { Component } from "react";

class TradingCard extends Component {
  /**
   * Render the Trading Card using passed in properties
   */
  render() {
    return (
      <article className="player-card">
        <img className="player-card__image" alt={this.props.player.basicInfo.player} src={this.props.player.extraInfo.image} />
        <h1 className="player-card__name">{this.props.player.basicInfo.player}</h1>
        <span className="player-card__cost">Cost: £{this.props.player.basicInfo.price}</span>

        <span className="player-card__position">Position: {this.props.player.extraInfo.position}</span>
        <span className="player-card__height">Height: {this.props.player.extraInfo.height}m</span>
        <span className="player-card__weight">Weight: {this.props.player.extraInfo.weight}kg</span>
        <span className="player-card__dominant-hand">Dominant Hand: {this.props.player.extraInfo['dominant-hand']}</span>
        <span className="player-card__nationality">Nationality: {this.props.player.extraInfo.nationality}</span>
      </article>
    );
  }
}

export default TradingCard;
