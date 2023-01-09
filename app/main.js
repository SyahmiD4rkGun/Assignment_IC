let db,trips,expenses;

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.98hil.mongodb.net/MDBU";
var url = "mongodb://192.168.166.128:27017/MDBU"
MongoClient.connect(
	// TODO: Connection 
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      console.log("Connected to MongoDb")
      db = client.db("tripcost")
      trips = db.collection("trips")
      expenses = db.collection("expenses")
    }
  )

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/Trip_Plan', tripplan)

const db = require("./models");
const Role = db.role;

app.post("/trip", (req, res) => {
    const name = req.body.name
    trips.insertOne({ name: name }, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      console.log(result)
      res.status(200).json({ ok: true })
    })
  })

  app.get("/trips", (req, res) => {
    trips.find().toArray((err, items) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      res.status(200).json({ trips: items })
    })
  })
  

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});