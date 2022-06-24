// Modules
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import logUtils from '../utils/logUtils';
import returnUtils from '../utils/returnUtils';
import { Room, socket } from '../ws/socket';

// Instances
const router = express.Router();

router.all('/', async (req, res) => {
    try {
        let socketController = req.app.locals.socketController;
        let room: any = socketController

        // Error checking
        if (!req.headers.room_id) return res.json(returnUtils.returnHTTPErrMissingHeader()); // Missing headers
        if (!socketController.wsGetRoom(req.headers.room_id)) return res.json(returnUtils.returnHTTPErrRoomDoesNotExist()); // Check if room exists

        res.send(socketController.getRoom[<string>req.headers.room_id]);
    } catch (error) {
        let errID = uuidv4();
        logUtils.ErrorLog(errID, error);
        return res.json(returnUtils.returnHTTPErrUnknown(errID));
    }
})

export = router;