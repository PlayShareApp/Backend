# Playshare Developer Documentation
## Index
* Routes
* Socket Responses

# Routes
Soon

# Socket Responses
Socket will respond with a String in JSON Object. Incomming String should therefore be parsed using the [parse method](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) on the JSON Object.

### Example
```js
[...]

exampleSocket.onmessage = (event) => {
    let data = JSON.parse(event.data);
    console.table(data);
}
```

| ID | METHOD_NAME | PARAMS |
| -- | ----------- | ---------------------- |
| -1 | VIDEO_CHANGE | { CHANGE_USER } |
| 0 | VIDEO_END | { CHANGE_USER } |
| 1 | PLAY | { CHANGE_USER } |
| 2 | PAUSE | { CHANGE_USER } |
| 3 | BUFFERING | { TIME, CHANGE_USER } |
| 1010 | HELLO_WORLD | { id } |
| 1002 | JOIN_ROOM | { NEW_USER } |
| 1003 | JOIN_ROOM_SUCCESS | { ROOM_ID } |
| 1004 | CHANGE_USER_NAME | { USER, NEW_USER_NAME } |


## VIDEO CHANGE
### **Description**
Gets send to Client when a User succesfully calls the Video Change Route.

### Example
```json
{
"ID": -1,
"METHOD_NAME": "VIDEO_CHANGE",
"PARAMS": {"CHANGE_USER": "58652229-dc4f-4aed-8396-51042ecdc564"}
}
```

## VIDEO END
### **Description**
Gets send to Client when a User succesfully calls the Video End Route.

### Example
```json
{
"ID": 0,
"METHOD_NAME": "VIDEO_END",
"PARAMS": {}
}
```

## PLAY
### **Description**
Gets send to Client when a User succesfully calls the Video PLAY/PAUSE Route.

### Example
```json
{
"ID": 1,
"METHOD_NAME": "PLAY",
"PARAMS": {"CHANGE_USER": "58652229-dc4f-4aed-8396-51042ecdc564"}
}
```

## PAUSE
### **Description**
Gets send to Client when a User succesfully calls the Video PLAY/PAUSE Route.

### Example
```json
{
"ID": 2,
"METHOD_NAME": "PAUSE",
"PARAMS": {"CHANGE_USER": "58652229-dc4f-4aed-8396-51042ecdc564"}
}
```

## BUFFERING
### **Description**
Gets send to Client when a User succesfully calls the BUFFERING Route. Same Route is used to change Video Time.
### Example
```json
{
"ID": 3,
"METHOD_NAME": "BUFFERING",
"PARAMS": {
    "TIME": "0.0"
    }
}
```

## HELLO_WORLD
### **Description**
Gets send to Client from Server on Initial WebSocket connection.

### Example
```json
{
"ID": 1010,
"METHOD_NAME": "HELLO_WORLD",
"PARAMS": {
    "id": "58652229-dc4f-4aed-8396-51042ecdc564"
    }
}
```

## JOIN ROOM
### **Description**
Gets send to Client from Server to Inform about a new user joining the room this user is registerd to.

### Example
```json
{
"ID": 1002,
"METHOD_NAME": "JOIN_ROOM",
"PARAMS": {
    "NEW_USER": "58652229-dc4f-4aed-8396-51042ecdc564"
    }
}
```

## JOIN ROOM SUCCESS
### **Description**
Gets send to Client from Server to Inform the client about succesfully joining a room.

### Example
```json
{
"ID": 1003,
"METHOD_NAME": "JOIN_ROOM_SUCCESS",
"PARAMS": {
    "ROOM_ID": "178ccba1-e03c-4f8b-b5df-e77c3f69834d"
    }
}
```

## CHANGE USER NAME
### **Description**
Gets send to Client from Server to Inform the client about succesfully joining a room.

### Example
```json
{
"ID": 1003,
"METHOD_NAME": "CHANGE_USER_NAME",
"PARAMS": {
    "USER": "58652229-dc4f-4aed-8396-51042ecdc564",
    "NEW_USER_NAME": "aph"
    }
}
```

