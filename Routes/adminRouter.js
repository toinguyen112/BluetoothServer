import express from 'express';
import asyncHandler from 'express-async-handler';
import Admin from '../Models/AdminModel.js';

import bcrypt from 'bcryptjs';

const adminRouter = express.Router();
import adminData from '../data/adminData.js';

import { generateToken } from '../utils.js';

import jwt from 'jsonwebtoken';





// import admin db
adminRouter.get('/seed', asyncHandler(async (req, res) => {
    await Admin.remove({});
    const createdAdmin = await Admin.insertMany(adminData);
    res.send({ createdAdmin });
}));

adminRouter.post('/login', asyncHandler(async (req, res) => {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
        if (bcrypt.compareSync(req.body.password, admin.password) > 0) {
            res.send({
                _id: admin._id,
                email: admin.email,
                password: admin.password,
                token: generateToken(admin)
            });
            return
        }
    }

    res.status(401).send({ message: 'Email hoặc mật khẩu không đúng' })
}));


export const authenToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    // console.log(authorizationHeader);
    const token = authorizationHeader.split(' ')[1];

    if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        //console.log(err, data);
        if (err) return res.sendStatus(403);
        next();
    })
}


export default adminRouter;