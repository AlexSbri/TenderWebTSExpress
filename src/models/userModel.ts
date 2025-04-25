import pool from "../config/database";
export const createUser = async (username: string, hashedPassword: string): Promise<void> => {
    try {
        const query = `INSERT INTO "user" (username, password) VALUES ($1, $2)`;
        await pool.query(query, [username, hashedPassword]);
    } catch (error) {
        console.error("Errore durante l'aggiunta dell'utente:", error);
        throw error;
    }
}

export const getUserByUsername = async (username: string): Promise<any> => {
    try {
        const query = `SELECT * FROM "user" WHERE username = $1`;
        const result = await pool.query(query, [username]);
        return result.rows[0];
    } catch (error) {
        console.error("Errore durante la ricerca dell'utente:", error);
        throw error;
    }
}