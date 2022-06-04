import WebSocket, { WebSocketServer } from 'ws';
import returnUtils from '../utils/returnUtils';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
import logUtils from '../utils/logUtils';
dotenv.config()


const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT) });

var connections: any = [];

wss.on('connection', function connection(ws: any) {
    // Keep track of Session
    ws.id = uuidv4();

    connections[ws.id] = ws;

    // Log and send Sessions
    ws.send(returnUtils.returnWS(1010, "HELLO_WORLD", { "id": ws.id }));

    // Detect if Client Disconnectes and remove ID from Array
    ws.on('close', () => {
        console.log("Closed Session with Session ID " + ws.id);
        logUtils.logCustom("WS", "Closed Session with Session ID " + ws.id);
        delete connections[ws.id];
    })
});

export interface SocketControllerInterface {
    createSocket(): void;
    wsJoinRoom(roomID: string, userID: string): void;
    wsGetRoom(roomID: string): any;
    wsCreateRoom(roomID: string, userID: string): void;
    wsChangeVideo(roomID: string, userID: string, videoID: string): void;
}

export default class SocketController {

    private Room: any = {};
    public Connections: any = [];

    /**
     * @name createSocket
     * @description Creates a websocket server
     * @returns {void}
     * @memberof SocketController
     * @public
     * 
     * When User enters a Room, the User will connect to the Socket Server and receive a unique UserID.
     * User will then call a HTTP Router to enter a Room. If the Room does not exist, the Router will create a new Room.
     * If the Room does exist, the User will get assigned to the Room.
     */


    /**
     * @name wsJoinRoom
     * @description Adds a User to a Room
     * @param roomID RoomID
     * @param userID userID
     */
    public wsJoinRoom(roomID: string, userID: string): void {
        this.Room[roomID].users.push(userID);

        // Send Response to User that they have joined the Room
        connections[userID].send(returnUtils.returnWS(1003, "JOIN_ROOM_SUCCESS", { "ROOM_ID": roomID }));

        // Inform all Users in the Room that a new User has joined
        let users: Array<any> = this.Room[roomID].users;
        users.forEach(user => {
            connections[user].send(returnUtils.returnWS(1002, "JOIN_ROOM", { "NEW_USER": userID }));
        })
    }

    /**
     * @name partOfConnection
     * @description Used to check if a userID is part of the Connections Array. If the User isn't part of the Connections Array they may or may not have been created through a manual Request.
     * @param userID
     * @returns {Boolean}
     */
    public partOfConnection(userID: string): boolean {
        return Object.keys(connections).includes(userID);
    }

    /**
     * @name wsGetRoom
     * @description Gets a Room
     * @param RoomID 
     * @returns {Object} Room
     * @deprecated I have no Idea if this is needed.
     */
    public wsGetRoom(RoomID: string): Object {
        return this.Room[RoomID];
    }

    /**
     * @name wsCreateRoom
     * @description Creates a Room
     * @returns Object with RoomID and UserID
     */
    public wsCreateRoom(): Object {
        let id = uuidv4();
        this.Room[id] = {
            roomID: id,
            users: [],
        }

        return this.Room[id];
    }

    /**
     * @name wsChangeVideo
     * @description Sends a message to all users in a Room to change the Video
     * @param room_id 
     * @param video_id 
     */
    public wsChangeVideo(room_id: string, change_user:string, video_id: string): void {
        let users: Array<any> = this.Room[room_id].users

        users.forEach(user => {
            connections[user].send(returnUtils.returnWS(-1, "CHANGE_VIDEO", { "VIDEO_ID": video_id, "CHANGE_BY": change_user }));
        })
    }

    /**
     * @name wsChangeState
     * @description Sends a message to all users in a Room to change the State (Play / Pause)
     * @param room_id 
     * @param paused Wether or not the Video is paused
     */
    public wsChangeState(room_id: string, change_user:string,  paused: Boolean) {
        let users: Array<any> = this.Room[room_id].users

        // Create Response
        let response: string;
        switch (paused) {
            case true:
                console.log("Paused");
                response = returnUtils.returnWS(2, "PAUSE", {"CHANGE_BY": change_user});
                break;
            case false:
                console.log("Play");
                response = returnUtils.returnWS(1, "PLAY", {"CHANGE_BY": change_user});
                break
        }

        // Send Response
        users.forEach(user => {
            connections[user].send(response);
        })
    }

    /**
     * @name wsChangeTime
     * @description Sends a message to all users in a Room to change the Time
     * @param room_id 
     * @param time 
     */
    public wsChangeTime(room_id: string, change_user:string, time: Number) {
        let users: Array<any> = this.Room[room_id].users

        // Create Response
        let response: string;
        users.forEach(user => {
            connections[user].send(returnUtils.returnWS(3, "CHANGE_TIME", { "TIME": time, "CHANGE_BY": change_user }));
        })
    }

    public wsUserChangedName(room_id: string, change_user: string, new_name: string){
        let users: Array<any> = this.Room[room_id].users

        // Create Response
        let response: string;
        users.forEach(user => {
            connections[user].send(returnUtils.returnWS(3, "CHANGE_TIME", { "USER": change_user, "NEW_USER_NAME": new_name }));
        })
    }
}