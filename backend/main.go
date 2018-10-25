package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
	"github.com/spf13/viper"
)

var (
	port      = ":8000"
	mongoUser = "root"
	mongoPass = "example"
	mongoHost = "mongo"
	mongoDB   = "golada"
	mongoC    = "golada"
)

func init() {
	viper.SetEnvPrefix("golada")
	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer("-", "_", ".", "_"))

	if p := viper.GetString("backend.port"); p != "" {
		port = ":" + p
	}
	if p := viper.GetString("backend.mongo.user"); p != "" {
		mongoUser = p
	}
	if p := viper.GetString("backend.mongo.pass"); p != "" {
		mongoPass = p
	}
	if p := viper.GetString("backend.mongo.host"); p != "" {
		mongoHost = p
	}
	if p := viper.GetString("backend.mongo.db"); p != "" {
		mongoDB = p
	}
	if p := viper.GetString("backend.mongo.c"); p != "" {
		mongoC = p
	}
}

func main() {

	mongoDial := fmt.Sprintf("%v:%v@%v", mongoUser, mongoPass, mongoHost)

	// Dial a connection to Mongo - this creates the connection pool
	m, err := mgo.Dial(mongoDial)
	if err != nil {
		fmt.Println("cannot dial to mongo", err)
	}

	if err = initMongo(m); err != nil {
		fmt.Println("cannot init mongo", err)
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		res := struct {
			ID  string `json:"-" bson:"id"`
			Msg string `json:"msg" bson:"msg"`
		}{}
		if err := m.Copy().DB(mongoDB).C(mongoC).Find(bson.M{"id": "greet"}).One(&res); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"error": err.Error(),
			})
		}
		json.NewEncoder(w).Encode(res)
	})

	http.HandleFunc("/migrate", func(w http.ResponseWriter, r *http.Request) {
		err := initMongo(m)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"error": err.Error(),
			})
		}
	})
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Println(err)
	}
}

func initMongo(m *mgo.Session) error {

	s := struct {
		ID  string `bson:"id"`
		Msg string `bson:"msg"`
	}{
		"greet",
		"Hello golada",
	}

	return m.DB(mongoDB).C(mongoC).Insert(s)
}
