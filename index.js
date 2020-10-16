const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jgk8y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
    res.send("Hello")
})


const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const serviceCollection = client.db("createagency").collection("services");

app.post('/addService',(req,res) => {
    const service = req.body
  serviceCollection.insertOne(service)
  .then(result =>{
      res.send(result.insertedCount)
  })
    
})



});


app.listen(process.env.port || port)
