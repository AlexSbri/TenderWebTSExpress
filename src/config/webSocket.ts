import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3001 });

const clients: Set<WebSocket> = new Set();

export function startWebSocketServer(){ 
    wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("Client connected");
    ws.on("close", () => {
        clients.delete(ws);
    });
});
}
export function notifyClients(data: any) {
    clients.forEach((client) => {
        if(client.readyState !== WebSocket.OPEN) return;
        client.send(JSON.stringify(data));
    });
}