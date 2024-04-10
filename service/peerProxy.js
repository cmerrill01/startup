const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
    const wss = new WebSocketServer({ noServer: true });

    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    let connections = [];

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws };
        connections.push(connection);

        ws.on('message', function message(data) {
            messageObject = JSON.parse(data);
            messageObject.connectionId = connection.id;
            connections.forEach((c) => {
                if (c.id !== connection.id) {
                    c.ws.send(JSON.stringify(messageObject));
                }
            });
        });

        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id);

            if (pos >= 0) {
                connections.splice(pos, 1);
            }

            messageObject = {
                type: 'playerLeft',
                connectionId: connection.id
            }
            connections.forEach((c) => {
                c.ws.send(JSON.stringify(messageObject));
            });
        });

        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    setInterval(() => {
        connections.forEach((connection) => {
            if (!connection.alive) {
                connection.ws.terminate();
            } else {
                connection.alive = false;
                connection.ws.ping();
            }
        });
    }, 10000);
}

module.exports = { peerProxy };