const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
// --------------------------------------------------------------------------------------------------

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require("./startup/routes")(app);
require('./middleware/logger')(app);

// --------------------------------------------------------------------------------------------------

app.get('/test', (req, res) => {
	res.send('response content here');
	res.end();
});

app.post('/test', (req, res) => {
    console.log(req.body);
	res.end();
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.sendStatus(500);
});

module.exports = app;
