import mongoose from 'mongoose'

const patientSchema = new mongoose.Schema(
    {
        cccd: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;

