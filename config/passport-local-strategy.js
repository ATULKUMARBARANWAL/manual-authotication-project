const passport=require('passport');
const LocalStratgey=require('passport-local').Strategy;
const User=require('../models/user');

//authentication using passport
passport.use(new LocalStratgey({
    usernameField:'email',
    passReqToCallback:true  //this for the adding more flashes
},
function(req,email,password,done)  //done is function
{
//find user and establish the identity
User.findOne({email:email}, function(err,user)
{
    if(err)
    {
        req.flash('error',err);//this for the adding more flashes
    return done(err);
    }
    if(!user||user.password!=password)
    {
        req.flash('error','Invalid Username/Password');//this for the adding more flashes
      return done(null,false);//error is null but user is not there
    }
    return done(null,user);
})
}
))

//serializing  the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done)
{
    done(null,user.id);
})

//de-serializing the user from the key in the cookie
passport.deserializeUser(function(id,done)
{
User.findById(id,function(err,user)
{
if(err)
{
    console.log('error in finding in user-->Passport');
    return done(err);
}
return done(null,user);
})
})

//check if user is authenticated
passport.checkAuthentication=function(req,res,next)
{
    //if the user is signed-in , then passed on the request to the next function(controller's action)
    if(req.isAuthenticated())
    {
        return next();
    }
    // if the user is not signed-in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        //req.users contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;