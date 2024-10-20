package config

import (
	"flag"
	"log"

	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var Version = "dev"
var ServiceName = "gym_project"

type DBConfig struct {
	User   string `env:"USER,required"`
	Pass   string `env:"PASS,required"`
	Host   string `env:"HOST,required"`
	Port   int    `env:"PORT" envDefault:"5432"`
	Name   string `env:"NAME" envDefault:"postgres"`
	Driver string `env:"DRIVER" envDefault:"postgres"`
}

type Config struct {
	DBConfig DBConfig `envPrefix:"DB_"`
	Port     int      `env:"PORT" envDefault:"9000"`
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

	err := godotenv.Load(".env")
	if err != nil {
		return nil, err
	}

	err = env.Parse(&cfg)
	if err != nil {
		return nil, err
	}

	return &cfg, nil
}
