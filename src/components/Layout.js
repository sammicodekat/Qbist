import React, { Component } from 'react'
import {Link} from 'react-router'
import classNames from 'classnames'
import { Menu, Segment,Grid } from 'semantic-ui-react'

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    let path = this.props.location.pathname;
    return (
      <div>
        <Menu color='blue' inverted widths={3}>
          <Menu.Item className={classNames({active: path === '/'})}><Link to ='/'>Home</Link></Menu.Item>
          <Menu.Item className={classNames({active: path === '/detectface'})}><Link to ='/detectface'>Create Emoji</Link></Menu.Item>
      </Menu>
      {this.props.children}
    </div>
    )
  }
}
