var express = require('express');  
var body_parser = require('body-parser');
var mysql = require('mysql');
var app = express();  
var msg = {
    "id": ['index', 'msg_show', 'post_form', 'get_form'],
    "css": ['', '', '', ''],
    "li": ['首頁', '留言板', 'POST', 'GET'],
    "href": ['/', 'msg_show','post_form', 'get_form'],
    "content": ''
};

app.use('/css', express.static('css'));
app.use('/fonts', express.static('fonts'));
app.use('/js', express.static('js'));
app.use('/files', express.static('files'));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.set('view engine', 'ejs');  

app.get('/', function(req, res) {
    msg.css = ['active', '', '', ''];
    msg.content= '<h1>Hello world~中文?</h1>';
    res.render('index', msg);
});
app.get('/post_form', function(req, res) {
    msg.css= ['', '', 'active', ''];
    msg.content= '<form action="post_action" method="post">POST:<input type="text" name="something"/><input type="submit" value="Submit"/></form>';
    res.render('index', msg);
});
app.get('/get_form', function(req, res) {
    msg.css= ['', '', '', 'active'];
    msg.content= '<form action="get_action" method="get">GET:<input type="text" name="something"/><input type="submit" value="Submit"/></form>';
    res.render('index', msg);
});
app.get('/msg_show', function(req, res) {
    var sqldata;
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
          msg.content= '';
          for(var value in result){
            msg.content += '<table border="1" width="50%"><tr><td>'+(parseInt(value)+1)+"樓<br />暱稱："+result[value].nickname+"<br />電子郵件："+result[value].email+"</td></tr><tr><td>"+result[value].text+"</td></tr></table><br/>";
          }
          res.render('index', msg);
        });
      });
    msg.css= ['', 'active', '', ''];
    
    
});
app.post('/post_action', function(req, res) {
    var post_msg = req.body.something;
    msg.content = 'POST得到：'+post_msg;
    res.render('index', msg);
});
app.get('/get_action', function(req, res) {
    var get_msg = req.query.something;
    msg.content = 'GET得到：'+get_msg;
    res.render('index', msg);
});
 
var server = app.listen(process.env.PORT, function() { 
    console.log('Listening on port '+process.env.PORT);  
});   