import React, { Component } from 'react'
import EmojiStore from '../stores/EmojiStore'
import EmojiActions from '../actions/EmojiActions'

export default class Canvas extends Component {
  constructor () {
    super()
    this.state = {
      artworks: EmojiStore.getArtworks()
    }
    this._onChange = this._onChange.bind(this)
  }

  componentWillMount () {
    EmojiStore.startListening(this._onChange)
    EmojiActions.getArt()
  }

  componentWillUnmount () {
    EmojiStore.stopListening(this._onChange)
  }

  _onChange () {
    this.setState({
      artworks: EmojiStore.getArtworks()
    })
  }

  _createCanvas () {
    let art = new Image()
  }

  render () {
    const {artworks} = this.state
    let scrollWidth = artworks.length * 1000
    let Artworks = ''
    if (artworks) {
      Artworks = artworks.map(artwork => {
        let {author, id, image, createdAt, title} = artwork
        return (
          <div className="gallerySlot" key={id}>
            <img src={image} className="artwork" alt="My Image" />
            <h3>{title}</h3>
            <h5>{author}</h5>
          </div>
        )
      })
    }
    return (
      <div className="gallery">
        <div className="galleryScroll" style={{width: scrollWidth}}>
          {Artworks}
        </div>
      </div>
    )
  }
}
