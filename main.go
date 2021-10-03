package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	uuid "github.com/satori/go.uuid"
)

var db *gorm.DB
var err error

// Base contains common columns for all tables.
type Base struct {
	ID        uuid.UUID  `gorm:"type:char(36);primary_key;"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
   }

// BeforeCreate will set a UUID rather than numeric ID.
func (base *Base) BeforeCreate(scope *gorm.Scope) error {
	uuid := uuid.NewV4()
	if err != nil {
	 return err
	}
	return scope.SetColumn("ID", uuid)
   }

// model Location
type Location struct {
	Base
	Name string `json:"name"`
}

// Model User
type User struct {
	Base
	Email string `json:"email"`
}

type Result struct {
	Code int 			`json:"code"`
	Data interface{}	`json:"data"`
	Message string		`json:"message"`
}

func main()  {
	db, err = gorm.Open("mysql", "root:root@/backend_test?charset=utf8&parseTime=True")

		if err != nil {
			log.Println("Connection Failed", err)
		} else {
			log.Println("Connection Established")
		}

		//untuk migrasi dari struct ke table database
		db.AutoMigrate(&Location{}, &User{})



		handleRequest()
}


func handleRequest()  {
	myRouter := mux.NewRouter().StrictSlash(true)

	//Router
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/api/locations", createLocation).Methods("POST") 
	myRouter.HandleFunc("/api/locations", getLocations).Methods("GET") 
	myRouter.HandleFunc("/api/location/{id}", getLocation).Methods("GET") 


	myRouter.HandleFunc("/api/users", createUser).Methods("POST") 
	myRouter.HandleFunc("/api/users", getUsers).Methods("GET") 
	myRouter.HandleFunc("/api/user/{id}", getUser).Methods("GET") 


	


	log.Println("Connected to Port 5000")
	log.Fatal(http.ListenAndServe(":5000", myRouter))
	
}

//Routing HomePage
func homePage(w http.ResponseWriter, r *http.Request)  {
	fmt.Fprintf(w, "Welcome to Home Page")
}


// route to create new data users table 
func createUser(w http.ResponseWriter, r *http.Request)  {
	payloads, _ := ioutil.ReadAll(r.Body)
	
	var user User
	json.Unmarshal(payloads, &user)

	
	db.Create(&user)

	if payloads == nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	res := Result{Code: 200, Data: user, Message: "success create new User"}
	result, err := json.Marshal(res)

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(result)
}

// route to get all data of users
func getUsers(w http.ResponseWriter, r *http.Request)  {
	users := []User{}

	db.Find(&users)


	res:= Result{Code: 200, Data: users, Message: "Success get all users"}

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)	
}

// route to get singele data of user
func getUser(w http.ResponseWriter, r *http.Request)  {
	
	vars	:= mux.Vars(r)
	key 	:= vars["ID"]
	var user User

	db.First(&user, key)



	res:= Result{Code: 200, Data: user, Message: "Success get user with id"}

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)	
}


// route to create new data location table 
func createLocation(w http.ResponseWriter, r *http.Request)  {
	payloads, _ := ioutil.ReadAll(r.Body)

	var location Location
	json.Unmarshal(payloads, &location)

	db.Create(&location)

	res := Result{Code: 200, Data: location, Message: "success create location"}
	result, err := json.Marshal(res)

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(result)
}

func getLocations(w http.ResponseWriter, r *http.Request)  {
	locations := []Location{}

	db.Find(&locations)


	res:= Result{Code: 200, Data: locations, Message: "Success get all locations"}

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)	
}

// route to get singele data of location
func getLocation(w http.ResponseWriter, r *http.Request)  {
	
	vars	:= mux.Vars(r)
	key 	:= vars["ID"]
	var location Location

	db.First(&location, key)



	res:= Result{Code: 200, Data: location, Message: "Success get user with id"}

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)	
}
