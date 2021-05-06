import React from 'react'
import { showError } from 'utils/alert'
import Capabilities from './capabilities'
import Display from './display'
import HealthNotify from './health_notify'
import { updateSettings, fetchSettings } from 'redux/actions/settings'
import { connect } from 'react-redux'
import SettingsSchema from './settings_schema'
import i18n from 'utils/i18n'
import CompactColorPicker from '../ui_components/compact_color_picker'
import { Save } from 'react-bootstrap-icons'

class settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      capabilities: props.capabilities,
      settings: props.settings || {
        name: '',
        interface: '',
        address: '',
        rpi_pwm_freq: 100,
        blank_panel_bgcolor: '',
        blank_panel_titlecolor: '',
        nav_bgcolor: '',
        nav_brand_color: ''
      },
      currentLanguage: i18n.language,
      updated: false
    }
    this.updateCheckbox = this.updateCheckbox.bind(this)
    this.showCapabilities = this.showCapabilities.bind(this)
    this.updateCapabilities = this.updateCapabilities.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.showDisplay = this.showDisplay.bind(this)
    this.toTextRow = this.toTextRow.bind(this)
    this.updateHealthNotify = this.updateHealthNotify.bind(this)
    this.showHealthNotify = this.showHealthNotify.bind(this)
    this.handleSetLang = this.handleSetLang.bind(this)
    this.handleSetAddress = this.handleSetAddress.bind(this)
    this.handleSetProtocolHttp = this.handleSetProtocolHttp.bind(this)
    this.handleSetProtocolHttps = this.handleSetProtocolHttps.bind(this)
    this.checkBoxComponent = this.checkBoxComponent.bind(this)
    this.handleSetBPBgColor = this.handleSetBPBgColor.bind(this)
    this.handleSetBPTitleColor = this.handleSetBPTitleColor.bind(this)
    this.toCompactColorPickerRow = this.toCompactColorPickerRow.bind(this)
    this.handleSetNavBgColor = this.handleSetNavBgColor.bind(this)
    this.handleSetNavBrandColor = this.handleSetNavBrandColor.bind(this)
  }

  checkBoxComponent (attr) {
    return (
      <div className='col-6 col-md-3 form-check'>
        <label htmlFor={attr} className='form-check-label'>
          <input
            type='checkbox'
            id={attr}
            onClick={this.updateCheckbox(attr)}
            defaultChecked={this.state.settings[attr]}
            className='form-check-input'
          />
          {i18n.t(attr)}
        </label>
      </div>
    )
  }

  handleSetLang (ev) {
    const lng = ev.target.value
    i18n.changeLanguage(lng)
    window.location.reload()
  }

  showHealthNotify () {
    if (this.state.settings.health_check === undefined) {
      return
    }
    if (this.state.settings.capabilities.health_check !== true) {
      return
    }
    return <HealthNotify update={this.updateHealthNotify} state={this.state.settings.health_check} />
  }

  updateHealthNotify (notify) {
    if (notify !== undefined) {
      const settings = this.state.settings
      settings.health_check = notify
      this.setState({ settings: settings, updated: true })
    }
    return this.state
  }

  updateCheckbox (key) {
    return function (ev) {
      const settings = this.state.settings
      settings[key] = ev.target.checked
      this.setState({
        settings: settings,
        updated: true
      })
    }.bind(this)
  }

  handleSetAddress (ev) {
    const settings = this.state.settings
    settings.address = ev.target.value
    this.setState({
      settings: settings,
      updated: true
    })
  }

  handleSetProtocolHttp () {
    this.handleSetProtocol(false)
  }

  handleSetProtocolHttps () {
    this.handleSetProtocol(true)
  }

  handleSetProtocol (value) {
    const settings = this.state.settings
    const port = settings.address.split(':')[1]

    // Technically redundant, but improves readability
    // Remove the port if https and port 80
    // Also remove the port if http and port 443
    if (port === '80' && value === true) {
      const address = settings.address.split(':')[0]
      settings.address = address // Remove port
    } else if (port === '443' && value === false) {
      const address = settings.address.split(':')[0]
      settings.address = address // Remove port
    }

    settings.https = value
    this.setState({
      settings: settings,
      updated: true
    })
  }

  handleSetBPBgColor (ev) {
    const settings = this.state.settings
    settings.blank_panel_bgcolor = ev.target.value
    this.setState({
      settings: settings,
      updated: true
    })
  }

  handleSetBPTitleColor (ev) {
    const settings = this.state.settings
    settings.blank_panel_titlecolor = ev.target.value
    this.setState({
      settings: settings,
      updated: true
    })
  }

  handleSetNavBgColor (ev) {
    const settings = this.state.settings
    settings.nav_bgcolor = ev.target.value
    this.setState({
      settings: settings,
      updated: true
    })
  }

  handleSetNavBrandColor (ev) {
    const settings = this.state.settings
    settings.nav_brand_color = ev.target.value
    this.setState({
      settings: settings,
      updated: true
    })
  }

  showDisplay () {
    if (!this.state.settings.display) {
      return
    }
    return (
      <div className='container'>
        <Display />
      </div>
    )
  }

  showCapabilities () {
    return <Capabilities capabilities={this.state.capabilities} update={this.updateCapabilities} />
  }

  updateCapabilities (capabilities) {
    const settings = this.state.settings
    settings.capabilities = capabilities
    this.setState({
      settings: settings,
      updated: true
    })
  }

  handleUpdate () {
    let settings = this.state.settings
    if (SettingsSchema.isValidSync(settings)) {
      settings = SettingsSchema.cast(settings)
      this.setState({ updated: false, settings: settings })
      this.props.updateSettings(settings)
      return
    }
    SettingsSchema.validate(settings).catch(err => {
      showError(err.errors.join(','))
    })
  }

  componentDidMount () {
    this.props.fetchSettings()
  }

  toTextRow (label) {
    const fn = function (ev) {
      const settings = this.state.settings
      settings[label] = ev.target.value
      this.setState({
        settings: settings,
        updated: true
      })
    }.bind(this)
    return (
      <div className='form-group'>
        <label htmlFor={'to-row-' + label}> {i18n.t(`configuration:settings:${label}`)}</label>
        <input
          className='form-control'
          type='text'
          onChange={fn}
          value={this.state.settings[label]}
          id={'to-row-' + label}
        />
      </div>
    )
  }

  toCompactColorPickerRow (label) {
    const fn = function (ev) {
      const settings = this.state.settings
      settings[label] = ev.target.value
      this.setState({
        settings: settings,
        updated: true
      })
    }.bind(this)
    return (
      <div className='form-group'>
        <label htmlFor={'to-row-' + label}> {i18n.t(`configuration:settings:${label}`)}</label>
        <CompactColorPicker
          name={'to-row-' + label}
          color={this.state.settings[label]}
          onChangeHandler={fn}
        />
      </div>
    )
  }

  static getDerivedStateFromProps (props, state) {
    if (props.settings === undefined || props.settings === null) {
      return null
    }
    if (Object.keys(props.settings).length === 0) {
      return null
    }
    state.settings = props.settings
    return state
  }

  render () {
    let updateButtonClass = 'btn btn-outline-success col-xs-12 col-md-3 offset-md-9'
    if (this.state.updated) {
      updateButtonClass = 'btn btn-outline-danger col-xs-12 col-md-3 offset-md-9'
    }
    return (
      <div className='container'>
        <div className='row'>
          <label className='h5 font-weight-bold' style={{ textDecoration: 'underline' }}>{i18n.t('configuration:tab:settings')}</label>
        </div>
        <div className='row' style={{ border: '1px solid black', marginBottom: '3px' }}>
          <div className='col-12'>
            <label className='h6 font-weight-bold' style={{ textDecoration: 'underline' }}>
              {i18n.t('capabilities:general')}
            </label>
            <div className='row'>
              <div className='col-lg-6 col-sm-12 h6'>{this.toTextRow('name')}</div>
              <div className='col-lg-6 col-sm-12 h6'>{this.toTextRow('interface')}</div>
            </div>
            <div className='row'>
              <div className='col-lg-6 col-sm-12'>
                <div className='form-group h6'>
                  <label htmlFor='to-row-address'> {i18n.t('configuration:settings:address')}</label>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <button className='btn btn-outline-secondary dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                        {this.state.settings.https === true ? 'https' : 'http'}://
                      </button>
                      <div className='dropdown-menu'>
                        <a className='dropdown-item' onClick={this.handleSetProtocolHttp}>http://</a>
                        <a className='dropdown-item' onClick={this.handleSetProtocolHttps}>https://</a>
                      </div>
                    </div>
                    <input
                      className='form-control'
                      type='text'
                      onChange={this.handleSetAddress}
                      value={this.state.settings.address}
                      id='to-row-address'
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-sm-12 h6'>{this.toTextRow('rpi_pwm_freq')}</div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='form-group h6'>
                  <label htmlFor='app-language'>{i18n.t('language:language')}</label>
                  <select value={this.state.currentLanguage} onChange={this.handleSetLang} id='app-language' className='form-control'>
                    <option value='en'>{i18n.t('language:en')}</option>
                    <option value='fr'>{i18n.t('language:fr')}</option>
                    <option value='es'>{i18n.t('language:es')}</option>
                    <option value='pt'>{i18n.t('language:pt')}</option>
                    <option value='de'>{i18n.t('language:de')}</option>
                    <option value='it'>{i18n.t('language:it')}</option>
                    <option value='hi'>{i18n.t('language:hi')}</option>
                    <option value='fa'>{i18n.t('language:fa')}</option>
                    <option value='zh'>{i18n.t('language:zh')}</option>
                    <option value='sk'>{i18n.t('language:sk')}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row' style={{ border: '1px solid black', marginBottom: '3px' }}>
          <div className='col-12'>
            <label className='h6 font-weight-bold' style={{ textDecoration: 'underline' }}>
              {i18n.t('capabilities:features')}
            </label>
            {this.showCapabilities()}
            {this.showHealthNotify()}
          </div>
        </div>
        <div className='row' style={{ border: '1px solid black', marginBottom: '3px' }}>
          <div className='col-12'>
            <label className='h6 font-weight-bold' style={{ textDecoration: 'underline' }}>
              {i18n.t('capabilities:miscellaneous')}
            </label>
            <div className='row' style={{ paddingLeft: '1em' }}>
              {this.checkBoxComponent('Display')}
              {this.checkBoxComponent('Notification')}
              {this.checkBoxComponent('Pprof')}
              {this.checkBoxComponent('Prometheus')}
              {this.checkBoxComponent('CORS')}
            </div>
          </div>
        </div>
        <div className='row' style={{ border: '1px solid black', marginBottom: '3px' }}>
          <div className='col-12'>
            <label className='h6 font-weight-bold' style={{ textDecoration: 'underline' }}>
              {i18n.t('capabilities:ui')}
            </label>
            <div className='row'>
              <div className='col-lg-6 col-sm-12 h6'>{this.toCompactColorPickerRow(i18n.t('blank_panel_bgcolor'))}</div>
              <div className='col-lg-6 col-sm-12 h6'>{this.toCompactColorPickerRow(i18n.t('blank_panel_titlecolor'))}</div>
            </div>
            <div className='row'>
              <div className='col-lg-6 col-sm-12 h6'>{this.toCompactColorPickerRow(i18n.t('nav_bgcolor'))}</div>
              <div className='col-lg-6 col-sm-12 h6'>{this.toCompactColorPickerRow(i18n.t('nav_brand_color'))}</div>
            </div>
          </div>
        </div>
        <div className='row'>
          <button className={updateButtonClass} onClick={this.handleUpdate} id='systemUpdateSettings'>
            <Save />&nbsp;{i18n.t('update')}
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    capabilities: state.capabilities,
    settings: state.settings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSettings: () => dispatch(fetchSettings()),
    updateSettings: s => dispatch(updateSettings(s))
  }
}

const Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(settings)
export default Settings
