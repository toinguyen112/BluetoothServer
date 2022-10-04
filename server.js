import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import patientRouter from './Routes/patientRouter.js';
import adminRouter from "./Routes/adminRouter.js";
import warningRouter from "./Routes/warningRouter.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log('da vao server');
    res.send('API is running hihi');
});

app.use('/api/patients', patientRouter);
app.use('/api/admin', adminRouter);
app.use('/api/warnings', warningRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server run in port ${PORT}`));