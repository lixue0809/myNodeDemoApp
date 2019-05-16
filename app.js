var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var regestRouter = require('./routes/regest');
var regest4ajaxRouter = require('./routes/regest4ajax');
var loginRouter = require('./routes/login');
var login4ajaxRouter = require('./routes/login4ajax');
var blogRouter = require('./routes/blog');
var blog4ajaxRouter = require('./routes/blog4ajax');
var blogListRouter = require('./routes/blogList');
// var blogList4ajaxRouter = require('./routes/blogList4ajax');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
// app.use(favicon(__dirname+'/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/regest', regestRouter);
app.use('/regest4ajax', regest4ajaxRouter);
app.use('/login', loginRouter);
app.use('/login4ajax', login4ajaxRouter);
app.use('/blog', blogRouter);
app.use('/blog4ajax', blog4ajaxRouter);
app.use('/blogList', blogListRouter);
// app.use('/blogList4ajax', blogList4ajaxRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
