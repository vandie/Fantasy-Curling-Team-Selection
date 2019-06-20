import React, { Component } from "react";
import Autosuggest from 'react-autosuggest';

class PlayerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null, value: "", suggestions: [] };
  }

  getSuggestions = ({value}) => {
    const players = this.props.players || [];
    const inputValue = value.toLowerCase();
  
    this.setState({suggestions: players.filter(player =>
      player.player.toLowerCase().startsWith(inputValue)
    )})
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }

  getSuggestionValue = suggestion => {
    this.setState({selected: suggestion});
    if(this.props.onSelectedChange){
      this.props.onSelectedChange(this.props.id,suggestion);
    }
    return suggestion.player;
  }
  
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  renderSuggestion(suggestion){
    return (
      <div className="player-suggestion"><span className="player-suggestion__name">{suggestion.player}</span><span className="player-suggestion__price">£{suggestion.price}</span></div>
    );  
  }

  render() {
    const inputProps = {
      placeholder: 'Search for a player',
      value: this.state.value,
      onChange: this.onChange
    };


    return (
      <div className="player-search">
        <label className="player-search__label" htmlFor={this.props.id}>Your {this.props.id} player</label>
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.getSuggestions}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          id={this.props.id}
        />
      </div>
    );
  }
}

export default PlayerSearch;
