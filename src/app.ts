import express from "express";
import cors from "cors";
import { sessionConfig } from "./config/session";
import routerDrink from "./routes/drink.route";
import routerFav from "./routes/favorite.route";
import routerUser from "./routes/userRoute";
import pool from "./config/database";
import { startWebSocketServer } from "./config/webSocket";
import { WebSocketObserver } from "./webSocketObserver/webSocketObserver";
import DrinkNotifier from "./services/DrinkNotifier";


const corsOptions = {
    origin: 'http://localhost:63342', // Il dominio del frontend
    credentials: true, // Consenti l'invio di cookie/credenziali
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metodi consentiti
    allowedHeaders: ['Content-Type', 'Authorization'], // Header consentiti
  };

const app = express();
app.use(cors(corsOptions));
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parsing automatico
app.use(sessionConfig);
app.use("/api",routerDrink);
app.use("/api",routerFav);
app.use("/api",routerUser);
pool.connect();

startWebSocketServer();
const wsObserber = new WebSocketObserver();
DrinkNotifier.attach(wsObserber);

app.listen(port,()=>{
    console.log("server attivo porta"+ port);
});
