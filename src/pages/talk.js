import React, { Component } from 'react'
import Frame from '../components/frame'
import $ from 'webpack-zepto'
import './talk.css'

export default class Talk extends Component {
  state = {
    content: [],
    indexId: 0,
    hover: 0,
    loading: true,
    casualIds: []
  }
  componentDidMount() {
    $.getJSON('./dialog.json', data => {
      let casualIds = data.content.filter((i) => i.id > 9 && i.id < 20).map(d => d.id) || []
      this.setState({
        content: data.content,
        indexId: data.indexId,
        casualIds,
      })
      this.loadImage(data.content.find(c => c.id === data.indexId).pic)
    });
  }
  loadImage = (url) => {
    const self = this
    this.setState({
      loading: true,
    }, () => {
      $('<img/>').attr('src', url).on('load', function() {
        $(this).remove();
        self.setState({
          loading: false,
        })
      });
    })
  }
  handleJumpTo = (id) => {
    let casualId = this.state.casualIds[0]
    if (id === 0) {
      if (localStorage.casualId) {
        const oldIndex = this.state.casualIds.findIndex(i => i === parseInt(localStorage.casualId, 10))
        casualId = this.state.casualIds[oldIndex + 1] || this.state.casualIds[0]
      }
      localStorage.casualId = casualId;
    }
    this.setState({
      indexId: id || casualId,
    }, () => {
      this.loadImage(this.state.content.find(c => c.id === this.state.indexId).pic)
    })
  }

  render() {
    const { content, indexId, loading } = this.state
    const pageData = content.find(c => c.id === indexId) || {}
    let background = {}
    if (loading) {
      background = { backgroundColor: pageData.color }
    }
    if (!loading) {
      background = { backgroundImage: 'url(' + pageData.pic + ')' }
    }
    return (
      <div style={background} className="talk">
        <Frame content={content} indexId={indexId} jumpTo={this.handleJumpTo} />
      </div>
    )
  }
}
