import { Request,Response } from "express";
import {fetchRecipe, getAllDrinks, fetchDrinkBySearch, fetchDrinkAdvancedSearch} from "../models/drink.model";
 
export const getDrinks= async(
    req:Request,res:Response):Promise<void> =>{
        try{
            const drinks = await getAllDrinks();
            res.status(200).json(drinks);
            return ;
        }catch(error){
            res.status(500).send("errore server");
        }

    };

export const getRecipe = async (
    request: Request,
    response: Response,
): Promise<void> => {
    try {
        const { drink_id: drinkId } = request.params;
        const recipe = await fetchRecipe(drinkId);
        response.status(200).json(recipe);
    } catch (error) {
        response.status(500).send("Internal Server Error");
    }
};


export const getDrinkBySearch = async (request: Request, response: Response) => {
    const { drink_search: drinkSearch } = request.params;
    const { no_latte: noLatte } = request.params;
    try {
        const drink = await fetchDrinkBySearch(drinkSearch,noLatte);
        response.status(200).json(drink);
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
};

export const getDrinkByAdvancedSearch = async (req:Request,res:Response) => {
    const {nome_drink_or_ingrediente : nomeDrinkOrIngrediente} = req.params;
    const { no_latte : noLatte} = req.params;
    const { alcolico: alcolico} = req.params;
    const { difficolta: difficolta } = req.params;

    try{
        const drink = await fetchDrinkAdvancedSearch(nomeDrinkOrIngrediente,noLatte,alcolico,difficolta);
        res.status(200).json(drink);
    }catch{
        res.status(500).send("internal server error");
    }
}
