const express = require("express");
const router = express.Router();
 
const usersController = require("../controllers/users_controller");
const passport = require('passport');

router.get("/profile",passport.checkAuthentication, usersController.profile);

router.get("/sign-up", usersController.signUp);

router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

// router.post('/sign-out', usersController.signOut);
// use pasport as a middleware authentication
router.post("/create-session", passport.authenticate(
    'local',
    {failureRedirect: '/usres/sign-in'},
),usersController.createSession);

router.get('/sign-out', usersController.destryoSession);
module.exports = router;