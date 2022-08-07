import {
	GET_ALL_POKEMONS,
	GET_ALL_TYPES,
	GET_POKEMON_ID,
	GET_POKEMON_NAME,
	SWITCH_LOADING,
	CREATE_POKEMON,
} from '../Actions/actionsTypes';
import axios from 'axios';

export const getAllPokemons = () => {
	return async function (dispatch) {
		const getData = await axios.get('http://localhost:3001/pokemons');
		dispatch({
			type: GET_ALL_POKEMONS,
			payload: getData.data,
		});
	};
};
export const getAllTypes = () => {
	return async function (dispatch) {
		const getData = await axios.get('http://localhost:3001/types');
		dispatch({
			type: GET_ALL_TYPES,
			payload: getData.data,
		});
	};
};
export const getPokemonById = id => {
	return async function (dispatch) {
		const getData = await axios.get(`http://localhost:3001/pokemons/${id}`);
		dispatch({
			type: GET_POKEMON_ID,
			payload: getData.data,
		});
	};
};
export const getPokemonByName = name => {
	return async function (dispatch) {
		const getData = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
		dispatch({
			type: GET_POKEMON_NAME,
			payload: getData.data,
		});
	};
};

export const switchLoading = bool => {
	return dispatch => {
		dispatch({ type: SWITCH_LOADING, payload: bool });
	};
};
export const createPokemon = data => {
	return async function (dispatch) {
		const getData = await axios.post('http://localhost:3001/create', data);
		dispatch({
			type: CREATE_POKEMON,
			payload: getData.data,
		});
	};
};
