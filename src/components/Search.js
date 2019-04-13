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
    this.props.searchArtist(this.state.artistQuery)
  }

  render() {
    return (
      <div>
        <input onChange={this.updateQuery}
          onKeyPress={this.handleKeyPress}
          placeholder=" Search for an Artist" />
        <button onClick={this.searchArtist}>Search</button>
      </div>
    )
  }
}

export default Search; 