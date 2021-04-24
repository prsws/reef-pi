import React from 'react'
import { CompactPicker } from 'react-color'
import PropTypes from 'prop-types'
import i18next from 'i18next'
import { invertColor } from 'utils/invert_color'

class CompactColorPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expand: false,
      color: props.color
    }

    this.handleColorChange = this.handleColorChange.bind(this)
  }

  handleColorChange (e) {
    const event = {
      target: {
        name: this.props.name,
        value: e.hex
      }
    }
    this.props.onChangeHandler(event)
    this.setState({ expand: false, color: e.hex })
  }

  render () {
    if (this.state.expand === false) {
      return (
        <button
          disabled={this.props.readOnly}
          onClick={() => this.setState({ expand: true })}
          style={{ backgroundColor: this.state.color, color: invertColor(this.state.color) }}
          className='btn btn-secondary col-12'
        >
          {i18next.t('color_picker:choose')}
        </button>
      )
    }
    return (
      <CompactPicker
        name={this.props.name}
        className='mt-2'
        color={this.state.color}
        onChangeComplete={this.handleColorChange}
      />
    )
  }
}

CompactColorPicker.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  onChangeHandler: PropTypes.func.isRequired
}

export default CompactColorPicker
