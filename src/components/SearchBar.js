import React, { Component } from 'react'

import EmojiActions from '../actions/EmojiActions'

export default class SearchBar extends Component {
  handleSearch (e) {
    e.preventDefault()

    let {urlInput} = this.refs
    let url = urlInput.value
    urlInput.value = ''
    EmojiActions.upload(url)
    EmojiActions.storeSourceImg(url)
  }

  render () {
    return (
      <div className="row searchBlock">
        <form onSubmit={(e) => this.handleSearch(e)}>
          <input type="text" className="searchBar" ref="urlInput" placeholder="enter img url" required />
          <button className="searchbutton">picassofy me</button>
        </form>
      </div>
    )
  }
}
