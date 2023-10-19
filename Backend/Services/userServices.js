const CONSTANTS = require('../Config/Constants')
const {HashPassword,VerifyPassword} = require('../Helpers/Hashing')
const jwt = require('jsonwebtoken')

class UserService{
    constructor(userRepo){
        this.userRepo = userRepo;

    }
    async Register(req){
        const response = {};
        const { userName, email, password, companyName } = req.body;
    
        const newUser = {
            userName,
            email,
            password: await HashPassword(password),
            companyName
        };
    
        newUser.createdAt = new Date(); 
    
        const user = await this.userRepo.Register(newUser);
    
        if(!user){
            response.message = CONSTANTS.SERVER_ERROR_MESSAGE;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    
        response.message = CONSTANTS.USER_CREATED;
        response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
        response.data = user;
        return response;
    }
    

    async Login(req){
        const response = {}
        const {email, password} = req.body
        const user  = await this.userRepo.Login(email)
        console.log('this is ',user)
        if(!user){
            response.message = CONSTANTS.USER_NOT_FOUND
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE
            return response
        }
        const passwordMatch = await VerifyPassword(password,user.password)
        if(!passwordMatch){
            response.message = CONSTANTS.PASSWORD_NOT_FOUND
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE
            return response
        }
        const token = jwt.sign({userid:user._id,username:user.userName},'secretkey')
        response.message = CONSTANTS.USER_LOGIN_OK
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE
        response.data = {id:user._id,userName:user.userName}
        response.token = token
        await user.updateLastLogin();
        return response
    }

    async Profile(req){
        const response = {};
        const { userName, userid } = req.body;
        response.status  = CONSTANTS.SERVER_OK_HTTP_CODE;
        response.data = {
            userName,
            userid
        };
    
        return response;
    }
    



}

module.exports = {UserService}