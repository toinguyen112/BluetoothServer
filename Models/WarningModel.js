import mongoose from 'mongoose'

const warningSchema = new mongoose.Schema(
    {
        patientID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Patient'
        },
        dateTime: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Warning = mongoose.model('Warning', warningSchema);
export default Warning;

