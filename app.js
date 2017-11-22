var express = require('express');
var session = require('express-session');
var parseurl = require('parseurl');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Control = require('./app/controller/control.js');

var login = require('./app/controller/login');
var index = require('./app/controller/index');
var api = require('./app/controller/api');
var configuracoes = require('./app/controller/configuracoes');

var app = express();
var control = new Control;

app.use(require('express-is-ajax-request'));
// INICIANDO SESSION
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'sistemapazze',
  resave: true,
  saveUninitialized: true
}));

// Verifica usuario se esta logado ou não
app.use(function (req, res, next) {
  req.session.id_usuario = 1;
  var pathname = parseurl(req).pathname;
  if (control.Isset(req.session.id_usuario, false) 
  	&& (pathname != '/' && pathname != '')
  		&& (pathname.indexOf("css") == -1 && pathname.indexOf("js") == -1 && pathname.indexOf("imgs") == -1 && pathname.indexOf("fonts") == -1)) {
		res.redirect('/');
  } else {
		next();
  }

});

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /assets
//app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/assets", express.static(__dirname + '/assets'));
// app.use(express.static(path.join(__dirname, '/assets')));
// console.log(path.join(__dirname, 'assets'));

app.use('/', login);
app.use('/sistema', index);
app.use('/sistema/api', api);
app.use('/sistema/configuracoes', configuracoes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log('ERROR --------------------- ERROR');
  console.log(err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
	if (typeof req.session.id_usuario != 'undefined' && req.session.id_usuario != 0) {
  	res.render('error', { erro: 'Página não existente.', tipo_erro: '404' });
  } else {
  	res.render('login/index', { erro: 'Página não existente, faça o login para acessar o sistema.', tipo_erro: '404' });
  }
});
// app.listen(3000);

module.exports = app;
