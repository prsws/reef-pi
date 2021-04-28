import React from 'react'
import PropTypes from 'prop-types'
import i18n from 'utils/i18n'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ErrorTest } from './error_test'

export default class Summary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: window.setInterval(props.fetch, 1800 * 1000)
    }
  }

  componentWillUnmount () {
    if (this.state && this.state.timer) {
      window.clearInterval(this.state.timer)
    }
  }

  render () {
    // let errorNotice = undefined
    // if (this.props.errors.length === 0) {
    //   errorNotice = <li className='list-inline-item text-info'>{i18n.t('errors')} ({this.props.errors.length}) | </li>
    // } else {
    //   errorNotice = <li className='list-inline-item text-danger'>{i18n.t('errors')} ({this.props.errors.length}) | </li>
    // }
    
    return (
        <div className='container'>
          <Router>
            <nav className='bottom-bar navbar fixed-bottom navbar-light bg-light justify-content-center'>
              <ul className='list-inline'>
                <li className='list-inline-item'>{this.props.info.current_time},</li>
                <li className='list-inline-item'>{i18n.t('running')} {this.props.info.version}, on {this.props.info.model}</li>
                <li className='list-inline-item'>{i18n.t('since')} {this.props.info.uptime} | </li>
                <li className='list-inline-item'>IP {this.props.info.ip} | </li>
                <li className='list-inline-item text-info'><Link to='/errors'>{i18n.t('errors')} ({this.props.errors.length})</Link> | </li>
                <li className='list-inline-item'><a href='http://reef-pi.com' target='_blank' rel='noopener noreferrer'> {i18n.t('documentation')}</a> | </li>
                <li className='list-inline-item'><a href='/assets/api.html' target='_blank'>API</a></li>
              </ul>
            </nav>
            <Route path='/errors' render={() => <div>ErrorTest</div>} />
          </Router>
        </div>
    )
  }
}

Summary.propTypes = {
  info: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
  fetch: PropTypes.func.isRequired
}
