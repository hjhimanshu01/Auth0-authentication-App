const express=require('express');
const app = express();
const path=require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
// app.use(express.static(path.join(__dirname,'index')))
app.set('views',path.join(__dirname,'views'));
app.set("view engine","pug");
const strategy = new Auth0Strategy(
    {
        domain : '<domain_name>',
        clientID : '<client_id>',
        clientSecret : '<client_secret>',
        callbackURL : 'http://localhost:3000/callback'
    },
    function(accessToken,refreshToken,extraParam,profile,done){
        console.log(profile)
        return done(null,profile)
    }
)
//tell passport to use auth0
passport.use(strategy)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})

app.use(
    session({
        secret : 'some_secret_key',
        resave : true ,
        saveUninitialized : true
    })
)
//tell express to use passport
app.use(passport.initialize())
//so that a user has to not log in everytime
app.use(passport.session())

app.use(function(req,res,next){
    res.locals.loggedIn = false ;
    
    if( req.session.passport && req.session.passport.user != 'undefined'){
        console.log(req.session.passport.user);
        res.locals.loggedIn = true ;
    }
    next()
})
app.get('/',(req,res)=>{
    
    res.render('index');
})

app.get('/login',passport.authenticate('auth0',{
    clientID : '<client_id>',
    domain : '<domain_name>',
    redirectUri : 'http://localhost:3000/callback',
    responseType : 'code',
    audience : 'https://<domain_name>/api/v2/',
    scope : 'openid profile',
    function(req,res) {
        res.redirect('/user');
    }
}))
 
app.get('/logout',function(req,res){
    res.locals.loggedIn=false;
    req.logout();
    req.session.destroy(function(){console.log('logged out')})
    res.render('index');
    
   
    
})
app.get('/callback',
passport.authenticate('auth0',{
    failureRedirect : '/failure'
}),
function(req,res){
    res.redirect('/user');
});

app.get('/user',function(req,res,next){
    res.render('user',{
        user : req.user
    })
})

app.get('/failure',function(req,res){
    res.render('failure');  
})
app.listen(3000,function(){
    console.log('listening on port 3000');
})