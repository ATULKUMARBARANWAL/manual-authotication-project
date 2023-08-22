const express=require('express');
const router=express.Router(); 

const homeContoroller=require('../controllers/home_controller');

router.get('/',homeContoroller.home);
router.use('/users',require('./user'))
router.use('/posts',require('./posts'));

console.log('router is load');

module.exports=router;