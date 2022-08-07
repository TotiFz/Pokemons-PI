import React from 'react';
import Card from '../Card/Card';
const Cards = ({ pokemons }) => {
	return (
		<>
			{[...pokemons].map(poke => (
				<Card key={poke.id} id={poke.id} name={poke.name} img={poke.img} types={poke.types} />
			))}
		</>
	);
};
export default Cards;
