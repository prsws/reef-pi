import * as Yup from 'yup'
import i18n from 'utils/i18n'

const SettingsSchema = Yup.object().shape({
  name: Yup.string().required(i18n.t('configuration:settings:name_required')),
  interface: Yup.string().required(i18n.t('configuration:settings:network_interface_required')),
  address: Yup.string().required(i18n.t('configuration:settings:network_address_required')),
  display: Yup.bool(),
  cors: Yup.bool(),
  notification: Yup.bool(),
  capabilities: Yup.object().required(i18n.t('configuration:settings:capabilities_required')),
  health_check: Yup.object().shape({
    enable: Yup.bool(),
    max_memory: Yup.number().positive().integer(),
    max_cpu: Yup.number().positive().integer()
  }),
  https: Yup.bool(),
  pprof: Yup.bool(),
  prometheus: Yup.bool(),
  rpi_pwm_freq: Yup.number().positive().integer(),
  blank_panel_bgcolor: Yup.string().default('#ffffff'),
  blank_panel_titlecolor: Yup.string().default('#aaaaaa'),
  nav_bgcolor: Yup.string().default('#aaaaaa'),
  nav_brand_color: Yup.string().default('#ffffff')
})

export default SettingsSchema
