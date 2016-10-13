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
        <Row color="orange" textAlign="center" columns ={2}>
          <Column ><SearchBar /></Column>
        </Row>
        <Row>
          <Column width={8}><Canvas {...this.state} /></Column>
          <Column width={8}><SourceImage {...this.state} /></Column>
        </Row>
      </Grid>
    )
  }
}
