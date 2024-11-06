const User = require('../modle/userModle');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { fullName, userName, email, password } = req.body;
    try {
        if (!fullName || !userName || !email || !password)
            return res.status(400).json({ message: "Fill all detail" });
        
        const user = await User.findOne({email});
        if(user)
            return res.status(400).json({message:"User Already register"});
        const hashPassword = await bcrypt.hash(password,10);
        const newUser =new User({fullName,userName,email,password: hashPassword});
        newUser.save();
        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY);
        res.status(200).json({message:"Succes",newUser,token: token});
    }
    catch (error) {
        console.log("error in registration");
        return res.status(400).json({ message: "Internal Server error in registration" });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if (!user)
            return res.status(400).json({ message: "Invalid credential" });
        const isSame = await bcrypt.compare(password, user.password);
        if (!isSame)
            return res.status(400).json({ message: "Invalid Password" });
        const token = jwt.sign({userId : user._id},process.env.JWT_SECRET_KEY);
        return res.status(200).json({ message: "Succes login",token:token });

    }
    catch (error) {
        console.log("error in login user");
        res.status(404).json({ message: "User Not Found" });
    }
}
