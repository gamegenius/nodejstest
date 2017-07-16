var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var mysql = require('mysql');

http.createServer(function(req, res) {
  var q = url.parse(req.url, true);
  var filename, ContentType;
  switch (q.pathname.replace(/(.*)\./,".")) {
    case '.html':
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
      break;
    /*case '.js':
      ContentType = {'Content-Type': 'application/x-javascript'};
      break;*/
    
    default:
      //ContentType = {'Content-Type': 'text/html'};
      break;
  }
  switch (q.pathname) {
    case '/':
      fs.readFile("./index.html", function(err, data) {
        if (err) {
          res.writeHead(404, {
            'Content-Type': 'text/html'
          });
          return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(data);
        return res.end();
      });
      break;
    case '/get_test':
      var a;
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
      for (a in q.query) {
        res.write(a + ":" + q.query[a]);
      }
      res.end();
      break;
    case '/post_test':
      var body = "";
      req.on('data', function(chunk) {
        body += chunk;
      });
      req.on('end', function() {
        // 解析参数
        body = qs.parse(body);
        // 设置响应头部信息及编码
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        if (body.something) {
          // 输出提交的数据
          res.write("接收POST:" + body.something);
        }
        

        res.end();
      });
      break;
    case '/msg_show':
      var sqldata;
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
      var con = mysql.createConnection({
        host: "db.mis.kuas.edu.tw",
        user: "s1103107109",
        password: "B123012591",
        database: "s1103107109"
      });
      con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT A.`id`,B.`username`,B.`nickname`,B.`email`,A.`text` FROM `anonymous_message_board` A,`user_profile` B WHERE A.`username` = b.`username` ORDER BY A.`id`", function (err, result, fields) {
          if (err) throw err;
          for(a in result){
            res.write('<table border="1" width="50%"><tr><td>'+(parseInt(a)+1)+"樓<br />暱稱："+result[a].nickname+"<br />電子郵件："+result[a].email+"</td></tr><tr><td>"+result[a].text+"</td></tr></table><br/>");
          }
          res.end();
        });
      });
      
      break;
    default:
      filename = "." + q.pathname;
      fs.readFile(filename, function(err, data) {
        if (err) {
          res.writeHead(404, {
            'Content-Type': 'text/html'
          });
          return res.end("404 Not Found");
        }

        res.write(data);
        return res.end();
      });
      break;
  }

}).listen(process.env.PORT);
