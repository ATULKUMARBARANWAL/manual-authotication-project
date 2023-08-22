const express=require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const app=express();
const db=require('./config/mongoose');
const expressLayouts=require('express-ejs-layouts');
//used for session cookie
const session=require('express-session');
const passport =require('passport');
const passportLocal=require('./config/passport-local-strategy');
const { connect } = require('http2');
const MongoStore=require('connect-mongo');
app.use(expressLayouts);
// const sassMiddleware=require('node-sass-middleware');
// app.use(sassMiddleware({
//     src:'assets/scss',
//     dest:'assets/scss',
//     debug:true,
//     outputStyle:'expanded',
//     prefix:'/css'
// }))
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setup the view engain
app.set('view engine', 'ejs');
app.set('views', './views');
//mongo store is used to store the session cookie in the db 
app.use(session({
    name:'manual authentication project',
    //todo change the secret before deployment in production mode
    secret:'blaSomthing',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
   store:new MongoStore({
   mongoUrl:'mongodb://localhost/test-app',
   autoRemove:'disabled',
   },
   function(err)
   {
    console.log(err||'connect-mongodb setup is ok')
   }
   )

}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//use express routes
app.use('/',require('./routes'));




app.listen(port,function(err){
    if(err){
        console.log(`this is a error ${err}`);
        return;
    }
    console.log(`server is start on port ${port}`);
})