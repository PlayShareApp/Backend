// Modules
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import logUtils from '../utils/logUtils';
import returnUtils from '../utils/returnUtils';

// Instances
const router = express.Router();

router.post('/', async (req, res) => {
    let socketController = req.app.locals.socketController;
    if(!req.headers.room_id || !req.headers.user_id || !req.headers.time) return res.json(returnUtils.returnHTTPErrMissingHeader()); // Missing headers
    if(!socketController.wsGetRoom(req.headers.room_id)) return res.json(returnUtils.returnHTTPErrRoomDoesNotExist()); // Check if room exists
    if(!socketController.wsGetRoom(req.headers.room_id).users.includes(req.headers.user_id)) return res.json(returnUtils.returnHTTPErrUserNotInRoom()); // Check if user is in room

    try {
        socketController.wsChangeTime(req.headers.room_id, req.headers.time);
        return res.json(returnUtils.returnHTTPSuc());
        
    } catch (error) {
        let errID = uuidv4();
        logUtils.ErrorLog(errID , error);
        return res.json(returnUtils.returnHTTPErrUnknown(errID));
    }
})

export = router;