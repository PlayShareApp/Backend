// Modules
import express from 'express';
import returnUtils from '../utils/returnUtils';
import logUtils from '../utils/logUtils';
import { v4 as uuidv4 } from 'uuid';

// Instances
const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
    let socketController = req.app.locals.socketController;

    // Error checking
    if(!req.headers.room_id || !req.headers.user_id) return res.json(returnUtils.returnHTTPErrMissingHeader()); // Missing headers
    if(!socketController.wsGetRoom(req.headers.room_id)) return res.json(returnUtils.returnHTTPErrRoomDoesNotExist()); // Check if room exists
    if(socketController.wsGetRoom(req.headers.room_id).users.includes(req.headers.user_id)) return res.json(returnUtils.returnHTTPErrUserAlreadyInRoom()); // Check if user is already in room

    try {
        console.log("User joined a room.");
        console.log(req.headers.user_id);
        
        // Check if userid is part of socketController.connections
        if(!socketController.partOfConnection(req.headers.user_id)) return res.json(returnUtils.returnHTTPErrUserNotGenerated());

        socketController.wsJoinRoom(req.headers.room_id, req.headers.user_id);

        return res.json(returnUtils.returnHTTPSuc());
    } catch (error) {
        let errID = uuidv4();
        logUtils.ErrorLog(errID , error);
        return res.json(returnUtils.returnHTTPErrUnknown(errID));
    }
})

export = router;