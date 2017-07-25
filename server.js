var express = require('express');  
var body_parser = require('body-parser');
var app = express();  

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.set('view engine', 'ejs');  

app.get('/', function(req, res) {
 res.render('index', {
   id: ['index', 'post_form', 'get_form'],
   style: ['active', '', ''],
   li: ['首頁', 'POST', 'GET'],
   href: ['/', 'post_form', 'get_form'],
   content: '<h1>Hello world~中文?</h1>'
  });
});
app.get('/post_form', function(req, res) {
 res.render('index', {
   id: ['index', 'post_form', 'get_form'],
   style: ['', 'active', ''],
   li: ['首頁', 'POST', 'GET'],
   href: ['/', 'post_form', 'get_form'],
   content: '<form action="post_action" method="post">POST:<input type="text" name="something"/><input type="submit" value="Submit"/></form>'
  });
});
app.get('/get_form', function(req, res) {
 res.render('index', {
   id: ['index', 'post_form', 'get_form'],
   style: ['', '', 'active'],
   li: ['首頁', 'POST', 'GET'],
   href: ['/', 'post_form', 'get_form'],
   content: '<form action="get_action" method="get">GET:<input type="text" name="something"/><input type="submit" value="Submit"/></form>'
  });
});
app.post('/post_action', function(req, res) {
    var post_msg = req.body.something;
 res.render('index', {
   id: ['index', 'post_form', 'get_form'],
   style: ['', '', ''],
   li: ['首頁', 'POST', 'GET'],
   href: ['/', 'post_form', 'get_form'],
   content: 'POST得到：'+post_msg
  });
});
app.get('/get_action', function(req, res) {
    var get_msg = req.query.something;
 res.render('index', {
   id: ['index', 'post_form', 'get_form'],
   style: ['', '', ''],
   li: ['首頁', 'POST', 'GET'],
   href: ['/', 'post_form', 'get_form'],
   content: 'GET得到：'+get_msg
  });
});
app.get(/(.*)(\.)*/i, function(req, res) {  
  res.sendfile(__dirname + "/" + req.params[0], function(err) {
    if (err) res.send(404);
  });
});  
var server = app.listen(process.env.PORT, function() {  
  console.log('Listening on port '+process.env.PORT);  
});   