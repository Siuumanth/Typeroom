import WebSocket from "ws";
import http from "http";

// creating server , no need for express
const server = http.createServer(function(request, response) {
   console.log((new Date()) + " Received request for " + request.url); 
   response.end("hoii");
});


const socket = new WebSocket.Server({ server });

// chat application
socket.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (data) => {
        socket.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});


