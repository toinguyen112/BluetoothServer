import mongoose from 'mongoose';

const DoctorModel = new mongoose.Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Doctor = mongoose.model("Doctor", DoctorModel);
export default Doctor;

