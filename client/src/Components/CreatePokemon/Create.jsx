import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getAllTypes } from '../../Redux/Actions/actions';
import validate from './validator';
import './Create.css';

export default function Create() {
	const dispatch = useDispatch();
	let type = useSelector(state => state.types);
	const [input, setInput] = useState({
		name: '',
		hp: '',
		attack: '',
		defense: '',
		speed: '',
		height: '',
		weight: '',
		img: '',
		types: [],
	});
	const [errors, setErrors] = useState({});

	React.useEffect(() => {
		dispatch(getAllTypes());
	}, [dispatch]);

	const handleChange = e => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});

		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	};

	const handleChangeDiet = e => {
		e.preventDefault();

		if (input.types.length === 0) setInput({ ...input, types: [...input.types, e.target.value] });
		else {
			if (input.types.find(element => element === e.target.value)) {
			} else {
				setInput({ ...input, types: [...input.types, e.target.value] });
			}
		}
	};

	const handleDelete = e => {
		e.preventDefault();
		setInput({
			...input,
			types: input.types.filter(type => type !== e.target.value),
		});
	};

	let id = 0;
	function addKey() {
		return id++;
	}

	const val = () => {
		if (
			input.name &&
			input.hp &&
			input.attack &&
			input.defense &&
			input.speed &&
			input.height &&
			input.weight &&
			input.img &&
			input.types
		) {
			return true;
		} else if (
			errors.name !== '' ||
			errors.img !== '' ||
			errors.hp !== '' ||
			errors.attack !== '' ||
			errors.defense !== '' ||
			errors.speed !== '' ||
			errors.height !== '' ||
			errors.weight !== '' ||
			errors.types !== ''
		) {
			return false;
		} else {
			return 'empty';
		}
	};

	function handleSubmit(e) {
		e.preventDefault();
		if (val() === true) {
			dispatch(createPokemon(input));
			alert('Pokemon was created successfully');
			setInput({
				name: '',
				hp: '',
				attack: '',
				defense: '',
				speed: '',
				height: '',
				weight: '',
				img: '',
				types: [],
			});
		} else if (val() === 'empty') {
			alert('Must complete all the data required.');
		} else alert('Please complete correctly.');
	}
	return (
		<div className="containerForm">
			<h1 className="form-title ">Create your own Pokemon!</h1>
			<form id="breedForm" className="divForm" onSubmit={handleSubmit}>
				<div>
					<h4>Name</h4>
					<input
						autoComplete="off"
						className="inputStyle"
						type="text"
						name="name"
						value={input.name}
						onChange={handleChange}
					/>
					{errors.name && <p className="danger">{errors.name}</p>}
				</div>
				<div>
					<h4>Hp</h4>
					<input
						autoComplete="off"
						className="inputStyle"
						type="text"
						name="hp"
						value={input.hp}
						onChange={handleChange}
					/>
					{errors.hp && <p className="danger">{errors.hp}</p>}
				</div>
				<div>
					<h4>Attack</h4>
					<input
						autoComplete="off"
						className="inputStyle"
						type="text"
						name="attack"
						value={input.attack}
						onChange={handleChange}
					/>
					{errors.attack && <p className="danger">{errors.attack}</p>}
				</div>
				<div>
					<h4>Defense</h4>
					<input
						autoComplete="off"
						className="inputStyle"
						type="text"
						name="defense"
						value={input.defense}
						onChange={handleChange}
					/>
					{errors.defense && <p className="danger">{errors.defense}</p>}
				</div>
				<div>
					<h4>Speed</h4>
					<input
						autoComplete="off"
						className="inputStyle"
						type="text"
						name="speed"
						value={input.speed}
						onChange={handleChange}
					/>
					{errors.speed && <p className="danger">{errors.speed}</p>}
				</div>
				<div>
					<h4>Height</h4>
					<input
						autoComplete="off"
						className="inputStyle"
						type="text"
						name="height"
						value={input.height}
						onChange={handleChange}
					/>
					{errors.height && <p className="danger">{errors.height}</p>}
				</div>
				<div>
					<h4>Weight</h4>
					<input
						autoComplete="off"
						className="inputStyle"
						type="text"
						name="weight"
						value={input.weight}
						onChange={handleChange}
					/>
					{errors.weight && <p className="danger">{errors.weight}</p>}
				</div>
				<div>
					<h4>Image</h4>
					<input
						autoComplete="off"
						className="inputStyle"
						type="text"
						name="img"
						placeholder="Paste your image link..."
						value={input.img}
						onChange={handleChange}
					/>
					{errors.img && <p className="danger">{errors.img}</p>}
				</div>
				<div>
					<h4>Type</h4>
					<select onChange={handleChangeDiet} className="tempSelect">
						{type &&
							type.map(d => (
								<option key={d.id} value={d.name}>
									{d.name}
								</option>
							))}
					</select>
					{errors.types && <p className="danger">{errors.types}</p>}
				</div>

				<div className="temp">
					{input.types.map(e => (
						<div className="btnT" key={addKey()}>
							<p>{e}</p>
							<button className="delete" onClick={handleDelete} value={e}>
								X
							</button>
						</div>
					))}
				</div>
				<div>
					<button
						className="btn-reset"
						onClick={e => {
							e.preventDefault();
							setInput({
								name: '',
								hp: '',
								attack: '',
								defense: '',
								speed: '',
								height: '',
								weight: '',
								img: '',
								types: [],
							});
							setErrors({});
							document.getElementById('breedForm').reset();
						}}
					>
						Reset
					</button>
					<button className="btnS" type="submit">
						Create Pokemon
					</button>
				</div>
			</form>
		</div>
	);
}
