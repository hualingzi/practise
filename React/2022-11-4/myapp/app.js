var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');
var newsRouter = require('./routes/news');
var typeRouter = require('./routes/type');
var wffRouter = require('./routes/wff');
var themeRouter = require('./routes/theme');
var styleRouter = require('./routes/style');
var equipmentRouter = require('./routes/equipment');
var regionRouter = require('./routes/region');
var pictureRouter = require('./routes/picture');
var authorRouter = require('./routes/author');

var app = express();

app.all('*', function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin', '*');
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'content-type');
    //跨域允许的请求方式
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    if (req.method == 'OPTIONS') res.send(200); //让options尝试请求快速结束
    else next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);
app.use('/news', newsRouter);
app.use('/type', typeRouter);
app.use('/wff', wffRouter);
app.use('/theme', themeRouter);
app.use('/style', styleRouter);
app.use('/equipment', equipmentRouter);
app.use('/region', regionRouter);
app.use('/picture', pictureRouter);
app.use('/author', authorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
