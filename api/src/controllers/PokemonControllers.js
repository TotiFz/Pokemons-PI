const router = require('express').Router();
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { standarDb, standarApi } = require('../Utils/utils');

router.get('/', async (req, res, next) => {
	const { name } = req.query;
	try {
		if (name) {
			const unChangeName = name.trim().toLowerCase();
			const infoPokeDb = await Pokemon.findOne({
				where: { name: unChangeName },
				include: Type,
			});
			if (infoPokeDb) {
				return res.json(standarDb(infoPokeDb));
			} else {
				const infoPokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${unChangeName}`);
				return res.json(standarApi(infoPokeApi));
			}
		} else {
			const dataPokeApi = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=40');
			const dataPokeMap = dataPokeApi.data.results.map(poke => {
				return axios
					.get(poke.url)
					.then(resp => {
						return { ...standarApi(resp) };
					})
					.catch(e => next(e));
			});
			const pokeApi = await Promise.all(dataPokeMap);

			const dataPokeDb = await Pokemon.findAll({
				include: {
					model: Type,
					attributes: ['name'],
					through: { attributes: [] },
				},
			});
			const standarPokeDb = dataPokeDb?.map(poke => {
				return standarDb(poke);
			});
			const concatPoke = pokeApi.concat(standarPokeDb);
			res.json(concatPoke);
		}
	} catch (error) {
		next(error);
	}
});
function isUUID(id) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}
router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		if (isUUID(id)) {
			const dataPokeDb = await Pokemon.findByPk(id, { include: Type });
			return res.json(standarDb(dataPokeDb));
		} else {
			const dataPokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
			return res.json(standarApi(dataPokeApi));
		}
	} catch (error) {
		next(error);
	}
});
router.delete('/delete/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const findPoke = await Pokemon.findByPk(id);
		if (findPoke) {
			await findPoke.destroy();
			res.json('Pokemon has delete sucesfully!');
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
