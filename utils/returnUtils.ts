import { v4 as uuidv4 } from 'uuid';

export default {
    returnWS: (ID: number, METHOD_NAME: string, PARAMS: Object): string => {
        return JSON.stringify({
            "ID": ID,
            "METHOD_NAME": METHOD_NAME,
            "PARAMS": PARAMS
        })
    },

    returnHTTPErrMissingHeader: () => {
        return {
            status: 400,
            message: "Missing Header"
        }
    },

    returnHTTPErrUserAlreadyInRoom: () => {
        return {
            status: 400,
            message: "User Already In Room"
        }
    },

    returnHTTPErrRoomDoesNotExist: () => {
        return {
            status: 400,
            message: "Room Does Not Exist"
        }
    },

    returnHTTPErrRoomNotFound: () => {
        return {
            status: 404,
            message: "Room Not Found"
        }
    },

    returnHTTPErrUserNotInRoom: () => {
        return {
            status: 400,
            message: "User Not In Room"
        }
    },

    returnHTTPSuc: () => {
        return {
            status: 200,
            message: "Success"
        }
    },

    returnHTTPErrUnknown: (errID: String) => {
        return {
            status: 500,
            message: "Unknown Error",
            errID: errID
        }
    },

    returnHTTPErrUserNotGenerated: () => {
        return {
            status: 400,
            message: "User Not Generated"
        }
    },
}