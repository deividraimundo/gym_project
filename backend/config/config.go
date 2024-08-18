package config

import (
	"flag"
	"log"

	"github.com/caarlos0/env/v11"
	_ "github.com/lib/pq"
	_ "github.com/sijms/go-ora/v2"
)

var Version = "dev"
var ServiceName = "gym_project"

type DBConfig struct {
	User   string `env:"USER,required"`
	Pass   string `env:"PASS,required"`
	Host   string `env:"HOST,required"`
	Port   int    `env:"PORT" envDefault:"1521"`
	Name   string `env:"NAME" envDefault:"dbora"`
	Driver string `env:"DB_TYPE" envDefault:"oracle"`
}

type Config struct {
	DBConfig DBConfig `envPrefix:"DB_"`
	DevMode  bool
}

func New() (*Config, error) {
	devMode := Version == "dev"

	if !devMode {
		flag.BoolVar(&devMode, "devmode", false, "Adicionar esta flag para modo desenvolvimento.")
		flag.Parse()
	}

	if devMode {
		log.Println("#### Ambiente de desenvolvimento ####")
	}

	var cfg = Config{
		DevMode: devMode,
	}

	err := env.Parse(&cfg)
	if err != nil {
		return nil, err
	}

	return &cfg, nil
}
