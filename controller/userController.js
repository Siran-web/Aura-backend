const userModel = require('../model/userModel');

exports.getUsers = async (req,res) => {
    try{
        const users = await userModel.find({});
        res.json(users);
    } catch (error){
        console.log("Error : ",error);
    }
};