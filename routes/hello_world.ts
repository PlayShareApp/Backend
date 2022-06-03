// Modules
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import logUtils from '../utils/logUtils';
import returnUtils from '../utils/returnUtils';

// Instances
const router = express.Router();

router.all('/', async (req, res) => {

    try {
        let socketController = req.app.locals.socketController;
    
        res.send(socketController.Room);
    } catch (error) {
        let errID = uuidv4();
        logUtils.ErrorLog(errID , error);
        return res.json(returnUtils.returnHTTPErrUnknown(errID));
    }
})

export = router;