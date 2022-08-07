const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const PokemonControllers = require('../controllers/PokemonControllers');
const CreateControllers = require('../controllers/CreateControllers');
const TypeControllers = require('../controllers/TypeControllers');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', PokemonControllers);
router.use('/create', CreateControllers);
router.use('/types', TypeControllers);

module.exports = router;
