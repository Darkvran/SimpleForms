const User = require('./models/User');
const {validationResult} = require ('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('./config');

const generateAccessToken = (id) => {
    const payload = {
        id,
    }
    return jwt.sign(payload, secret, {expiresIn:"24h"});
}

class authController {
    async registration (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка при регистрации", errors});
            }
            const {email, username, password} = req.body; 
            const isMailReg = await User.findOne({email});
            const isUsernameTaken = await User.findOne({username});

            console.log(isMailReg, isUsernameTaken);

            if (isUsernameTaken){
                return res.status(400).json({message:"Пользователь с данным ником уже зарегестрирован."});
            }
            else if (isMailReg) {
                return res.status(400).json({message:"Пользователь с данной почтой уже зарегестрирован."});
            } 
            const user = new User({email, username, password});
            await user.save();
            return res.json({message:"Пользователь успешно зарегестрирован"});
        } catch(e) {
            console.log(e);
            res.status(400).json({message:'Registration error'});
        }
    }
    async login (req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({message:`Пользователь не найден`});
            }
            const validPassword = password ==user.password;
            if(!validPassword){
                return res.status(400).json({message:`Неверный пароль.`}); 
            }
            const token = generateAccessToken(user._id);
            return res.json({token})
        } catch(e) {
            console.log(e);
            res.status(400).json({message:'Login error'});
        }
    }

    async getUsers (req, res) {
        try {
            res.json("Server work");
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new authController();