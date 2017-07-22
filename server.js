var express = require('express');  
 
var app = express();  
app.set('view engine', 'ejs');  
app.use(express.static('public'));
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
   content: '<form action="post_test" method="post">POST:<input type="text" name="something"/><input type="submit" value="Submit"/></form>'
  });
});
app.get('/get_form', function(req, res) {
 res.render('index', {
   id: ['index', 'post_form', 'get_form'],
   style: ['', '', 'active'],
   li: ['首頁', 'POST', 'GET'],
   href: ['/', 'post_form', 'get_form'],
   content: '<form action="get_test" method="get">GET:<input type="text" name="something"/><input type="submit" value="Submit"/></form>'
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