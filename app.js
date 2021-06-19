const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.use(express.urlencoded({ extended: true }));

const dbString = 'mongodb://localhost:27017/tutorial_db';

const sessionStore = MongoStore.create({
  mongoUrl: dbString,
  dbName: 'tutorial_db',
  collectionName: 'sessions',
});

app.use(
  session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals to one day
    },
  })
);

app.get('/', (req, res, next) => {
  console.log(req.session);
  res.send('<h1>Sessions</h1>');
});

// An error handling middleware, has an err object
// avoids system crashes due to errors
function errorHandler(err, req, res, next) {
  if (err) {
    console.log(err);
    res.json({
      error: err,
    });
  }
}

// has to be put after all the code
app.use(errorHandler);
app.listen(3000, () => {
  console.log('We are running...');
});
