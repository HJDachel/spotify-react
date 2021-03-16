import React, { Component } from 'react';
import './App.css';
import RecentTracks from './components/RecentTracks';
import TopTracks from './components/TopTracks';

class App extends Component {
  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const isUserAuthorized = urlParams.has('authorized') ? true : false;

    this.state = {
      isUserAuthorized,
      musicHistory: [],
      topTracks: []
    };
  }

  componentDidMount() {
    const { isUserAuthorized } = this.state;

    if (isUserAuthorized) {
      this.getRecentlyPlayed();
      this.getTopTracks("long_term", 25);
    }
  }

  render() {
    const { isUserAuthorized, musicHistory, topTracks } = this.state;
    const connectSpotify = isUserAuthorized ? (
      ''
    ) : (
      <a href="http://localhost:5000/login">Connect your Spotify account</a>
    );

    return (
      <div className="App">
        <header className="header">
          <h1>Spotify React App</h1>
          <p>View your music history in realtime with Spotify</p>

          {connectSpotify}
          {musicHistory.length !== 0 ? <RecentTracks musicHistory={this.state.musicHistory} /> : null}
          {topTracks.length !== 0 ? <TopTracks topTracks={this.state.topTracks} refreshTopTracks={this.getTopTracks} /> : null}
        </header>
      </div>
    );
  }

  getTopTracks = (term="short_term", limit=10) => {
    fetch(`http://localhost:5000/toptracks?term=${term}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          topTracks: data,
        });
      })
      .catch(error => console.log(error));
  }

  getRecentlyPlayed = () => {
    fetch('http://localhost:5000/history')
      .then(res => res.json())
      .then(data => {
        this.setState({
          musicHistory: data,
        });
      })
      .catch(error => console.log(error));
  }


}

export default App;