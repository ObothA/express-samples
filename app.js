const express = require('express');

const app = express();

// adding our middlewares
app.use(middleware1);
app.use(middleware2);

function middleware1(req, res, next) {
  console.log('I am middleware #1');
  next();
}

function middleware2(req, res, next) {
  console.log('I am middleware #2');
  next();
}

const  middleware3 = (req, res, next) => {
  console.log('I am middleware #3');

  const errObject = new Error('I am an error');
  next(errObject);
}

app.get('/', middleware3, (req, res, next) => {
  res.status(200);
  res.json({
    greeting: 'hello'
  })
})

// An error handling middleware, has an err object
// avoids system crashes due to errors
function errorHandler(err, req, res, next) {
  if (err) {
    // console.log(err);
    res.json({
      error: err
    })
  }
}

// has to be put after all the code
app.use(errorHandler);
app.listen(3000, () => {
  console.log('We are running...');
})