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
| -1 | VIDEO_CHANGE | N/A |
| 0 | VIDEO_END | N/A |
| 1 | PLAY | N/A |
| 2 | PAUSE | N/A |
| 3 | BUFFERING | ex. new Timestamp to be sent to Client |
| 1010 | HELLO_WORLD | {id} |
| 1002 | JOIN_ROOM | {NEW_USER, } |
| 1003 | JOIN_ROOM_SUCCESS | {ROOM_ID } |


## VIDEO CHANGE
```json
{
"ID": -1,
"METHOD_NAME": "VIDEO_CHANGE",
"PARAMS": {}
}
```

## VIDEO END
```json
{
"ID": 0,
"METHOD_NAME": "VIDEO_END",
"PARAMS": {}
}
```

## PLAY
```json
{
"ID": -1,
"METHOD_NAME": "VIDEO_CHANGE",
"PARAMS": {}
}
```