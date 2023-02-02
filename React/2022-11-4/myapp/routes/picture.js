var express = require('express');
var router = express.Router();
let getcon = require('./dbutil');
let jwt = require('../jwt/index.js');
router.use(jwt);
/**
 * 新增图片
 * @name 图片名称
 * @imgUrl 图片地址
 * @theme 题材
 * @equipment 设备
 * @style 风格
 * @region 地区
 * @author 作者
 * @views 浏览量
 * @stars 收藏量
 */
router.post('/add', function (req, res, next) {
    if (!req.body.name) {
        res.send({
            code: 101,
            msg: '名称不能为空'
        });
        return;
    } else if (!req.body.imgUrl) {
        res.send({
            code: 101,
            msg: '图片不能为空'
        });
        return;
    } else if (!req.body.theme) {
        res.send({
            code: 101,
            msg: '题材不能为空'
        });
        return;
    } else if (!req.body.style) {
        res.send({
            code: 101,
            msg: '风格不能为空'
        });
        return;
    } else if (!req.body.equipment) {
        res.send({
            code: 101,
            msg: '设备不能为空'
        });
        return;
    } else if (!req.body.region) {
        res.send({
            code: 101,
            msg: '地区不能为空'
        });
        return;
    } else if (!req.body.author) {
        res.send({
            code: 101,
            msg: '作者不能为空'
        });
        return;
    } else if (!req.body.views) {
        res.send({
            code: 101,
            msg: '浏览量不能为空'
        });
        return;
    } else if (!req.body.stars) {
        res.send({
            code: 101,
            msg: '收藏量不能为空'
        });
        return;
    }

    let db = getcon();
    db.connect();
    let sql = 'INSERT INTO picture (name,imgUrl,theme,equipment,style,region,author,views,stars) VALUES (?,?,?,?,?,?,?,?,?)';
    db.query(sql, [req.body.name, req.body.imgUrl, req.body.theme, req.body.equipment, req.body.style, req.body.region, req.body.author, req.body.views, req.body.stars], function (error, results) {
        if (error) {
            res.send({
                code: 500,
                data: '添加失败(类型名称已存在)'
            });
            return;
        }
        res.send({
            code: 200,
            data: '添加成功'
        });
        db.end();
    });
});
/**
 * 删除类型
 * @id
 */
router.delete('/delete', function (req, res, next) {
    // let sql = 'SELECT * FROM students'
    let db = getcon();
    db.connect();
    let sql = 'DELETE FROM picture WHERE id = ?';
    db.query(sql, [req.body.id], function (error, results) {
        if (error) {
            res.send({
                code: 500,
                data: '删除失败' + error
            });
            return;
        }
        console.log(results);
        if (results.affectedRows > 0) {
            res.send({
                code: 200,
                data: '删除成功'
            });
        } else {
            res.send({
                code: 500,
                data: '删除目标不存在'
            });
        }
        db.end();
    });
});
/**
 * 修改类型
 * @name 学生名称
 * @id
 */
router.put('/edit', function (req, res, next) {
    // let sql = 'SELECT * FROM students'
    let db = getcon();
    db.connect();
    let sql = 'UPDATE picture SET name = ? , imgUrl = ? ,theme = ? , equipment = ? , style = ? , region = ? , author = ? , views = ? , stars = ?  WHERE id = ?';
    if (!req.body.name) {
        res.send({
            code: 101,
            msg: '修改名称不能为空'
        });
        return;
    } else if (!req.body.imgUrl) {
        res.send({
            code: 101,
            msg: '图片不能为空'
        });
        return;
    } else if (!req.body.theme) {
        res.send({
            code: 101,
            msg: '题材不能为空'
        });
        return;
    } else if (!req.body.style) {
        res.send({
            code: 101,
            msg: '风格不能为空'
        });
        return;
    } else if (!req.body.equipment) {
        res.send({
            code: 101,
            msg: '设备不能为空'
        });
        return;
    } else if (!req.body.region) {
        res.send({
            code: 101,
            msg: '地区不能为空'
        });
        return;
    } else if (!req.body.author) {
        res.send({
            code: 101,
            msg: '作者不能为空'
        });
        return;
    } else if (!req.body.views) {
        res.send({
            code: 101,
            msg: '浏览量不能为空'
        });
        return;
    } else if (!req.body.stars) {
        res.send({
            code: 101,
            msg: '收藏量不能为空'
        });
        return;
    }
    db.query(sql, [req.body.name, req.body.imgUrl, req.body.theme, req.body.equipment, req.body.style, req.body.region, req.body.author, req.body.views, req.body.stars, req.body.id], function (error, results) {
        if (error) {
            res.send({
                code: 500,
                data: '系统错误' + error
            });
            return;
        }
        console.log(results.changedRows);
        if (results.changedRows > 0) {
            res.send({
                code: 200,
                data: '修改成功'
            });
        } else {
            res.send({
                code: 500,
                data: '修改失败'
            });
        }
        db.end();
    });
});
/**
 * 查
 * @pageNum 当前页
 * @pageSize 一页多少条
 * @name 名称
 */
router.get('/check', function (req, res, next) {
    // let sql = 'SELECT * FROM students'
    let db = getcon();
    db.connect();
    // 当前页
    let pageNum = req.query.pageNum - 0;
    // 页面条数
    let pageSize = req.query.pageSize - 0; //传过来的是个字符串 -0把他变成数字
    // 起始条数
    let start = (pageNum - 1) * pageSize;

    let sql = `SELECT * FROM picture`;
    let sql2;
    let count;
    if (req.query.name) {
        sql2 = `SELECT COUNT(*) FROM picture where name like '%${req.query.name}%'`;
        sql += ` where name like '%${req.query.name}%' LIMIT ${start},${pageSize}`;
    } else {
        sql2 = 'SELECT COUNT(*) FROM picture';
        sql += ` LIMIT ${start},${pageSize}`;
    }
    db.query(sql2, null, (err, results) => {
        count = results[0]['COUNT(*)'];
        console.log(count);
    });
    db.query(sql, [start, pageSize], (err, results) => {
        console.log(results);
        console.log(count);
        if (err) {
            res.send({
                code: 500,
                msg: '查询失败'
            });
        } else {
            res.send({
                code: 200,
                msg: '查询成功',
                results,
                total: count
            });
        }
    });
});
module.exports = router;
