import React, { Component } from 'react';
import './App.css';
import RecentTracks from './components/RecentTracks';
import TopTracks from './components/TopTracks';
import Page from './components/Page';
import TopArtists from './components/TopArtists';

class App extends Component {
  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const isUserAuthorized = urlParams.has('authorized') ? true : false;

    this.state = {
      isUserAuthorized,
      musicHistory: [],
      topTracks: [],
      topArtists: []
    };
  }

  componentDidMount() {
    const { isUserAuthorized } = this.state;

    if (isUserAuthorized) {
      this.getRecentlyPlayed();
      this.getTopTracks();
      this.getTopArtists();
    }
  }

  render() {
    const { isUserAuthorized, musicHistory, topTracks, topArtists } = this.state;
    const connectSpotify = isUserAuthorized ? (
      ''
    ) : (
      <a href="http://localhost:5000/login">Connect your Spotify account</a>
    );
    const top_tracks = topTracks.length !== 0 ? <TopTracks topTracks={this.state.topTracks} refreshTopTracks={this.getTopTracks} /> : null;
    const recently_played = musicHistory.length !== 0 ? <RecentTracks musicHistory={this.state.musicHistory} /> : null;
    const top_artists = topArtists.length !== 0 ? <TopArtists topArtists={this.state.topArtists} refreshTopArtists={this.getTopArtists}></TopArtists> : null;

    const tabs = [top_tracks, recently_played, top_artists];
    return (
      <div className="App">
        <header className="header">
          <h1>Spotify React App</h1>
          <p>View your music history in realtime with Spotify</p>

          {connectSpotify}
        </header>
        {isUserAuthorized == true
          ? <Page tabs={tabs}></Page> : null}
      </div>
    );
  }

  getTopTracks = (term = "short_term", limit = 10) => {
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

  getTopArtists = (term = "short_term", limit = 10) => {
    fetch(`http://localhost:5000/topartists?term=${term}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          topArtists: data,
        });
      })
      .catch(error => console.log(error));
  }


}

export default App;