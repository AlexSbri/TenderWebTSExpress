import { Observer } from "../services/Observer";
import { notifyClients } from "../config/webSocket";

export class WebSocketObserver implements Observer {
    update(data: any) {
        notifyClients(data);
    }
}