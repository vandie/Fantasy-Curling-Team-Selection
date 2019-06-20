import React, { Component } from "react";
import PlayerSearch from "./playerSearch";
import TradingCard from './trading-card';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      teamName: "",
      username: "",
      email: "",
      players: {},
      team: {
        lead: null,
        skip: null,
        second: null,
        third: null
      } 
    };
  }

  componentDidMount = async () => {
    const response = await fetch('/playerList.json');
    const playerList = await response.json();
    this.setState({ players: {
      lead: playerList[0].lead,
      skip: playerList[1].skip,
      second: playerList[2].second,
      third: playerList[3].third
    } });
  }

  onSelectedChange = async (position, selected) => {
    const extraDetail = await fetch(`/playerDetail/${selected.id}.json`);
    const extraDetailJSON = await extraDetail.json();
    this.setState(prevState => {
      let newTeam = prevState.team;
      newTeam[position] = {
        basicInfo: selected,
        extraInfo: extraDetailJSON
      };
      return newTeam;
    })
  }

  get totalCost() {;
    let cost = 0;
    Object.values(this.state.team).forEach(player => {
      if(player != null) cost += player.basicInfo.price;
    });
    return cost;
  }

  submitHandler(e) {
    e.preventDefault();
  }

  get currentIssue() {
    let numberOfPlayers = (Object.values(this.state.team).filter(player => player != null)).length;
    let emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.totalCost > 200000) return "Team Costs too much...";
    else if(numberOfPlayers !== 4) return "Team does not have a player in every position...";
    else if(!(this.state.teamName.length > 0)) return "Team does not have a name...";
    else if(!(this.state.email.length > 0)) return "Email has not been set...";
    else if(!(emailRegEx.test(this.state.email))) return "Email is not valid...";
    else if(!(this.state.username.length > 0)) return "Username has not been set...";
    else return false;
  }

  render() {
    let cards = [];
    Object.values(this.state.team).forEach(player => {
      if(player != null) cards.push((<TradingCard key={player.basicInfo.id} player={player} />));
    })
    
    let errors = <span className='error'>{this.currentIssue}</span>;

    return (
      <div className="App">
        <header className="App__header">Fantasy Curling Team Builder</header>
        {this.currentIssue && errors}
        <form className="team-builder" onSubmit={this.submitHandler}>
          <PlayerSearch id='lead' onSelectedChange={this.onSelectedChange} players={this.state.players.lead}></PlayerSearch>
          <PlayerSearch id='skip' onSelectedChange={this.onSelectedChange} players={this.state.players.skip}></PlayerSearch>
          <PlayerSearch id='second' onSelectedChange={this.onSelectedChange} players={this.state.players.second}></PlayerSearch>
          <PlayerSearch id='third' onSelectedChange={this.onSelectedChange} players={this.state.players.third}></PlayerSearch>
        </form>
        <div className="team-builder">
          {cards}
        </div>
        <div className={'total-cost'+(this.totalCost > 200000 ? ' total-cost--over-max' :'')}>£{this.totalCost}</div>
        <div className="simple-input">
          <label htmlFor="team-name" className="simple-input__label">Team Name</label>
          <input onChange={event => this.setState({teamName: event.target.value}) }  className="simple-input__input" id="team-name" placeholder="eg. The Golden Ravens"></input>
        </div>
        <div className="simple-input">
          <label htmlFor="email" className="simple-input__label">Email</label>
          <input type="email" onChange={event => this.setState({email: event.target.value}) } className="simple-input__input" id="email" placeholder="eg. test@example.com"></input>
        </div>
        <div className="simple-input">
          <label htmlFor="username" className="simple-input__label">Username</label>
          <input onChange={event => this.setState({username: event.target.value}) } className="simple-input__input" id="username" placeholder="eg. JohnTheMan2"></input>
        </div>
        {!this.currentIssue && <button onClick={() => alert('As this is a technical test, this doesn\'t actually submit anywhere')}> Sign Up </button>}
      </div>
    );
  }
}

export default App;
