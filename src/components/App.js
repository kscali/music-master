import React from 'react';
import Artist from './Artist';
import Tracks from './Tracks';
import Search from './Search';

const API_ADDRESS = "https://spotify-api-wrapper.appspot.com";

class App extends React.Component {
  state = { 
    artist: null,
    tracks: []
  };

  componentDidMount() {
    this.searchArtist("Celine Dion");
  }
  searchArtist = (artistQuery) => {
    let artist = artistQuery;

    fetch(`${API_ADDRESS}/artist/${artist}`)
    .then(res => res.json())
    .then(json => {
       if (json.artists.total > 0) {
        const artist = json.artists.items[0];

        this.setState({ artist })

        fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
        .then(res => res.json())
        .then(json => this.setState({ tracks: json.tracks }))
        .catch(error => alert(error.message));
        
      }
    })
    .catch(error => alert(error.message));
  }
  
  render() {
    console.log("this.state", this.state);
     return (
      <div>
        <h2>Music Master</h2>
        <Search searchArtist={this.searchArtist} />
        <Artist artist={ this.state.artist } />
        <Tracks tracks={ this.state.tracks } />
      </div>
    )
  }
}


export default App; 