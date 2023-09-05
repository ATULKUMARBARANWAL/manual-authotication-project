const express=require('express');
const router=express.Router();
const Passport=require('passport');

const commentController=require('../controllers/comment_controller');
router.post('/create',Passport.checkAuthentication,commentController.create)
router.get('/destroy/:id',Passport.checkAuthentication,commentController.destroy);
module.exports=router;
