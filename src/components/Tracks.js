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

  trackIcon = track => {
    if (!track.preview_url) {
      return <span>N/A</span>
    }

    if (
      this.state.playing 
      && this.state.playingPreviewUrl === track.preview_url
      ) {
      return <span>||</span>
      }
    return <span>&#9654;</span>
  }
  
  render () {
    const { tracks } = this.props; 

    return (
    <div class="slider">
      { tracks.map(track => {
        const { id, name, album, preview_url } = track; 
        return <div 
              key={id} 
              onClick={ this.playAudio(preview_url) }
              className="track">
              <img 
                className="track-image"
                src={album.images[0].url} 
                alt="track-image" />
              <p className="track-text">{name}</p>
              <p className="track-icon">{ this.trackIcon(track) }</p>
            </div>    
          })
        }  
    </div> 
    )
  }
}

export default Tracks; 