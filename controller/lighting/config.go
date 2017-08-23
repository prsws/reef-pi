package lighting

import (
	"time"
)

type Jack struct {
	Name string `json:"name" yaml:"name"`
	Pins []int  `json:"pins" yaml:"pins"`
}

type Channel struct {
	Name         string `json:"name" yaml:"name"`
	Pin          int    `json:"pin" yaml:"pin"`
	Reverse      bool   `json:"reverse" yaml:"reverse"`
	MinTheshold  int    `json:"min" yaml:"min"`
	MaxThreshold int    `json:"max" yaml:"max"`
	Ticks        int    `json:"ticks" yaml:"ticks"`
	Values       []int  `json:"values" yaml:"values"`
	Fixed        int    `json:"fixed" yaml:"fixed"`
	Auto         bool   `json:"auto" yaml:"auto"`
}

type Config struct {
	Enable   bool            `yaml:"enable"`
	DevMode  bool            `yaml:"dev_mode"`
	Interval time.Duration   `yaml:"interval"`
	Jacks    map[string]Jack `yaml:"jacks"`
}

var DefaultConfig = Config{
	Interval: 15 * time.Second,
	Jacks:    make(map[string]Jack),
}