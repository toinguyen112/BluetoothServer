import express, { response } from 'express';
import asyncHandler from 'express-async-handler';
import Patient from '../Models/PatientModel.js';
import patientData from '../data/patientData.js';
import { authenToken } from './adminRouter.js';
import jwt from 'jsonwebtoken';


import bcrypt from 'bcryptjs';

const patientRouter = express.Router();


patientRouter.get('/seed', asyncHandler(async (req, res) => {
    await Patient.remove({});   //remove all
    const createdPatient = await Patient.insertMany(patientData);
    res.send({ createdPatient });
}));


patientRouter.get('/', authenToken, asyncHandler(async (req, res) => {
    // console.log('');
    const patients = await Patient.find({});
    res.send(patients);
}));

patientRouter.get('/m', asyncHandler(async (req, res) => {
    console.log('api has been called');
}));

patientRouter.post('/signin', asyncHandler(async (req, res) => {
    const patient = await Patient.findOne({ cccd: req.body.cccd });
    console.log(patient);
    if (patient) {
        if (bcrypt.compareSync(req.body.password, patient.password)) {
            res.send({
                _id: patient._id,
                cccd: patient.cccd,
                name: patient.name,
                phone: patient.phone,
                address: patient.address
            });
            return
        }
    }
    res.status(401).send({ message: 'Căn cước hoặc mật khẩu không đúng !' });
}));


patientRouter.post('/register', asyncHandler(async (req, res) => {
    const patient = await Patient.findOne({ cccd: req.body.cccd });
    if (!patient) {
        const patient = new Patient({
            cccd: req.body.cccd,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        const createdPatient = await patient.save();
        res.send(createdPatient);
        return
    }
    res.status(401).send({ message: 'Số căn cước đã được đăng ký !' })
}));



patientRouter.get('/:id', asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
        return res.send(patient);
    }
    else {
        res.status(404).send({ message: 'Không tìm thấy bệnh nhân' });
    }
}));










export default patientRouter;
