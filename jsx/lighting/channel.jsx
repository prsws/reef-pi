import React from 'react'
import Slider from './slider.jsx'
import { HuePicker } from 'react-color'

export default class Channel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      channel: this.props.ch,
      colorPicked: false

    }
    this.sliderList = this.sliderList.bind(this)
    this.curry = this.curry.bind(this)
    this.updateAuto = this.updateAuto.bind(this)
    this.updateReverse = this.updateReverse.bind(this)
    this.updateFixedValue = this.updateFixedValue.bind(this)
    this.getFixedValue = this.getFixedValue.bind(this)
    this.update = this.update.bind(this)
    this.updateMin = this.updateMin.bind(this)
    this.updateMax = this.updateMax.bind(this)
    this.updateStartMin = this.updateStartMin.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateColor = this.updateColor.bind(this)
    this.colorPicker = this.colorPicker.bind(this)
  }

  colorPicker () {
    if (!this.state.colorPicked) {
      return (
        <button
          onClick={() => this.setState({colorPicked: true})}
          style={{backgroundColor: this.state.channel.color}}
          className='btn btn-secondary'
        />
      )
    }
    return (
      <HuePicker color={this.state.channel.color} onChangeComplete={this.updateColor} />
    )
  }

  updateMin (ev) {
    this.update('min', ev.target.value)
  }

  updateColor (color) {
    var ch = this.state.channel
    ch.color = color.hex
    this.setState({
      channel: ch,
      colorPicked: false
    })
    this.props.updateChannel(ch)
  }

  updateName (ev) {
    this.update('name', ev.target.value)
  }

  updateStartMin (ev) {
    this.update('start_min', ev.target.value)
  }

  updateMax (ev) {
    this.update('max', ev.target.value)
  }

  update (k, v) {
    var ch = this.state.channel
    ch[k] = v
    this.setState({
      channel: ch
    })
    this.props.updateChannel(ch)
  }

  updateAuto (ev) {
    this.update('auto', ev.target.checked)
  }

  updateReverse (ev) {
    this.update('reverse', ev.target.checked)
  }

  getFixedValue () {
    return this.state.channel.fixed
  }

  updateFixedValue (v) {
    this.update('fixed', v)
  }

  curry (i) {
    return (
      function (ev) {
        var values = this.state.channel.values
        values[i] = parseInt(ev.target.value)
        this.update('values', values)
      }.bind(this)
    )
  }

  sliderList () {
    var values = this.state.channel.values
    var rangeStyle = {
      WebkitAppearance: 'slider-vertical',
      writingMode: 'bt-lr',
      padding: '0 5px',
      width: '8px',
      height: '175px'
    }
    var list = []
    var labels = [
      '12 am',
      '2 am',
      '4 am',
      '6 am',
      '8 am',
      '10 am',
      '12 pm',
      '2 pm',
      '4 pm',
      '6 pm',
      '8 pm',
      '10 pm'
    ]

    for (var i = 0; i < 12; i++) {
      list.push(
        <div className='col-sm-1' key={i + 1}>
          <div className='row text-center'>
            {values[i]}
          </div>
          <input type='range' style={rangeStyle} onChange={this.curry(i)} value={values[i]} id={'intensity-' + i} orient='vertical' />
          <div className='row text-center'>
            {labels[i]}
          </div>
        </div>
      )
    }
    return (list)
  }

  render () {
    var channel = <Slider
      pin={this.props.pin}
      name={this.props.ch.name}
      onChange={this.updateFixedValue}
      getValue={this.getFixedValue}
    />
    if (this.state.channel.auto) {
      channel = this.sliderList()
    }
    return (
      <div className='container'>
        <div className='row'>
          Name: <input type='text' value={this.state.channel.name} onChange={this.updateName} />
          Pin: {this.state.channel.pin}
        </div>
        <div className='row'>
          <div className='col-lg-1 col-xs-1'>
            Auto
          </div>
          <div className='col-lg-1 col-xs-1'>
            <input type='checkbox' onClick={this.updateAuto} defaultChecked={this.state.channel.auto} id={this.props.name + '-' + this.props.ch.name + '-auto'} />
          </div>
          <div className='col-lg-1 col-xs-1'>
            Reverse
          </div>
          <div className='col-lg-1 col-xs-1'>
            <input type='checkbox' onClick={this.updateReverse} defaultChecked={this.state.channel.reverse} />
          </div>
          <div className='col-lg-1 col-xs-1'>
            Color
          </div>
          <div className='col-lg-1 col-xs-1'>
            {this.colorPicker()}
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-1 col-xs-6'>Min</div>
          <input className='col-lg-1 col-xs-6'type='text' onChange={this.updateMin} value={this.state.channel.min} />
          <div className='col-lg-1 col-xs-1' />
          <div className='col-lg-1 col-xs-6'>Max</div>
          <input className='col-lg-1 col-xs-6' type='text' onChange={this.updateMax} value={this.state.channel.max} />
          <div className='col-lg-1 col-xs-1' />
          <div className='col-lg-1 col-xs-6'>Start</div>
          <input className='col-lg-1 col-xs-6' type='text' onChange={this.updateStartMin} value={this.state.channel.start_min} />
        </div>
        <div className='row'>
          {channel}
        </div>
      </div>
    )
  }
}
