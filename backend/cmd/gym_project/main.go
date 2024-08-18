package main

import (
	"gym_project/config"
	"gym_project/database"
	"log"
)

func main() {
	log.Printf("%s - %s", config.ServiceName, config.Version)
	cfg, err := config.New()
	if err != nil {
		log.Fatalf("nao pode criar config: %v", err)
	}

	dao, err := database.New(&cfg.DBConfig)
	if err != nil {
		log.Fatalf("nao pode criar DAO: %v", err)
	}

	defer dao.Close()
	log.Println("Connection with database was successful!")
}
