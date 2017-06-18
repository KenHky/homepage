import React, { Component } from 'react'
import './home.css'

export default class Home extends Component {
  state = {
    hover: 0,
    menu: [{
      mean: '开始新的游戏',
      url: '/talk',
    },{
      mean: '博客',
      url: 'http://www.huangkaiyi.me',
    },{
      mean: 'github',
      url: 'https://github.com/KenHky',
    }]
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown',function(){},false)
  }
  handleKeyDown = (key) => {
    if (key.keyCode === 13 || key.keyCode === 32) {
      this.handleClick(this.state.hover)()
    }
    if (key.keyCode === 38) {
      let hover = this.state.hover - 1
      if ( hover === -1 ) hover = this.state.menu.length - 1
      this.setState({
        hover,
      })
    }
    if (key.keyCode === 40) {
      let hover = this.state.hover + 1
      if ( hover === this.state.menu.length ) hover = 0
      this.setState({
        hover,
      })
    }
  }

  handleClick = (index) => {
    return () => {
      const url = this.state.menu[index].url
      if(url.indexOf("/") === 0) {
        this.props.history.push(url)
      } else {
        window.location = url
      }
    }
  }

  handleMouseOver = (index) => {
    return (e) => {
      this.setState({
        hover: index
      })
    }
  }
  render() {
    const { hover, menu } = this.state
    return (
      <div className="home">
        <h2>和黄凯羿聊天吧！</h2>
        <ul>
          {
            menu.map((data, index) => <li key={index} className={hover === index ? 'hover' : ''} onMouseOver={this.handleMouseOver(index)} onClick={this.handleClick(index)}>{data.mean}</li>)
          }
        </ul>
      </div>
    )
  }
}
