const router = require('express').Router();
const axios = require('axios');
const { Type } = require('../db');
const { standarTypes } = require('../Utils/utils');

router.get('/', async (req, res, next) => {
	try {
		const infoPokeApi = await axios.get('https://pokeapi.co/api/v2/type');
		const infoPokeMap = infoPokeApi.data.results?.map(t => {
			return t.name.toLowerCase();
		});
		const infoPokePush = await infoPokeMap?.map(async t => {
			return await Type.findOrCreate({
				where: { name: t },
			});
		});
		const infoPokePromise = await Promise.all(infoPokePush);
		const infoPokeSeacrh = await Type.findAll();
		return res.json(standarTypes(infoPokeSeacrh));
	} catch (error) {
		next(error);
	}
});

module.exports = router;
