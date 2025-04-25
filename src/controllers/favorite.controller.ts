import { Request,Response } from "express";
import {fetchAllFavoritesByUser,addFavoriteDrink,deleteFavoriteDrink} from "../models/favorites.model";

export const getAllFavoritesByUser = async (request: Request, response: Response) => {
    const { id_user: idUser } = request.params;

    try {
        const favorite = await fetchAllFavoritesByUser(Number(idUser));
        response.status(200).json(favorite);
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
};

export const addFavoriteDrinkController = async (request: Request, response: Response) => {
    const { drink_id: idDrink, id_user: idUser } = request.params;
    try {
        const favorite = await addFavoriteDrink(Number(idDrink),Number(idUser));
        response.status(200).json(favorite);
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
};

export const deleteFavoriteDrinkController = async (request: Request, response: Response) => {
    const { drink_id: idDrink, id_user: idUser } = request.params;
    try {
        const favorite = await deleteFavoriteDrink(Number(idDrink),Number(idUser));
        response.status(200).json(favorite);
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
};