import React, { Component } from "react";
import Autosuggest from 'react-autosuggest';

class PlayerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null, value: "", suggestions: [] };
  }

  /**
   * Event Handler that returns suggestions for which player the user may be looking for
   */
  getSuggestions = ({value}) => {
    //Get all passed in players
    const players = this.props.players || [];
    //take the input to lowercase
    const inputValue = value.toLowerCase();
    
    //Set the suggestions state to the player list filtered to what starts with the input
    this.setState({suggestions: players.filter(player =>
      player.player.toLowerCase().startsWith(inputValue)
    )})
  };

  /**
   * Clear the suggestions
   */
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }

  /**
   * Returns the player name for the current suggestion
   */
  getSuggestionValue = suggestion => {
    this.setState({selected: suggestion});
    if(this.props.onSelectedChange){
      this.props.onSelectedChange(this.props.id,suggestion);
    }
    return suggestion.player;
  }
  
  /**
   * Event handler for when the input changes
   */
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  /**
   * Returns JSX for the current suggestion. Including name & price
   * @param {Object} suggestion 
   */
  renderSuggestion(suggestion){
    return (
      <div className="player-suggestion"><span className="player-suggestion__name">{suggestion.player}</span><span className="player-suggestion__price">£{suggestion.price}</span></div>
    );  
  }

  /**
   * Render the React Component
   */
  render() {
    //Set up autocomplete props
    const inputProps = {
      placeholder: 'Search for a player',
      value: this.state.value,
      onChange: this.onChange
    };

    //Return JSX
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
