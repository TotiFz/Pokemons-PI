import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, switchLoading } from '../../Redux/Actions/actions';
import Search from '../SearchBar/SearchBar';
import notFound from '../../Images/notfound.png';
import Loading from '../../Images/loading-pokeball.gif';
import './Home.css';
import Cards from '../Cards/Cards';
import Pagination from '../Pagination/Pagination';

export default function Home() {
	const dispatch = useDispatch();
	const searchPokemons = useSelector(state => state.pokemonByName);
	const allPokemons = useSelector(state => state.allPokemons);
	const loading = useSelector(state => state.loading);
	const [search, setSearch] = useState(false);
	const [page, setPage] = useState(1);
	const [offset, setOffset] = useState(0);
	const [filteredPokemons, setFilteredPokemons] = useState([]);
	const [filterPokeDb, setFilterPokeDb] = useState([]);
	const [orderedPokemons, setOrderedPokemons] = useState([]);
	let pokemons = [];

	// ------------- INIT -------------------
	useEffect(() => {
		dispatch(getAllPokemons());
	}, []); //eslint-disable-line

	// ------------- SEARCH -------------------
	useEffect(() => {
		setOrderedPokemons([]);
		setFilteredPokemons([]);
		setOffset(0);
		setPage(1);
		if (allPokemons.length) {
			dispatch(switchLoading(false));
		}
	}, [search, searchPokemons, allPokemons]);

	// ------------- FILTER -------------------
	const onFilterElemnt = e => {
		if (e.target.value === '') return setFilteredPokemons([]);
		const filterPoke = [...allPokemons]?.filter(poke => poke.types.includes(e.target.value));
		filterPoke.length && setFilteredPokemons(filterPoke);
	};

	const onFilterType = e => {
		let filterPoke;
		if (e.target.value === '') return setFilterPokeDb([]);
		else if (e.target.value === 'Existing')
			filterPoke = [...allPokemons]?.filter(poke => typeof poke.id === 'number');
		else filterPoke = [...allPokemons]?.filter(poke => typeof poke.id === 'string');
		filterPoke.length && setFilterPokeDb(filterPoke);
	};

	// ------------- SORT -------------------
	const sortPokemons = (pokemonsArray, action, setFunction) => {
		if (action === 'asc') {
			const asc = [...pokemonsArray].sort((a, b) => {
				return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
			});
			setFunction ? setFunction(asc) : (pokemons = asc);
		}
		if (action === 'des') {
			const des = [...pokemonsArray].sort((a, b) => {
				return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
			});
			setFunction ? setFunction(des) : (pokemons = des);
		}
		if (action === 'high') {
			const high = [...pokemonsArray].sort((a, b) => {
				return a.attack < b.attack ? 1 : -1;
			});
			setFunction ? setFunction(high) : (pokemons = high);
		}

		if (action === 'low') {
			const low = [...pokemonsArray].sort((a, b) => {
				return a.attack > b.attack ? 1 : -1;
			});
			setFunction ? setFunction(low) : (pokemons = low);
		}
	};
	function handleSort(e) {
		if (filteredPokemons.length) {
			sortPokemons(filteredPokemons, e.target.value, setFilteredPokemons);
		} else if (searchPokemons.length && search) {
			sortPokemons(searchPokemons, e.target.value, null);
		} else {
			sortPokemons(allPokemons, e.target.value, setOrderedPokemons);
		}
	}

	// ------------- PAGINATED -------------------
	const numPokemons = 12;
	const maxPage = filteredPokemons.length
		? Math.ceil(filteredPokemons.length / numPokemons)
		: searchPokemons.length
		? Math.ceil(searchPokemons.length / numPokemons)
		: Math.ceil(allPokemons.length / numPokemons)
		? filterPokeDb.length
		: Math.ceil(filterPokeDb.length / numPokemons);

	if (search && searchPokemons) {
		pokemons = [searchPokemons].slice(offset, offset + numPokemons);
	} else if (filteredPokemons.length) {
		pokemons = [...filteredPokemons].slice(offset, offset + numPokemons);
	} else if (orderedPokemons.length) {
		pokemons = [...orderedPokemons].slice(offset, offset + numPokemons);
	} else if (filterPokeDb.length) {
		pokemons = [...filterPokeDb].slice(offset, offset + numPokemons);
	} else {
		pokemons = [...allPokemons].slice(offset, offset + numPokemons);
	}

	const tryAgain = (
		<div>
			<img className="not-found" src={notFound} alt="Not found" />
			<h1 className="not-found-text"> </h1>
			<button
				className="btn-not-found"
				onClick={ev => {
					setSearch('');
					setFilteredPokemons(ev, 'empty');
				}}
			>
				Try again
			</button>
		</div>
	);
	return (
		<React.Fragment>
			<div className="main">
				<div>
					<div>
						<div className="filter-sort">
							<div>
								<span>Sort: </span>
								<select onChange={handleSort}>
									<option default value=""></option>
									<option value="asc">A-Z</option>
									<option value="des">Z-A</option>
								</select>

								<span>Order: </span>
								<select onChange={handleSort}>
									<option default value=""></option>
									<option value="high">High</option>
									<option value="low">Low</option>
								</select>

								<span>Pokemon Type: </span>
								<select className="filter-select" onChange={onFilterElemnt}>
									<option default value="">
										All
									</option>
									<option value="Ground">Ground</option>
									<option value="Flying">Flying</option>
									<option value="Normal">Normal</option>
									<option value="Poison">Poison</option>
									<option value="Fighting">Fighting</option>
									<option value="Rock">Rock</option>
									<option value="Ghost">Ghost</option>
									<option value="Steel">Steel</option>
									<option value="Fire">Fire</option>
									<option value="Bug">Bug</option>;<option value="Grass">Grass</option>;
									<option value="Electric">Electric</option>;<option value="Psychic">Psychic</option>;
									<option value="Ice">Ice</option>;<option value="Water">Water</option>;
									<option value="Dragon">Dragon</option>;<option value="Dark">Dark</option>;
									<option value="Fairy">Fairy</option>;<option value="Unknown">Unknown</option>;
									<option value="Shadow">Shadow</option>;
								</select>
								<span>Pokemon Created: </span>
								<select className="filter-select" onChange={onFilterType}>
									<option default value="">
										All
									</option>
									<option value="Created">Created</option>
									<option value="Existing">Existing</option>
								</select>
							</div>
							<div>
								<Search setSearch={setSearch} />
							</div>
						</div>
					</div>
				</div>
				<div className="pokemons-home">
					{loading ? (
						<div>
							<img className="loading" src={Loading} alt="Loading" />
						</div>
					) : pokemons.length > 0 ? (
						<Cards pokemons={pokemons} />
					) : (
						tryAgain
					)}
				</div>
				<Pagination maxPage={maxPage} page={page} setOffset={setOffset} setPage={setPage} offset={offset} />
			</div>
		</React.Fragment>
	);
}
