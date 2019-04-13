import React from 'react';

class Search extends React.Component {
  state = { artistQuery: "" }

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.searchArtist();
    }
  }

  updateQuery = e => {
    this.setState({ artistQuery: e.target.value })
  }

  searchArtist = () => {
    let body = document.getElementById("root")
    body.style.backgroundImage = 'none';
    this.props.searchArtist(this.state.artistQuery)
  }

  render() {
    return (
      <div className="top-right">
        <input className="input" onChange={this.updateQuery}
          onKeyPress={this.handleKeyPress}
          placeholder=" Search for an Artist" />
        <button className="btn-input" onClick={this.searchArtist}>Search</button>
      </div>
    )
  }
}

export default Search; 