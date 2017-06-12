const express  = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');
var massive = require('massive');
const app = express();
app.use(bodyParser.json());
var conn = massive.connectSync({
  connectionString: "postgres://postgres:zestyness@localhost/personalproject"
})
app.use(express.static(__dirname))//this makes folder available to been seen at port 3000
app.set('db',conn);
var db = app.get('db');

//endpoints here
app.post('/api/newuser',function(req,res){//this endpoint wont show on basic route cuz its backend
  console.log(req.body)

  db.create_user([req.body.fname,req.body.lname,req.body.username,req.body.password,req.body.email], function(response){
    res.status(200).send(response);
  })

})

//db.get_map_id([req.scroller])
app.get('/api/maps/:map',function(req,res){
  db.get_map([req.params.map],function(err, response){
    if(err){
      console.log("err",err);
      res.send(err)
    }else{
        console.log(response);
        res.status(200).send(response);
    }

  })
})



app.listen(3000,console.log("your connected and database is working"));
