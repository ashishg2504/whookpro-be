const { emailRegex, passwordRegex } = require("../helpers/regex");
const { response } = require("../helpers/response");
const { issueToken } = require("../middlewares/auth");
const User = require("../models/userModel")

module.exports = {
    // Register USER 
    registerUser: async (req, res) => {
        try {
            //Req Body
            const { fullName, email, password } = req.body;

            // Required field check 
            if (!fullName) return response(res, 400, false, "Full Name is required")
            if (!email) return response(res, 400, false, "Email is required")
            if (!password) return response(res, 400, false, "Password is required")

            //Check if email exist
            let userExist = await User.findOne({ email })
            if (userExist) return response(res, 400, false, "User Already Exist")

            // Validate Email 
            if (!emailRegex.test(email)) return response(res, 400, false, "Invalid email format");

            //Validate Password
            if (!passwordRegex.test(password)) return response(res, 400, false, "Invalid password format");

            //Create User
            let newUser = new User({ fullName, email, password })
            newUser = await newUser.save();

            // Remove Password from response 
            newUser = newUser.toObject()
            delete newUser['password']
            delete newUser['__v']

            // generate token 
            let token = issueToken(newUser._id)

            return response(res, 201, true, "User Registered", { ...newUser, token })
        } catch (error) {
            console.log(error)
            return response(res, 500, false, "Internal Server Error!!")
        }
    },
    // Login USER 
    loginUser: async (req, res) => {
        try {
            //Req Body
            const { email, password } = req.body;

            // Required field check 
            if (!email) return response(res, 400, false, "Email is required")
            if (!password) return response(res, 400, false, "Password is required")

            //Check if user exist
            let userExist = await User.findOne({ email });
            if (!userExist) return response(res, 400, false, "User Does Not Exist")

            // Check Password 
            let matchPassword = userExist.matchPassword(password)
            if (!matchPassword) return response(res, 400, false, "Wrong Password")

            // generate token 
            let token = issueToken(userExist._id)

            // Remove Password from response 
            userExist = userExist.toObject()
            delete userExist['password']
            delete userExist['__v']

            return response(res, 200, true, "User Logged In", { ...userExist, token })
        } catch (error) {
            console.log(error)
            return response(res, 500, false, "Internal Server Error!!")
        }
    }
}