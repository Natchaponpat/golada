package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/globalsign/mgo"
	"github.com/spf13/viper"
)

func init() {
	viper.SetEnvPrefix("golada")
	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer("-", "_", ".", "_"))
}

func main() {
	port := ":8000"
	if p := viper.GetString("backend.port"); p != "" {
		port = ":" + p
	}

	// Dial a connection to Mongo - this creates the connection pool
	//	m, err := mgo.Dial("root:example@localhost")
	//	if err != nil {
	//		fmt.Println("cannot dial to mongo", err)
	//	}
	//
	//	if err = initMongo(m); err != nil {
	//		fmt.Println("cannot init mongo", err)
	//	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		res := map[string]interface{}{
			"msg": "Hello golada",
		}
		json.NewEncoder(w).Encode(res)
	})
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Println(err)
	}
}

func initMongo(m *mgo.Session) error {
	s := struct {
		Msg string `bson:"msg"`
	}{
		"Hello golada",
	}

	return m.DB("golada").C("golada").Insert(s)
}
