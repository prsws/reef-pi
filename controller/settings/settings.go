package settings

//swagger:model settings
type Settings struct {
	Name           string            `json:"name"`
	Interface      string            `json:"interface"`
	Address        string            `json:"address"`
	Display        bool              `json:"display"`
	Notification   bool              `json:"notification"`
	Capabilities   Capabilities      `json:"capabilities"`
	HealthCheck    HealthCheckNotify `json:"health_check"`
	HTTPS          bool              `json:"https"`
	Pprof          bool              `json:"pprof"`
	RPI_PWMFreq    int               `json:"rpi_pwm_freq"`
	Prometheus     bool              `json:"prometheus"`
	CORS           bool              `json:"cors"`
	BP_BgColor     string            `json:"blank_panel_bgcolor"`
	BP_TitleColor  string            `json:"blank_panel_titlecolor"`
	Nav_BgColor    string            `json:"nav_bgcolor"`
	Nav_BrandColor string            `json:"nav_brand_color"`
}

var DefaultSettings = Settings{
	Name:         "reef-pi",
	Interface:    "wlan0",
	Address:      "0.0.0.0:80",
	Capabilities: DefaultCapabilities,
	RPI_PWMFreq:  100,
	HealthCheck: HealthCheckNotify{
		MaxMemory: 500,
		MaxCPU:    2,
	},
}
