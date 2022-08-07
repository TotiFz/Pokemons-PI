import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonById } from '../../Redux/Actions/actions';
import loadingGif from '../../Images/loading-pokeball.gif';
import './Details.css';

function Details() {
	const params = useParams();
	const { id } = params;
	const [loading, setLoading] = useState(true);
	const data = useSelector(state => state.details);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPokemonById(id));
		setTimeout(() => {
			setLoading(false);
		}, 2500);
	}, [dispatch, id]);

	const getTypes = () => {
		let arr = [];
		if (data.types) {
			for (let i of data.types) {
				typeof i === 'object' ? arr.push(i.name) : arr.push(i);
			}
			return arr.length ? arr.join(', ') : 'Sorry, Type not found';
		}
	};
	return (
		<React.Fragment>
			<div className="details-main">
				{loading ? (
					<div>
						<img className="img-loading" src={loadingGif} alt="Loading..." />
					</div>
				) : data.name ? (
					<div>
						<h1 className="details-title">{data.name}</h1>
						<div className="container-details">
							<div className="container-left">
								<img className="img-poke" src={data.img} alt="recipe" />
							</div>
							<div className="container-data">
								<h3>{`Number ID: ${data.id}.`}</h3>
								<h3>{`Weight: ${data.weight}.`}</h3>
								<h3>{`Heigth: ${data.height}.`}</h3>
								<h3>{`Attack: ${data.attack}.`}</h3>
								<h3>{`Defense: ${data.defense}.`}</h3>
								<h3>{`Hp: ${data.hp}.`}</h3>
								<h3>{`Speed: ${data.speed}.`}</h3>
								<h3>{`Moves: ${data.moves}.`}</h3>
								<h3>{`Types: ${getTypes()}.`}</h3>
							</div>
						</div>
					</div>
				) : (
					<h1>Oh no! Something didn't work</h1>
				)}
			</div>
		</React.Fragment>
	);
}
export default Details;
