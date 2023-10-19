const express = require('express');
const Router = express.Router();
const {userValidator} = require('../Helpers/ExpressValidator');

const {Register,Login,Profile} = require('../Controllers/User')

const {TokenCheck}  = require('../Middlewares/TokenCheck')


Router.post('/register',userValidator,Register)
Router.post('/login',Login)
Router.get('/profile',TokenCheck,Profile)


module.exports  = Router