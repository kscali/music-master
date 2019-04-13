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
    
     return (
      <div>
        <div className="top">
           <img className="heart" src="https://cdn2.iconfinder.com/data/icons/love-and-romance-vol-3-1/50/129-512.png"
            alt="headphones-heart-icon"
           /> 
           <h2>Music Maestro</h2>
           <Search searchArtist={this.searchArtist} />
        </div>
         { this.state.artist ? 
            (<div><Artist artist={this.state.artist} />
            <Tracks tracks={this.state.tracks} /> </div>) 
            : (<div class="main-page">
                <h1>Welcome to Music Maestro.</h1>
                <h1> Please enter an artist name to find samples of their music.</h1>
              </div>
            )
         }
        
       </div> 
    )
  }
}


export default App; 