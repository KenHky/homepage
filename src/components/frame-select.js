import React, { Component } from 'react'

export default class FrameSelect extends Component {

  handleClick = (id) => {
    return () => {
      this.props.jumpTo(id)
    }
  }

  handleMouseOver = (index) => {
    return (e) => {
      this.props.mouseOver(index)
    }
  }

  render() {
    const { content, indexId, hover } = this.props
    const pageData = content.find(c => c.id === indexId) || {}
    return (
      <ul>
        {
          pageData.jumpTo && pageData.jumpTo.length > 1 &&
            pageData.jumpTo.map((j, index) => <li key={index} className={"content-select " + (hover === index ? 'hover' : '')} onMouseOver={this.handleMouseOver(index)} onClick={this.handleClick(j.jumpToId)}>{j.mean}</li>)
        }
      </ul>
    )
  }
}
