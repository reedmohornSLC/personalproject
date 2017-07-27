const express  = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var massive = require('massive');
var passport = require('passport');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config.js');

const app = module.exports = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 60 * 24 * 14) // 14 days
    }
}))
app.use(passport.initialize());
app.use(passport.session());

//database
var conn = massive.connectSync({
  connectionString: "postgres://postgres:zestyness@localhost/personalproject"
})
app.use(express.static(__dirname))//this makes folder available to been seen at port 3000
app.set('db',conn);
var db = app.get('db');

var userCtrl = require("./app/userCtrl.js");

//auth0 functions///////////////////////////////
passport.use(new GoogleStrategy({
   clientID:     config.auth0.clientID,
   clientSecret: config.auth0.clientSecret,
   callbackURL:  '/auth/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    //Find user in database
    db.find_by_id([profile.id], function(err, user) {

      if (!user[0]) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        console.log(profile);
        db.create_google_user([profile.id, profile.name.familyName, profile.name.givenName,accessToken], function(err, user) {
          console.log('USER CREATED', user);
          return done(err, user); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(err, user);
      }
    })
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializing', user);

  //Things you might do here :
   //Serialize just the id, get other information to add to session,
  done(null, user); //PUTS 'USER' ON THE SESSION
});
passport.deserializeUser(function(id, done) {
  db.find_by_id([id], function (err, user) {
        done(err, user);
    });
});

//AUTH endpoints
app.get('/getuserinfo', userCtrl.getUserInfo);

app.get('/logout', function (req, res) {
    req.session.destroy(function (err, data) {
    });
});

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/calendar'] }));

app.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/#/' }), function (req, res) {
    res.redirect('/#/');
});
//ENDPOINTS here
app.post('/api/newuser',function(req,res){//this endpoint wont show on basic route cuz its backend
  console.log(req.body)

  db.create_user([req.body.fname,req.body.lname,req.body.username,req.body.password,req.body.email], function(response){
    res.status(200).send(response);
  })

})

app.post('/api/newphoto',function(req,res){
console.log("running" + req.session.passport.user[0].id);
  db.post_photo([req.body.pUrl, req.session.passport.user[0].id],function(err, response){
    if(!err){
      res.status(200).send(response);
      console.log(response);
    }else{
      res.send(err);
      console.log(err);
    }

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

app.get('/api/photos',function(req,res){
  db.get_photos_byuser([req.session.passport.user[0].id],function(err,response){
      res.status(200).send(response);
  })
})



app.listen(80,console.log("your connected and database is working"));
