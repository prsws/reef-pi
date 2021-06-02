import React from 'react'
import { Tooltip, Area, YAxis, XAxis, AreaChart, ResponsiveContainer } from 'recharts'
import { fetchTCUsage } from '../redux/actions/tcs'
import { connect } from 'react-redux'
import i18next from 'i18next'
import { OneDecimalParse } from 'utils/one_decimal_parse'
import { ParseXAxisDate } from 'utils/parse_x_axis_date'

class chart extends React.Component {
  componentDidMount () {
    this.props.fetch(this.props.sensor_id)
    const timer = window.setInterval(() => { this.props.fetch(this.props.sensor_id) }, 10 * 1000)
    this.setState({ timer: timer })
  }

  componentWillUnmount () {
    if (this.state && this.state.timer) {
      window.clearInterval(this.state.timer)
    }
  }

  render () {
    if (this.props.usage === undefined) {
      return (<div />)
    }
    if (this.props.config === undefined) {
      return (<div />)
    }
    let currentTemp = ''
    if (this.props.usage.current.length > 1) {
      currentTemp = OneDecimalParse(this.props.usage.current[this.props.usage.current.length - 1].value)
    }
    const c = this.props.config.chart
    const unit = this.props.config.fahrenheit ? '°F' : '°C'
    return (
      <div className='container'>
        <span className='h6'>{this.props.config.name} - {i18next.t('temperature:temperature')} ({currentTemp})</span>
        <ResponsiveContainer height={this.props.height} width='100%'>
          <AreaChart data={this.props.usage.current}>
            <defs>
              <linearGradient id='gradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor={c.color} stopOpacity={0.8} />
                <stop offset='95%' stopColor={c.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis dataKey='value' allowDecimals='false' domain={[c.ymin, c.ymax]} />
            <XAxis dataKey='time' tickFormatter={timeStr => [ParseXAxisDate(timeStr)]} />
            <Tooltip labelFormatter={label => [ParseXAxisDate(label)]} formatter={(value, name) => [OneDecimalParse(value), unit]} />
            <Area
              type='linear'
              dataKey='value'
              stroke={c.color}
              isAnimationActive={false}
              fillOpacity={1}
              fill='url(#gradient)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    config: state.tcs.find((el) => { return el.id === ownProps.sensor_id }),
    usage: state.tc_usage[ownProps.sensor_id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch: (id) => dispatch(fetchTCUsage(id))
  }
}

const ReadingsChart = connect(mapStateToProps, mapDispatchToProps)(chart)
export default ReadingsChart
