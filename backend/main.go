package main

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/spf13/viper"
)

func init() {
	viper.SetEnvPrefix("golada")
	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer("-", "_", ".", "_"))
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprint(w, "Hello golada\n")
	})
	port := viper.GetString("backend.port")
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		fmt.Println(err)
	}
}
