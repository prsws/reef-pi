import React from 'react'
import Outlets from './outlets'
import Jacks from './jacks'
import AnalogInputs from './analog_inputs'
import Inlets from './inlets'
import i18next from 'utils/i18n'

export default class Connectors extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <label className='h5 font-weight-bold' style={{ textDecoration: 'underline' }}>{i18next.t('configuration:tab:connectors')}</label>
        </div>
        <div className='row inlets' style={{ border: '1px solid black', marginBottom: '3px' }}>
          <Inlets />
          <hr />
        </div>
        <div className='row outlets' style={{ border: '1px solid black', marginBottom: '3px' }}>
          <Outlets />
          <hr />
        </div>
        <div className='row jacks' style={{ border: '1px solid black', marginBottom: '3px' }}>
          <Jacks />
        </div>
        <div className='row analog-inputs' style={{ border: '1px solid black', marginBottom: '3px' }}>
          <AnalogInputs />
        </div>
      </div>
    )
  }
}
