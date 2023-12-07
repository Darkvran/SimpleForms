const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate){
        const passwordResult = req.body.password == candidate.password;
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});
            res.status(200).json({
                token: `Bearer p${token}`
            });

        } else {
            res.status(401).json({message:"Пароли не совпадают. Попробуйте снова."});
        }

    } else {
        res.status(404).json({message:"Такого пользователя не существует."})
    }
}

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({email:req.body.email});
    if (candidate){
        res.status(409).json({
            message:"Такой email уже занят."
        });
    } else {
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })

        try {
            await user.save();
            res.status(201).json(user);  
        }
        catch(e){
            console.log(e);
        }
    }
}