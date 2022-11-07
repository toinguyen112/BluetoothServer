import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import patientRouter from './Routes/patientRouter.js';
import adminRouter from "./Routes/adminRouter.js";
import warningRouter from "./Routes/warningRouter.js";
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

dotenv.config();
connectDatabase();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app)
// const io = new Server(server);
const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('user connected', socket.id);
    socket.on('warning', data => {
        console.log(data);
        io.emit('send-web', data);
    })
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
});



app.get('/', (req, res) => {
    console.log('da vao server');
    res.send('API is running hihi');
});

app.use('/api/patients', patientRouter);
app.use('/api/admin', adminRouter);
app.use('/api/warnings', warningRouter);

const PORT = process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT, () => console.log(`Server run in port ${PORT}`));
server.listen(5001, () => {
    console.log("Listening socket on port 5001");
})