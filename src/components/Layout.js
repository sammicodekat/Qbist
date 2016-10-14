import React, { Component } from 'react'
import {Link} from 'react-router'
import classNames from 'classnames'
import { Menu } from 'semantic-ui-react'

export default class Layout extends Component {
  render () {
    let path = this.props.location.pathname

    return (
      <div>
        <Menu inverted className="menu" stackable>
          <Menu.Item>
            <h1>Qbist</h1>
          </Menu.Item>
          <Menu.Item className={classNames({active: path === '/'})}><Link to="/">Create Qbist Art</Link></Menu.Item>
          <Menu.Item className={classNames({active: path === '/gallery'})}><Link to="/gallery">Art Gallery</Link></Menu.Item>
        </Menu>
      {this.props.children}
      </div>
    )
  }
}
