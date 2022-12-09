import express from 'express';
import asyncHandler from 'express-async-handler';
import Doctor from '../Models/DoctorModel.js';

import bcrypt from 'bcryptjs';

const doctorRouter = express.Router();
import doctorData from '../data/doctorData.js';

import { generateToken } from '../utils.js';

import jwt from 'jsonwebtoken';





// import doctor db
doctorRouter.get('/seed', asyncHandler(async (req, res) => {
    await Doctor.remove({});
    const createdDoctor = await Doctor.insertMany(doctorData);
    res.send({ createdDoctor });
}));

doctorRouter.post('/login', asyncHandler(async (req, res) => {
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (doctor) {
        if (bcrypt.compareSync(req.body.password, doctor.password) > 0) {
            res.send({
                _id: doctor._id,
                email: doctor.email,
                password: doctor.password,
                token: generateToken(doctor)
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


export default doctorRouter;