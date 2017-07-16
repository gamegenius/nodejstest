var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

http.createServer(function(req, res) {
  var q = url.parse(req.url, true);
  var filename, ContentType;
  /*switch (q.pathname.replace(/(.*)\./,".")) {
    case '.css':
      ContentType = {'Content-Type': 'text/css'};
      break;
    case '.js':
      ContentType = {'Content-Type': 'application/x-javascript'};
      break;
    
    default:
      ContentType = {'Content-Type': 'text/html'};
      break;
  }*/
  switch (q.pathname) {
    case '/':
      fs.readFile("./index.html", function(err, data) {
        if (err) {
          res.writeHead(404, {
            'Content-Type': 'text/html'
          });
          return res.end("404 Not Found");
        }
        res.writeHead(200, ContentType);
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
          res.write("中文something:" + body.something);
        }
        

        res.end();
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
