const newUser = require("../models/user");
const bcrytp = require("bcrypt");
const jwt = require("jsonwebtoken");
const transport = require("../config/emailConfig")




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
              Token: token,
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

  // Display All Users
  static allUser = async (req, res) => {
    const allUser = await newUser.find();
    res.send(allUser);
  };

  // Change Password ( in case when usr know their password)
  // this feature will be applied when user is logged in

  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({
          status: "faild",
          message: "Password Doesn't match",
        });
      } else {
        const salt = await bcrytp.genSalt(12);
        const newHashPassword = await bcrytp.hash(password, salt);
        await newUser.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });

        res.send({
          status: "success",
          message: "Password Changed Successfully ",
        });
      }
    } else {
      res.send({
        status: "faild",
        message: "All fields are required",
      });
    }
  };

  //
  // Logged User Data///

  static loggedUser = async (req, res) => {
    res.send({
      user: req.user,
    });
  };

  // Reset Passwrod through Email ID

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await newUser.findOne({ email: email });
      if (user) {
  
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign(
          {
            userID: user._id,
          },
          secret,
          {
            expiresIn: "15m",
          }
        );
// console.log(user._id);

        const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
        console.log(link);
        
        // Send Email
let info = await transport.sendMail(
  {
    from:process.env.EMAIL_FROM,
    to:user.email,
    subject:'Cognizant - password reset Link',
    html:`<a href=${link}>Click Here</a> to reset your password`
  }
)

        res.send({
          "status":"success",
          "message":"Password Reset Email Has been sent. Please check your Email",
          "info":info
        })



      } else {
        res.send({
          status: "failed",
          message: "Email Doesn't Exists",
        });
      }
    } else {
      res.send({
        status: "failed",
        message: "Email Fieled is required",
      });
    }
  };


  // update the password of the user after reseting

  static userPasswrodReset = async(req,res)=>
  {
    const{password,password_confirmation}=req.body;
    const {id,token}=req.params;
    const user=await newUser.findById(id);
    const new_secret= user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token,new_secret)
      if(password && password_confirmation)
      {
        if(password!==password_confirmation)
        {
          res.send({
            "status":"failed",
            "message":"Password should be same"
          })
        }
        else
        {
          const salt= await bcrytp.genSalt(12);
          const newHashPassword = await bcrytp.hash(password,salt)
          await newUser.findByIdAndUpdate(user._id,{$set:{password:newHashPassword}}) 
          res.send({
            "status":"failed",
            "message":"Password reset successfully"
          })


        }

      }
      else
      {
        res.send({
          "status":"failed",
          "message":"All fields are required"
        })
      }
    } catch (error) {
      res.send({
        "status":"failed",
        "message":"Invalid Token"
      })
      
    }



  }
}

module.exports = UserController;
