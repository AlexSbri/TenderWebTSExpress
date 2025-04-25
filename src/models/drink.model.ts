import pool from "../config/database";

export interface Drink{
    id_drink:number;
    nome:string;
    descrizione:string;
    ingredienti:string;
    alcolico:boolean;
    step:string;
    difficolta:string;
}

export const getAllDrinks = 
    async():Promise<Drink[]> => {
        try {
            const query = "SELECT d.id_drink AS drink_id,d.nome AS drink_name, d.descrizione," +
                "coalesce(string_agg(i.nome , ', '),'nessun ingrediente') AS ingredients " +
                "FROM drink d " +
                "LEFT JOIN ingredient i ON i.id_drink = d.id_drink " +
                "GROUP BY d.id_drink, d.nome, d.descrizione;";
            const result= await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error("errore durante l'esecuzione",error);
            throw error;
        }
        
    };

export async function fetchRecipe(drinkId: string): Promise<{ step: string }> {
    const query = {
        text: "SELECT step FROM recipe WHERE id_drink = $1",
        values: [drinkId],
    };

    try {
        const { rows } = await pool.query(query);
        return rows[0];
    } catch (error) {
        console.error("errore durante l'esecuzione : ", error);
        throw error;
    }
}

    export async function fetchDrinkBySearch(search: string,nolatte: string): Promise<Drink[]> {

        let initialQuery2 = `SELECT 
                    d.id_drink AS drink_id, 
                    d.nome AS drink_name, 
                    d.descrizione, 
                    string_agg(i.nome, ', ') AS ingredients
                    FROM 
                    drink d
                    INNER JOIN 
                    ingredient i 
                    ON 
                    i.id_drink = d.id_drink
                    GROUP BY 
                    d.id_drink, d.nome, d.descrizione
                    HAVING `
                    if(nolatte === "true") 
                        initialQuery2 += ` NOT bool_or(i.nome ilike 'latte') AND `;
                    
                    initialQuery2 += ` CASE 
                    WHEN $1 = 'null' THEN true
                    ELSE (bool_or(i.nome ILIKE $1) OR d.nome ILIKE $1)
                    END;`;

        //PREPARED STATEMENT
        const query2 = {
            text: initialQuery2,
            values: [search],
        };

        try {    
            const result  = await pool.query(query2);
            return result.rows; 
        } catch (error) {
            console.error("errore durante l'esecuzione : ", error);
            throw error;
        }   
    };

export async function fetchDrinkAdvancedSearch(nomeDrinkOrIngrediente: string,
    noLatte: string, alcolico: string, difficolta: string): Promise<Drink[]> {

        let initial = `SELECT d.id_drink ,d.nome ,d.descrizione, string_agg(i.nome, ', ') AS ingredienti `;
        if(difficolta !== null) initial+= `, r.step , r.difficolta `
        initial+= ` from drink d INNER JOIN ingredient i on d.id_drink = i.id_drink `;
        if(difficolta !== null) initial += ` INNER JOIN recipe r on d.id_drink = r.id_drink `;
        initial+=` GROUP BY d.nome, d.id_drink, descrizione, alcolico`;
        if(difficolta != null ) initial+= ` ,r.difficolta,r.step  `;

        const havingConditions:string[] = [];
        let paramCounter = 0;
        let params : any[] = [];

        if(nomeDrinkOrIngrediente != null){
            paramCounter++;
            params.push(nomeDrinkOrIngrediente);
            havingConditions.push(` bool_or((d.nome ilike $${paramCounter}) or (i.nome ilike $${paramCounter})) `);
        } 
        if(noLatte === "true") havingConditions.push( ` NOT bool_or(i.nome ilike 'latte') `);
        if(alcolico === "true") havingConditions.push( `  bool_or(d.alcolico) `);
        if(difficolta !== "null"){ 
            paramCounter++;
            params.push(difficolta);
            havingConditions.push( ` r.difficolta = $${paramCounter} `);
        }
        if(havingConditions.length>0)
            initial+= `HAVING ${havingConditions.join(' AND ')}`;

        const query = {
            text : initial,
            values : params
        };

        try{
            const result = await pool.query(query);
            console.log(result.rows);
            return result.rows;
        }catch(error){
            console.error("errore , " + error);
            throw error;
        }
    }

