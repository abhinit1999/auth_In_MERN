const newUser = require("../models/user");
const bcrytp = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserController {
  // USer Registration
  static userRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await newUser.findOne({ email: email });
    if (user) {
      res.send({
        status: "failed",
        message: "Email Already Exists",
      });
    } else {
      if (name && email && password) {
        try {
          const salt = await bcrytp.genSalt(12);
          const hashPassword = await bcrytp.hash(password, salt);

          const doc = new newUser({
            name: name,
            email: email,
            password: hashPassword,
          });
          await doc.save();

          //   Generating JWT tokens
          const saved_user = await newUser.findOne({ email: email });
          const token = jwt.sign(
            {
              userID: saved_user._id,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.status(201).send({
            status: "success",
            message: "Registration successfully ",
            token: token,
          });
          console.log(`${doc}`);
        } catch (error) {
          res.send(error);
        }
      } else {
        res.send({
          status: "failed",
          message: "All Fields Are Requirec",
        });
      }
    }
  };

  //   User Ligin
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await newUser.findOne({ email: email });

        if (user != null) {
          const isMatch = await bcrytp.compare(password, user.password);
          if (user.email === email && isMatch) {
            // generating JWT token for Login

            const token = jwt.sign(
              {
                userID: user._id,
              },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: "5d",
              }
            );

            res.send({
              status: "success",
              message: "Login Successfully",
              "Token":token
            });
          } else {
            res.send({
              status: "faild",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.send({
            status: "faild",
            message: "Email doesn't exists",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "All fields are required",
        });
      }
    } catch (error) {
      // console.log(error)
      res.send({
        status: "failed",
        message: "Unable to Login",
      });
    }
  };



  
}

module.exports = UserController;
