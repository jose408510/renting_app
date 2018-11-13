const express = require('express');
const app = express();
const houses = require('./routes/api/houses')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use('/api/users', users);
app.use('/api/houses', houses);
app.use('/api/posts', posts);
// DB Config
const db = require('./config/keys').mongoURI;
// connect to MongoDB 
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get('/' , (req,res) => {
  res.send('Hello')
})

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
  
