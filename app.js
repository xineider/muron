var express = require('express');
var session = require('express-session');
var parseurl = require('parseurl');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Control = require('./app/controller/control.js');
const fileUpload = require('express-fileupload');

var VerificacaoModel = require('./app/model/verificacaoModel');
var verificacao = new VerificacaoModel;

var login = require('./app/controller/login');
var index = require('./app/controller/index');
var usuarios = require('./app/controller/usuarios');
var grupos = require('./app/controller/grupos');
var chats = require('./app/controller/chats');
var faculdades = require('./app/controller/faculdades');
var postagens = require('./app/controller/postagens');
var sobre = require('./app/controller/sobre');
var api = require('./app/controller/api');
var configuracoes = require('./app/controller/configuracoes');

var app = express();
var control = new Control;

app.use(require('express-is-ajax-request'));
// INICIANDO SESSION
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'muronapp',
  resave: true,
  saveUninitialized: true
}));

// Verifica usuario se esta logado ou não
app.use(function (req, res, next) {
  var pathname = parseurl(req).pathname;
  if ((pathname != '/' && pathname != '') && pathname.indexOf("api") == -1 &&
      (pathname.indexOf("css") == -1 && pathname.indexOf("js") == -1 && pathname.indexOf("imgs") == -1 && pathname.indexOf("fonts") == -1) && 
        req.isAjaxRequest() == true){
    var id = req.headers['authority-optima-id'];
    var hash = req.headers['authority-optima-hash'];
    var tipo = req.headers['authority-optima-tipo'];
    verificacao.VerificarUsuario(id, hash, tipo).then(data => {
      if (data.length > 0) {
        req.session.usuario = {};
        req.session.usuario.id = id;
        req.session.usuario.hash_login = hash;
        req.session.usuario.tipo = tipo;
        req.session.usuario.nome_murer = data[0].nome_murer;
        req.session.usuario.email = data[0].email;
        next();
      } else {
        req.session.destroy(function(err) {
          res.json('<script>window.location.replace("/");</script>');
        });
      }
    });
  } else if (control.Isset(req.session.usuario, false)
    && (pathname != '/' && pathname != '') && pathname.indexOf("api") == -1
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
app.use(fileUpload());

app.use('/', login);
app.use('/sistema', index);
app.use('/sistema/usuarios', usuarios);
app.use('/sistema/grupos', grupos);
app.use('/sistema/chats', chats);
app.use('/sistema/faculdades', faculdades);
app.use('/sistema/postagens', postagens);
app.use('/sistema/sobre', sobre);
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
