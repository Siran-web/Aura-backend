const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    fullName :{
        type :String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    token:{
        type:String
    }
},
    {timestamps: true}
);

const User = mongoose.model('User',userSchema);
module.exports = User;