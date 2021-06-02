import React from 'react'
import { ResponsiveContainer, Tooltip, YAxis, XAxis, BarChart, Bar } from 'recharts'
import { fetchDoserUsage } from '../redux/actions/doser'
import { connect } from 'react-redux'
import i18next from 'i18next'
import { ParseXAxisDate } from 'utils/parse_x_axis_date'
import { OneDecimalParse } from 'utils/one_decimal_parse'
class chart extends React.Component {
  constructor (props) {
    super(props)
    this.updateUsage = this.updateUsage.bind(this)
  }

  updateUsage () {
    this.props.fetchDoserUsage(this.props.doser_id)
  }

  componentDidMount () {
    this.updateUsage()
    const timer = window.setInterval(this.updateUsage, 10 * 1000)
    this.setState({ timer: timer })
  }

  componentWillUnmount () {
    if (this.state && this.state.timer) {
      window.clearInterval(this.state.timer)
    }
  }

  getYUnits (yscale) {
    switch (yscale) {
      case 60:
        return i18next.t('minutes')
      case 3600:
        return i18next.t('hours')
      default:
        return i18next.t('seconds')
    }
  }

  scaledUsage () {
    const su = []
    this.props.usage.historical.forEach((el) => {
      su.push({ pump: el.pump / this.props.config.chart_y_scale, time: el.time })
    })
    return su
  }

  render () {
    if (this.props.usage === undefined) {
      return <div />
    }
    if (this.props.config === undefined) {
      return <div />
    }

  return (
      <>
        <span className='h6'>{this.props.config.name} - Doser Usage</span>
        <ResponsiveContainer height={this.props.height} width='100%'>
          <BarChart data={this.scaledUsage()}>
            <Bar dataKey='pump' fill='#33b5e5' isAnimationActive={false} />
            <XAxis dataKey='time' tickFormatter={timeStr => [ParseXAxisDate(timeStr)]} />
            <YAxis label={{ value: this.getYUnits(this.props.config.chart_y_scale), angle: -90, position: 'insideLeft' }} />
            <Tooltip labelFormatter={label => [ParseXAxisDate(label)]} formatter={(value) => [OneDecimalParse(value)]} />
          </BarChart>
        </ResponsiveContainer>
      </>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    usage: state.doser_usage[props.doser_id],
    config: state.dosers.find(p => p.id === props.doser_id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDoserUsage: id => dispatch(fetchDoserUsage(id))
  }
}

const Chart = connect(
  mapStateToProps,
  mapDispatchToProps
)(chart)
export default Chart
