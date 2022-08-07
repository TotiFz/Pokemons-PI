standarDb = dbInfo => {
	const typeMap = dbInfo.types?.map(type => type.name.charAt(0).toUpperCase() + type.name.slice(1));

	return {
		id: dbInfo.id,
		name: dbInfo.name.toUpperCase(),
		types: typeMap,
		hp: dbInfo.hp,
		attack: dbInfo.attack,
		defense: dbInfo.defense,
		speed: dbInfo.speed,
		height: dbInfo.height,
		weight: dbInfo.weight,
		img: dbInfo.img,
		Db: dbInfo.Db,
	};
};
standarApi = apiInfo => {
	const typeMap = apiInfo.data.types?.map(elem => {
		return elem.type.name.charAt(0).toUpperCase() + elem.type.name.slice(1);
	});
	return {
		id: apiInfo.data.id,
		name: apiInfo.data.name.toUpperCase(),
		types: typeMap,
		...apiInfo.data.stats.reduce(
			(prevValue, actualValue) => ({
				...prevValue,
				[actualValue.stat.name]: actualValue.base_stat,
			}),
			{}
		),
		height: apiInfo.data.height,
		weight: apiInfo.data.weight,
		img: apiInfo.data.sprites.other['official-artwork'].front_default,
		moves: apiInfo.data.moves[0].move.name,
		Db: false,
	};
};
standarTypes = typesInfo => {
	return typesInfo?.map(type => {
		return {
			...type.dataValues,
			name: type.dataValues.name.charAt(0).toUpperCase() + type.name.slice(1),
		};
	});
};
module.exports = { standarApi, standarDb, standarTypes };
