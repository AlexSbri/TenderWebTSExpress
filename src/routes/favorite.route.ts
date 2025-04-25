import express from 'express';
import { getAllFavoritesByUser,addFavoriteDrinkController,deleteFavoriteDrinkController } from '../controllers/favorite.controller';

const router = express.Router();

router.get('/favorites/:id_user', getAllFavoritesByUser);

router.post('/favorites/:drink_id/:id_user', addFavoriteDrinkController);

router.delete('/favorites/:drink_id/:id_user', deleteFavoriteDrinkController);

export default router;