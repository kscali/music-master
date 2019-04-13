import React from 'react';

class Tracks extends React.Component {
  state = { playing: false, audio: null, playingPreviewUrl: null }

  playAudio = prevUrl => () => {
    const audio = new Audio(prevUrl);

    if (!this.state.playing) {
      audio.play(); 
      this.setState({ playing: true, audio, playingPreviewUrl: prevUrl })
    } else {
      this.state.audio.pause();

      if (this.state.playingPreviewUrl === prevUrl) {
        this.setState({ playing: false });
      } else {
        audio.play();
        this.setState({ audio, playingPreviewUrl: prevUrl})
      }
    }
  }
  
  render () {
    const { tracks } = this.props; 

    return (
      <div>
        {
          tracks.map(track => {
            const { id, name, album, preview_url } = track; 
            return (
              <div key={id} onClick={ this.playAudio(preview_url) }>
                <img src={album.images[0].url} alt="track-image" />
                <p>{name}</p>
              </div>
            )
            
          })
        }
      </div>
    )
  }
}

export default Tracks; 