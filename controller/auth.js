import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';
import User from '../models/User.js';


export const signup = (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;
    //TODO
    /// data validation and sanitization before signup

    bcrypt.hash(password, 10)
        .then((hash) => {
            const user = new User({
                userName: userName,
                email: email,
                password: hash,
            });
            return user.save()
        })
        .then((result) => {
            return res.status(200).json({
                success: true,
                result: result.email,
                message: 'User created successfully'
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: 'Something went wrong User Creation failed'
            });
        });
}
export const login = (req, res, next) => {
    const email = req.body.email;
    let password = req.body.password
    let userFound; // this will hold the  user found with above email
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        userFound = user;
        return bcrypt.compare(password, user.password);
    }
    ).then((result) => {
        // result is boolean which is true is password match 
        if (!result) {
            res.status(200).json({
                success: true,
                message: 'User logged in successfully'
            })
        }
        const token = jwt.sign({
            email: email,
            userId: userFound._id
        }, 'abhishek', { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            token: token,
            message: 'User logged in successfully'
        })
    }
    ).catch((err) => {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong login failed'
        });
    });
}

export const deleteUser = (req, res, next) => {
    const email = req.body.email;
    //TODO delete all the url shortener of this user before deleting the user
    User.findOneAndDelete({ email: email }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
}