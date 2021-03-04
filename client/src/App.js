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
      fetch('http://localhost:5000/history')
        .then(res => res.json())
        .then(data => {
          this.setState({
            musicHistory: data,
          });
        })
        .catch(error => console.log(error));

        fetch('http://localhost:5000/toptracks')
        .then(res => res.json())
        .then(data => {
          this.setState({
            topTracksData: data,
          });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const { isUserAuthorized, musicHistory, topTracksData } = this.state;
    const connectSpotify = isUserAuthorized ? (
      ''
    ) : (
        <a href="http://localhost:5000/login">Connect your Spotify account</a>
      );

    return (
      <div className="App">
        <header className="header">
          <h1>Spotify Listening History</h1>
          <p>View your music history in realtime with Spotify</p>

          {connectSpotify}
          {musicHistory.length !== 0 ? <RecentTracks musicHistory={this.state.musicHistory} /> : null}
          {topTracksData !== null ? <TopTracks topTracks={this.state.topTracks} /> : null}
        </header>
      </div>
    );
  }
}

export default App;