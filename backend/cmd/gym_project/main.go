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
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/rs/cors"
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
	router := chi.NewRouter()
	router.Use(cors.New(cors.Options{AllowCredentials: true}).Handler)

	apiCfg := generated.Config{Resolvers: &graph.Resolver{}}
	schema := generated.NewExecutableSchema(apiCfg)
	srv := handler.New(schema)
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})
	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
	})

	router.Handle("/graphql", srv)
	router.Handle("/", playground.Handler("GraphQL playground", "/graphql"))
	srv.AroundFields(auth.ResolverMiddleware())

	log.Printf("connect to http://localhost:%d/ for GraphQL playground", port)
	server := &http.Server{
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		Handler:      router,
		Addr:         fmt.Sprintf(":%d", port),
	}
	log.Fatal(server.ListenAndServe())
}
