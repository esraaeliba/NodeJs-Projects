const UsersModel = require("../Models/UsersModel");
const bcrypt = require("bcrypt");

let Register = async (req, res)=>{
    //1) if Email??? ==> model.findOne({email: req.body.email}) 
    let foundUser = await UsersModel.findOne({email: req.body.email.toLowerCase()});
    //2) exist ==> "Already exist, please login"
    if(foundUser) return res.send("User already exists, please login");
    //3) not exist ==> add to db
    let salt = await bcrypt.genSalt(10);
    let HashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = HashedPassword;
    req.body.email = req.body.email.toLowerCase();
        //3.1) create instance from model
        let newUser = new UsersModel(req.body);
        //3.2) .save()
        await newUser.save();
    //4) return res
    return res.json({message:"User registered successfully", data:newUser});    
};


let Login = async (req, res)=>{
    //1) find email
    let foundUser = await UsersModel.findOne({email: req.body.email.toLowerCase()});
    //1) if email not exist ==> "Invalid Email / Password"
    if(!foundUser) return res.send("Invalid Email or Password");
    //2) if email exist ==> verify pass  
    let passTrue = await bcrypt.compare(req.body.password, foundUser.password);
    //3) pass [false] ==> "Invalid Email / Password"
    if(!passTrue) return res.send("Invalid Email or Password");
    //4) pass [true] ==> res.send("Logged-In seccessfully")
    return res.send("Loggen-In seccessfully");
}


module.exports = {
                Register,
                Login
            }