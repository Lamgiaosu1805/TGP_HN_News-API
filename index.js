const express = require('express')
const app = express()
const port = 3000
const route = require('./src/routes')
const morgan = require('morgan')
const db = require('./src/config/connectdb')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

//Load .env
require('dotenv').config();

//use middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cors(corsOptions))

//connect DB
db.connect()

//routing
route(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})