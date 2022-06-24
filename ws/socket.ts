import WebSocket, { WebSocketServer } from 'ws';
import returnUtils from '../utils/returnUtils';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
import logUtils from '../utils/logUtils';
dotenv.config()

const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT) });

// export interface
export interface socket {
    wsJoinRoom: void
    getRoom: Room
    partOfConnection: void
    wsGetRoom: Object
    wsCreateRoom: Room
    wsChangeVideo: void
    wsChangeState: void
    wsChangeTime: void
    wsUserChangedName: void

} 

export interface Room {
    roomID: String
    user: Array<String>
    params: RoomParams
}

interface RoomParams {
    current_video: string
    time: Number
    state: Boolean
}

var connections: any = [];
var Room: any = {};

wss.on('connection', function connection(ws: any) {
    // Keep track of Session
    ws.id = uuidv4();

    connections[ws.id] = ws;

    // Log and send Sessions
    ws.send(returnUtils.returnWS(1010, "HELLO_WORLD", { "id": ws.id }));

    // Detect if Client Disconnectes and remove ID from Array
    ws.on('close', () => {
        try {
            logUtils.logCustom("WS", "Closed Session with Session ID " + ws.id);
            
            // Remove ws.id from Room
            Object.keys(Room).forEach(key => {
                Room[key].users = (Room[key].users).filter((e: any) => e !== ws.id)
            });

            delete connections[ws.id];
        } catch (error) {
            console.log(error);
            
        }
        delete connections[ws.id];
    })
});


export default {
    /**
     * @name wsJoinRoom
     * @description Adds a User to a Room
     * @param roomID RoomID
     * @param userID userID
     */
    wsJoinRoom(roomID: string, userID: string): void {
        Room[roomID].users.push(userID);

        // Send Response to User that they have joined the Room
        connections[userID].send(returnUtils.returnWS(1003, "JOIN_ROOM_SUCCESS", { "ROOM_ID": roomID, "CURRENT_VIDEO": Room[roomID].params.current_video, "TIME": Room[roomID].params.time, "STATE": Room[roomID].params.state }));

        // Inform all Users in the Room that a new User has joined
        let users: Array<any> = Room[roomID].users;
        users.forEach(user => {
            connections[user].send(returnUtils.returnWS(1002, "JOIN_ROOM", { "NEW_USER": userID }));
        })
    },

    get getRoom() {
        return Room;
    },

    /**
     * @name partOfConnection
     * @description Used to check if a userID is part of the Connections Array. If the User isn't part of the Connections Array they may or may not have been created through a manual Request.
     * @param userID
     * @returns {Boolean}
     */
    partOfConnection(userID: string): boolean {
        return Object.keys(connections).includes(userID);
    },

    /**
     * @name wsGetRoom
     * @description Gets a Room
     * @param RoomID 
     * @returns {Object} Room
     * @deprecated I have no Idea if this is needed.
     */
    wsGetRoom(RoomID: string): Object {
        return Room[RoomID];
    },

    /**
     * @name wsCreateRoom
     * @description Creates a Room
     * @returns Object with RoomID and UserID
     */
    wsCreateRoom(): Object {
        let id = uuidv4();
        Room[id] = {
            roomID: id,
            users: [],
            params: {
                "current_video": "",
                "time": 0,
                "state": false,
            }
        }

        return Room[id];
    },

    /**
     * @name wsChangeVideo
     * @description Sends a message to all users in a Room to change the Video
     * @param room_id 
     * @param video_id 
     */
     wsChangeVideo(room_id: string, change_user:string, video_id: string): void {
        let users: Array<any> = Room[room_id].users

        Room[room_id].params.current_video = video_id;

        users.forEach(user => {
            connections[user].send(returnUtils.returnWS(-1, "CHANGE_VIDEO", { "VIDEO_ID": video_id, "CHANGE_BY": change_user }));
        })
    },

    /**
     * @name wsChangeState
     * @description Sends a message to all users in a Room to change the State (Play / Pause)
     * @param room_id 
     * @param paused Wether or not the Video is paused
     */
    wsChangeState(room_id: string, change_user:string,  paused: Boolean): void {

        Room[room_id].params.state = paused;

        // Create Response
        let response: string;
        switch (paused) {
            case true:
                response = returnUtils.returnWS(2, "PAUSE", {"CHANGE_BY": change_user});
                break;
            case false:
                response = returnUtils.returnWS(1, "PLAY", {"CHANGE_BY": change_user});
                break
        }

        // Inform all Users in the Room to Change State
        let users: Array<any> = Room[room_id].users;
        users.forEach(user => {
            connections[user].send(response);
        })
    },

    /**
     * @name wsChangeTime
     * @description Sends a message to all users in a Room to change the Time
     * @param room_id 
     * @param time 
     */
    wsChangeTime(room_id: string, change_user:string, time: Number): void {
        let users: Array<any> = Room[room_id].users

        Room[room_id].params.time = time;

        // Create Response
        let response: string;
        users.forEach(user => {
            connections[user].send(returnUtils.returnWS(3, "CHANGE_TIME", { "TIME": time, "CHANGE_BY": change_user }));
        })
    },

    wsUserChangedName(room_id: string, change_user: string, new_name: string): void{
        let users: Array<any> = Room[room_id].users

        // Create Response
        let response: string;
        users.forEach(user => {
            connections[user].send(returnUtils.returnWS(3, "CHANGE_TIME", { "USER": change_user, "NEW_USER_NAME": new_name }));
        })
    }
}