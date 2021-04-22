import React from 'react'
import { ResponsiveContainer } from 'recharts'
import { fetchSettings } from 'redux/actions/settings'
import { connect } from 'react-redux'
import i18n from 'utils/i18n'

class blankpanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: undefined,
      bgColor: undefined,
      titleColor: undefined
    }
    this.getSetColorSettings = this.getSetColorSettings.bind(this)
  }

  componentDidMount () {
    this.getSetColorSettings()
    this.setState({
      active: true
    })
  }

  componentWillUnmount () {
    this.setState({ active: false })
  }

  getSetColorSettings () {
    this.props.fetch().then(result => {
      this.setState({ bgColor: result.payload.blank_panel_bgcolor, titleColor: result.payload.blank_panel_titlecolor })
    })
  }

  // getColorSettings () {
  //   this.props.fetch().then(function (result) {
  //     return '{"bgColor":"' + result.payload.blank_panel_bgcolor + '", "titleColor":"' + result.payload.blank_panel_titlecolor + '"}'
  //   })
  // }

  render () {
    // console.log(this.state)
    return (
      <div className='container' style={{ border: '1px solid gray', backgroundColor: this.state.bgColor, marginBottom: '3px' }}>
        <span className='h6' style={{ color: this.state.titleColor }}>{i18n.t('dashboard:blank_panel_title')}</span>
        <ResponsiveContainer height={this.props.height} width='100%'>
          <p>&nbsp;</p>
        </ResponsiveContainer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bgColor: state.bgColor,
    titleColor: state.titleColor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetch: () => dispatch(fetchSettings())
  }
}

const BlankPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(blankpanel)

export default BlankPanel
