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
      faceRectangle: EmojiStore.getFaceRectangle(),
      faceLandmarks: EmojiStore.getFaceLandmarks(),
      faceAttributes: EmojiStore.getFaceAttributes(),
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
      faceRectangle: EmojiStore.getFaceRectangle(),
      faceLandmarks: EmojiStore.getFaceLandmarks(),
      faceAttributes: EmojiStore.getFaceAttributes(),
      sourceImg: EmojiStore.getSourceImg()
    })
  }

  render () {
    console.log('this.state.sourceImg: ', this.state.sourceImg)
    return (
      <Grid>
        <Row color="orange" textAlign="center">
          <Column><SearchBar /></Column>
        </Row>
        <Row>
          <Column><Canvas {...this.state} /></Column>
          <Column><SourceImage {...this.state} /></Column>
        </Row>
      </Grid>
    )
  }
}
