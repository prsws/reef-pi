import React from 'react'
import Outlets from './outlets'
import Jacks from './jacks'
import AnalogInputs from './analog_inputs'
import Inlets from './inlets'

export default class Connectors extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row inlets' style={{ border: '1px solid black', marginBottom: '3px', backgroundColor: '#eeeeee' }}>
          <Inlets />
          <hr />
        </div>
        <div className='row outlets' style={{ border: '1px solid black', marginBottom: '3px', backgroundColor: '#eeeeee' }}>
          <Outlets />
          <hr />
        </div>
        <div className='row jacks' style={{ border: '1px solid black', marginBottom: '3px', backgroundColor: '#eeeeee' }}>
          <Jacks />
        </div>
        <div className='row analog-inputs' style={{ border: '1px solid black', marginBottom: '3px', backgroundColor: '#eeeeee' }}>
          <AnalogInputs />
        </div>
      </div>
    )
  }
}
