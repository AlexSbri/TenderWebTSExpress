import express from 'express';
import { getDrinks, getRecipe , getDrinkBySearch, getDrinkByAdvancedSearch } from '../controllers/drink.controller';


const router = express.Router();

router.get('/drinks', getDrinks);

router.get('/recipe/:drink_id', getRecipe);

router.get('/drinks/search/:no_latte/:drink_search', getDrinkBySearch);

router.get(`/drinks/searchadv/
    :nome_drink_or_ingrediente/
    :no_latte/
    :alcolico/
    :difficolta`, getDrinkByAdvancedSearch);

export default router;
