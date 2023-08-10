var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
var DomParser = require('dom-parser');
var parser = new DomParser();


var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var viewpageRouter = require('./routes/api');
var viewRouter = require('./routes/viewpage');
var copeformRouter = require('./routes/copeform');
var apiRouter = require('./routes/api');
var fileRouter = require('./routes/copeform');
const pctformRouter = require('./routes/pctform');
const viewPctForm = require('./routes/viewPagePct');
var pctdashboardRouter = require('./routes/pctdashboard');
var createpctRouter = require('./routes/pctform');








var app = express();
app.use(fileUpload());
var session = require('express-session');

app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.somevar = "hello world";

app.locals.someHelper = function(value) {
  value =  (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value));
return  value;
}

app.locals.decod = function(str) {
  str = str.replaceAll('&lt;','<');
  str= str.replaceAll('&gt;','>');
    let txt = parser.parseFromString(str,'text/html');
    console.log(txt);
    txt =  txt.rawHTML

    return txt;

}


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/copeform', copeformRouter);
app.use('/pctform',pctformRouter);
app.use('/new/pctform',pctformRouter);
app.use('/viewpage-pct',viewPctForm);
app.use('/new', apiRouter);
app.use('/api/viewpage', viewpageRouter);
app.use('/viewpage', viewRouter);
app.use('/dashboard', dashboardRouter);
app.use('/api/users', apiRouter);
app.use('/api/file/', fileRouter);
app.use('/api/form/',createpctRouter)
app.use('/pctdashboard',pctdashboardRouter);



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
