const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller');
const passport=require('passport');
router.get('/profile/:id', passport.checkAuthentication,userController.profile);
router.post('/update/:id', passport.checkAuthentication,userController.update);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
// router.post('/create-session',userContoroller.createSession);
console.log("user's router is working");
//use passport as middleware to auhenticate
router.post('/create-session',passport.authenticate('local',{
    failureRedirect:'/users/sign-in'
}),
userController.createSession);
router.get('/sign-out',userController.destroySession);
module.exports=router;