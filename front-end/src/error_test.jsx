import React from 'react'
import { connect } from 'react-redux'

class errorTest extends React.Component {
    constructor (props) {
      super(props)
    }
  
    componentDidMount () {
    }
  
    render () {
      console.log('ErrorTest')
      return (
        <h1>ErrorTest</h1>
      )
    }
  }
  
  const mapStateToProps = state => {
    return null
  }
  
  const mapDispatchToProps = dispatch => {
    return null
  }
  
  const ErrorTest = connect(
    mapStateToProps,
    mapDispatchToProps
  )(errorTest)
  export default ErrorTest
  