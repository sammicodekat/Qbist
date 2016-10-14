const { Column, Row } = Grid
import { Grid } from 'semantic-ui-react'
import React, { Component } from 'react'

import EmojiStore from '../stores/EmojiStore'

import SearchBar from './SearchBar'
import Canvas from './Canvas'
import SourceImage from './SourceImage'

export default class SearchPage extends Component {
  constructor () {
    super()

    this.state = {
      imgData: EmojiStore.getImgData(),
      imgEmo: EmojiStore.getImgEmo(),
      sourceImg: EmojiStore.getSourceImg()
    }

    this._onChange = this._onChange.bind(this)
  }

  componentWillMount () {
    EmojiStore.startListening(this._onChange)
  }

  componentWillUnmount () {
    EmojiStore.stopListening(this._onChange)
  }

  _onChange () {
    this.setState({
      imgData: EmojiStore.getImgData(),
      imgEmo: EmojiStore.getImgEmo(),
      sourceImg: EmojiStore.getSourceImg()
    })

  }

  render () {
    return (
      <Grid>
        <Row textAlign="center" columns ={2}>
          <SearchBar />
        </Row>
        <Row columns='equal'>
          <Column></Column>
          <Column width={7} className="canvasArea"><Canvas {...this.state} /></Column>
          <Column><SourceImage {...this.state} /></Column>
        </Row>
      </Grid>
    )
  }
}
