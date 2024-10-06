package main

import (
	"fmt"
	"gym_project/auth"
	"gym_project/config"
	"gym_project/database"
	"gym_project/graph"
	"gym_project/graph/generated"
	"gym_project/services"
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
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

	svc := services.New(dao)
	err = svc.InitDatabase()
	if err != nil {
		log.Fatalf("nao pode criar tabelas: %v", err)
	}

	listen(cfg.Port)
}

func listen(port int) {
	apiCfg := generated.Config{Resolvers: &graph.Resolver{}}
	schema := generated.NewExecutableSchema(apiCfg)
	srv := handler.New(schema)

	http.Handle("/", playground.Handler("GraphQL playground", "/api/graphql"))
	http.Handle("/graphql", srv)
	srv.AroundFields(auth.ResolverMiddleware())

	log.Printf("connect to http://localhost:%d/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}
