import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import Home from './pages/home'
import Talk from './pages/talk'

class App extends Component {
  render() {
    console.log('Hello 我是黄凯羿。是想看源码么？源码地址在：https://github.com/KenHky/homepage')
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/talk" component={Talk}/>
          <footer>
            <small>© 2017 Ken Huang 粤ICP备15066407号 邮箱:ken.hky@163.com</small>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App
