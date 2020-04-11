'use strict';

// TODO: Splice record out of the array when socket closes rather than nulling

// Open a WebSocket.Server on port 3000
const WebSocket = require('ws');
const wss = new WebSocket.Server(
    {port: 3000}, 
    () => {console.log('listening');}
);

// Global variables used to determine client number and store
// data for all clients.
var clientId = 0;
var clients = [];

/** 
 * Utility function that broadcasts a message from the given client
 * to all of the other clients.  
 */
function broadcast(fromClient, message) {
    for (let i=0; i<clients.length; i++) {
        if (i!=fromClient && clients[i] && 
            clients[i].ws.readyState == WebSocket.OPEN) {
	    console.log(`Sending ${message} to ${i}.`);
            clients[i].ws.send(message);
        }
    }
}

/**
 * Handle messages from a client.  Initial message is username.
 * Subsequent messages are to be displayed in other chat windows.
 */
function messageHandler(ws, thisClient) {
    return event => {
	let data = event.data;
	if (!clients[thisClient]) {
	    let others = '';
	    for (let i=0; i<clients.length; i++) {
		if (clients[i]) {
		    others += clients[i].name + ' ';
		}
	    }
	    if (others.length === 0) {
		ws.send("You are the first in this chat room.");
	    }
	    else {
		ws.send("You're joining a chat with " + others);
		broadcast(thisClient, `${data} joined the chat.`);
	    }
	    clients[thisClient] = {name:data, ws:ws};
	}
	else {
	    let myName = clients[thisClient].name;
	    console.log(`Sending ${data} from ${myName}.`);
	    broadcast(thisClient, `${myName}: ${data}`);
	}
    }
}

/**
 * Handle connection from a client.
 * On each connection by a client, add the client to an array.
 * Also register event listeners on this client's WebSocket.
 */
function connector(ws) {
    let thisClient = clientId++;
    console.log(`connection opened by ${thisClient}`);
    ws.on('close', (code, reason) => {
        console.log(`connection closed by ${thisClient}`);
	if (clients[thisClient]) {
  	    broadcast(thisClient, 
		      `${clients[thisClient].name} left the chat.`);
            clients[thisClient] = null;
        }
    });
    ws.on('error', err => {console.log(`WebSocket error: ${err}`);});
    ws.addEventListener('message', messageHandler(ws, thisClient));
}

// Register listeners on the server.
wss.on('connection', connector);
wss.on('error', err => {console.log(`Server error: ${err}`);});
