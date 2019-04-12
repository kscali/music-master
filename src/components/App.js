import React from 'react';

const API_ADDRESS = "https://spotify-api-wrapper.appspot.com";

class App extends React.Component {
  state = { 
    artistQuery: "", 
    artist: null,
    tracks: null
  };

  updateQuery = e => {
    this.setState({ artistQuery: e.target.value })
  }

  searchArtist = () => {
    let artist = this.state.artistQuery;

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

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.searchArtist(); 
    }
  }
  
  render() {
    console.log("this.state", this.state);
     return (
      <div>
        <h2>Music Master</h2>
        <input onChange={ this.updateQuery } 
        onKeyPress={ this.handleKeyPress }
        placeholder=" Search for an Artist" />
        <button onClick={ this.searchArtist }>Search</button>
      </div>
    )
  }
}


export default App; 