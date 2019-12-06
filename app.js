const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();

// --------------------------------------------------------------------------------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --------------------------------------------------------------------------------------------------

require("./startup/routes")(app);
require('./middleware/logger')(app);


app.get('/', (req, res) => {
	res.send('test');
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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
