const User = require('../models/User');

module.exports.userNum = async function(req, res) {
    try{
        let result = await User.find();
        console.log(result.length); //count
        res.status(201).json(result.length);  

     } catch(err){
        console.log(err);
        res.status(418).json({message:"Я - чайник!"});  

     }
}