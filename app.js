const express = require('express');

const app = express();

// adding our middlewares
app.use(middleware1);
app.use(middleware2);

function middleware1(req, res, next) {
  req.customProperty = 100;
  next();
}

function middleware2(req, res, next) {
  console.log(`The custom property value is: ${req.customProperty}`);
  req.customProperty = 600;
  next();
}

app.get('/', (req, res, next) => {
  res.status(200);
  res.json({
    value: req.customProperty
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