var gulp = require('gulp');
var url = require('url');
var qs = require('querystring');
var mincss = require('gulp-clean-css');
var webserver = require('gulp-webserver');
var minjs = require('gulp-uglify');
var minhtml = require('gulp-htmlmin');
var data = [{
        name: "百度",
        address: "北京市海淀区西北旺",
        tit: '互联网|已上市|10000人以上',
        text: "热招：前端工程师 等2382个职位"
    },
    {
        name: "百度",
        address: "北京市海淀区西北旺",
        tit: '互联网|已上市|10000人以上',
        text: "热招：前端工程师 等2382个职位"
    }, {
        name: "百度",
        address: "北京市海淀区西北旺",
        tit: '互联网|已上市|10000人以上',
        text: "热招：前端工程师 等2382个职位"
    }, {
        name: "百度",
        address: "北京市海淀区西北旺",
        tit: '互联网|已上市|10000人以上',
        text: "热招：前端工程师 等2382个职位"
    }, {
        name: "百度",
        address: "北京市海淀区西北旺",
        tit: '互联网|已上市|10000人以上',
        text: "热招：前端工程师 等2382个职位"
    }
]
gulp.task('createMock', function() {
    gulp.src('.')
        .pipe(webserver({
            port: 3000,
            middleware: function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*')
                var method = req.method;
                var pathName = url.parse(req.url).pathname;
                // console.log(method)
                // console.log(pathName);
                if (method === "POST") {
                    var str = '';
                    req.on('data', function(chunk) {
                        str += chunk;
                    })
                    req.on('end', function() {
                        var obj = {};
                        if (str.indexOf('{') !== -1 && str.indexOf('}') !== -1 && str.indexOf(':') !== -1) {
                            obj = JSON.parse(str);
                        } else {
                            obj = qs.parse(str);
                        }
                        switch (pathName) {
                            case '/list':
                                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                                res.write(JSON.stringify(data));
                                // console.log(data);
                                res.end();
                                break;
                        }
                    })
                } else if (method === 'OPTIONS') {
                    res.writeHead(200, {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json;charset=utf-8',
                        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Origin,X-Requested-With,Content-Type,Accept'
                    });
                    res.end();
                }
            }
        }))
});
//压缩css
gulp.task('cssmin', function() {
        // gulp.src('css/style.scss')
        gulp.src('css/style.css')
            .pipe(mincss())
            .pipe(gulp.dest('./css/'))
    })
    //压缩js
gulp.task('minJs', function() {
        gulp.src('./angular.js')
            .pipe(minjs())
            .pipe(gulp.dest('./js'))
    })
    // 压缩html

var options = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minfyCSS: true,
};
gulp.task('minHtml', function() {
    gulp.src('./index.html')
        .pipe(minhtml(options))
        .pipe(gulp.dest('./view/'))
})
gulp.task('default', ['createMock', 'minJs', 'cssmin', 'minHtml']);