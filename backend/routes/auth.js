const express=require('express');
const router=express.Router();
const passport=require('passport');
const {check,expressValidator}=require('express-validator');
const {isLoggedIn}=require('../middleware/middleware');
const {signin,signup,signout,showSignupForm,showSigninForm}=require('../controller/auth');

router.get('/signup',showSignupForm);
router.post('/signup',[
    check('username','Username must be 5 character long').isLength({min:5}),
    check('email','Email should be valid').isEmail(),
    check('password','Password must be 8 character long').isLength({min:8})
],signup);
router.get("/signin",showSigninForm);
router.post("/signin",passport.authenticate('local',{failureRedirect:'/signin'}),signin);
router.get('/signout',signout);

module.exports=router;