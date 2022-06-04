import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import SocketController from '../ws/socket';
import logUtils from '../utils/logUtils';

dotenv.config()

const app = express();
app.use(cors());

app.locals.socketController = SocketController;

// Index
app.use('/', require('../routes/hello_world')) // im gonna kill myself
app.use('/a/create_r', require('../routes/create_room')) // Implemented
app.use('/a/join_r', require('../routes/join_room')) // Implemented
app.use('/a/change_v', require('../routes/change_video')) // Implemented but TODO
app.use('/a/change_s', require('../routes/change_state')) // Implemented
app.use('/a/change_t', require('../routes/change_time')) // Implemented
app.use('/a/change_u', require('../routes/change_user')) // TODO (WS works)

app.listen(process.env.HTTP_PORT, () => {
    logUtils.logCustom("HTTP", "Server Started on Port " + process.env.HTTP_PORT);
})