import React, { Component } from 'react'
import FrameSelect from './frame-select'
import './frame.css'
// import write from '../util/type-writer.js'
// import '../util/type-writer.css'
let oldIndexId = ''

export default class Frame extends Component {
  state = {
    hover: 0,
    loading: true
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.indexId !== this.props.indexId) {
      const typist = document.querySelectorAll(".typist");
      typist[0].innerHTML = ''
      this.setState({
        loading: true,
        hover: 0,
      })
    }
  }
  componentDidUpdate(props) {
    const { content, indexId} = props
    if (content.length > 0 && indexId !== oldIndexId) {
      const pageData = content.find(c => c.id === indexId)
      let n = 0
      const typist = document.querySelectorAll(".typist");
      const allText = pageData.mean
      const timer = setInterval(() => {
        typist[0].innerHTML = allText.substring(0, n)
        n += 1
        if (n === allText.length + 1) {
          clearInterval(timer)
          this.setState({
            loading: false
          })
        }
      }, 100)
    }
    oldIndexId = indexId
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown',function(){},false)
  }
  handleClick = (id) => {
    const { content, indexId, jumpTo} = this.props
    const pageData = content.find(c => c.id === indexId)
    const hover = this.state.hover
    jumpTo(pageData.jumpTo[hover].jumpToId)
  }
  handleMouseOver = (index) => {
    return (e) => {
      this.setState({
        hover: index
      })
    }
  }
  handleKeyDown = (key) => {
    const { content, indexId} = this.props
    const pageData = content.find(c => c.id === indexId)
    if (key.keyCode === 13 || key.keyCode === 32) {
      !this.state.loading && this.handleClick()
    }
    if (key.keyCode === 38) {
      let hover = this.state.hover - 1
      if ( hover === -1 ) hover = pageData.jumpTo.length - 1
      this.handleChangeHover(hover)
    }
    if (key.keyCode === 40) {
      let hover = this.state.hover + 1
      if ( hover === pageData.jumpTo.length ) hover = 0
      this.handleChangeHover(hover)
    }
  }
  handleChangeHover = (hover) => {
    this.setState({
      hover,
    })
  }
  handleMouseOver = (index) => {
    this.setState({
      hover: index
    })
  }
  render() {
    const { content, indexId, jumpTo} = this.props
    const pageData = content.find(c => c.id === indexId) || {}
    return (
      <div className="content-box">
        <p className="typist"></p>
        {
          !this.state.loading && pageData.jumpTo && pageData.jumpTo.length > 1 && <FrameSelect content={content} indexId={indexId} jumpTo={jumpTo} changeHover={this.handleChangeHover} hover={this.state.hover} mouseOver={this.handleMouseOver}/>
        }
        {
          !this.state.loading && <span className="content-click" onClick={this.handleClick}>{
            pageData.jumpTo && pageData.jumpTo.length > 1 ? '按下空格,回车继续' : '点击此处或按下空格,回车继续'
          }</span>
        }
      </div>
    )
  }
}
