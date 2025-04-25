import pool from "../config/database";
import {notifyClients} from "../config/webSocket";
export interface Favorite{
    id_drink:number,
    id_user:number
}

export async function fetchAllFavoritesByUser(id_user:number):Promise<Favorite[]>{
    
    const query = {
        text: "SELECT id_drink FROM favorites WHERE id_user = $1",
        values: [id_user],
    };
    
    try {
        const result= await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("errore durante l'esecuzione : ", error);
        throw error;
    }
}

export async function addFavoriteDrink(id_drink:number,id_user:number):Promise<Favorite[]>{
    const query = {
        text:"INSERT INTO favorites (id_drink,id_user) VALUES ($1,$2)",
        values:[id_drink,id_user]};
    try {
        const result= await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("errore durante l'esecuzione : ", error);
        throw error;
    }
}

export async function deleteFavoriteDrink(id_drink:number,id_user:number):Promise<Favorite[]>{
    const query = {
        text:"DELETE FROM favorites WHERE id_drink = $1 AND id_user = $2",
        values:[id_drink,id_user]};
    try {
        const result= await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("errore durante l'esecuzione : ", error);
        throw error;
    }
}