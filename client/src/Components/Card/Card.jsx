import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({ id, name, img, types }) {
	const getTypes = () => {
		let arr = [];
		if (types) {
			for (let i of types) {
				typeof i === 'object' ? arr.push(i.name) : arr.push(i);
			}
			return arr.length ? arr.join(', ') : 'Sorry, Type not found';
		}
	};
	return (
		<React.Fragment>
			<Link to={`/pokemons/${id}`} className="cardLk">
				<div>
					<img className="card-img" src={img} alt={name} />
				</div>
				<div className="card-data">
					<h2 className="card-title">{name}</h2>
					<h3 className="card-types">{getTypes()}</h3>
				</div>
			</Link>
		</React.Fragment>
	);
}
