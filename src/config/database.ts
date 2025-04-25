import { Pool} from 'pg';
import DrinkNotifier from '../services/DrinkNotifier';
import dotenv from 'dotenv';
dotenv.config({path: '../../database_postgresql.env'});
console.log(process.env.DB_NAME);
console.log(process.env.DB_HOST);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_USER);
const pool = new Pool({
    user:process.env.DB_USER  || 'postgres',
    host:process.env.DB_HOST || 'localhost',
    database:process.env.DB_NAME || 'postgres',
    password:process.env.DB_PASSWORD || 'napoli',
    port:5432,
    max: 20, // max number of clients in the pool
    idleTimeoutMillis: 30000, // close idle clients after 30 second
});

pool.on("connect",(client)=>{
    client.query("set search_path to tender_web");
    client.query("LISTEN new_drink").then()
    {
        console.log("New drink is connected!");
        client.on("notification", (msg) => {
            if (msg.channel === 'new_drink') {
                console.log(`Notifica ricevuta: ${msg.payload}`);
                DrinkNotifier.notify(msg.payload);
            }
        });
    }
});


export default pool;