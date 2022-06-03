// Modules
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import logUtils from '../utils/logUtils';
import returnUtils from '../utils/returnUtils';

// Instances
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let socketController = req.app.locals.socketController;
        let room: Object = socketController.wsCreateRoom();

        res.json(room)
    } catch (error) {
        let errID = uuidv4();
        logUtils.ErrorLog(errID , error);
        return res.json(returnUtils.returnHTTPErrUnknown(errID));
    }
})

export = router;
