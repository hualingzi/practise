const expressJwt = require('express-jwt');
const jwt = expressJwt({
    secret: 'wwj',
    algorithms: ['HS256']
}).unless({
    //不需要token的接口
    path: [
        '/login',
        '/registered',
        '/updata',
        '/upload',
        '/news/check',
        '/news/add',
        '/news/edit',
        '/news/delete',
        '/type/check',
    ]
});

module.exports = jwt;
