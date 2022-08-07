const router = require('express').Router();
const { Pokemon, Type } = require('../db');

router.post('/', async (req, res, next) => {
	const { name, hp, attack, defense, speed, height, weight, img, types } = req.body;
	try {
		const pokeCreate = await Pokemon.create({
			name,
			hp,
			attack,
			defense,
			speed,
			height,
			weight,
			img,
		});
		if (types) {
			types.forEach(async info => {
				let data = await Type.findAll({
					where: {
						name: info.toLowerCase(),
					},
				});
				await pokeCreate.addType(data);
			});
		}
		res.send(pokeCreate);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
