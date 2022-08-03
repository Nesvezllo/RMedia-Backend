import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserSchema from "../models/User.js";

export const register = async (req, res) => {
  try {
 
     const salt = await bcrypt.genSalt(10);
     const passwordHash = await bcrypt.hash(req.body.password, salt);
 
     const doc = new UserSchema({
       email: req.body.email,
       password: passwordHash,
       fullName: req.body.fullName,
       avatarURL: req.body.avatarURL,
     });
 
     const user = await doc.save();
 
     const token = jwt.sign({
       _id: user._id,
     }, 
     "secret123",
     {
       expiresIn: '30d',
     }
     );
 
     const {password, ...userData} = user._doc; 
 
     res.json({
       ...userData,
       token,
     })
 
  } catch (error) {
   console.log(error);
    res.status(500).json({
       message: "Не удалось зарегистрироваться",
    })
  }
 };
 
 export const login = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email })
    if(!user) {
      return res.status(404).json({
        message: "Неверный логин или пароль",
      });
    }
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.password)
  
    if(!isValidPass) {
      return res.status(404).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign({
      _id: user._id,
    }, 
    'secret123',
    {
      expiresIn: '30d',
    },
    );

    const {password, ...userData} = user._doc; 

    res.json({
      ...userData,
      token,
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.userId);
    if(!user) {
      return res.status(404).json({
        message: "Такого пользователя не существует",
      })
    }

    const {password, ...userData} = user._doc; 

    res.json({
      ...userData,
    })

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить данные",
    })
  }
};
