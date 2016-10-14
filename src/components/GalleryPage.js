import React, { Component } from 'react'
import EmojiStore from '../stores/EmojiStore'
import EmojiActions from '../actions/EmojiActions'

export default class Canvas extends Component {
  constructor () {
    super()
    this.state ={
      artworks : EmojiStore.getArtworks()
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
      artworks : EmojiStore.getArtworks()
    })

  }

  _createCanvas(){
    let art = new Image()

  }
  render () {
    const {artworks}= this.state;
    console.log("artworks in gallerypage", artworks);
    let Artworks = '';
    if(artworks){
     Artworks = artworks.map( artwork => {
        let {author,id,image,createdAt,title} = artwork
        console.log("image",image)
        return (
          <div key ={id}>
            <img src={image} alt="My Image" width="600" height="600" />
            <h3>{title}</h3>
            <h5>{author}</h5>
            <h5>{createdAt}</h5>
          </div>
        )
      })
    }
    return (
      <div>
        {Artworks}
      </div>
    )
  }
}
