import React from 'react'
import { connect } from 'react-redux'

class errorTest extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        curTime : new Date().toLocaleString()
      }
    }
  
    componentDidMount () {
    }
  
    render () {
      console.log('ErrorTest')
      return (
        <div>
          <h1>ErrorTest</h1>
          <p>Current Time : {this.state.curTime}</p>
        </div>
      )
    }
  }
  
  const mapStateToProps = state => {
    return {
      curTime: state.curTime
    }
  }
   
  const ErrorTest = connect(
    mapStateToProps
  )(errorTest)
  export default ErrorTest
  