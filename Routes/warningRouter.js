import express from 'express';
import asyncHandler from 'express-async-handler';
import Warning from '../Models/WarningModel.js';
import warningData from '../data/warningData.js';
import Patient from '../Models/PatientModel.js';
import { authenToken } from './adminRouter.js';

import bcrypt from 'bcryptjs';

const warningRouter = express.Router();

warningRouter.get('/seed', asyncHandler(async (req, res) => {
    await Warning.remove({});
    const createdWarning = await Warning.insertMany(warningData);
    res.send(createdWarning);
}));

warningRouter.get('/', authenToken, asyncHandler(async (req, res) => {
    const warnings = await Warning.find({});
    res.send(warnings);
}));


warningRouter.get('/:id', asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
        return res.send(patient);
    }
    res.status(404).send({ message: 'Không tìm thấy bệnh nhân' });
}))

warningRouter.delete('/delete/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Warning.deleteOne({ _id: id });
    return;
}));

warningRouter.post('/create', asyncHandler(async (req, res) => {
    console.log(req.body.patientID);
    const warning = new Warning({
        patientID: req.body.patientID,
        dateTime: new Date()
    });
    const createdWarning = await warning.save();
    return res.send(createdWarning);
}))




export default warningRouter;