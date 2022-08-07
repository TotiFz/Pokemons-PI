import {
	GET_ALL_POKEMONS,
	GET_ALL_TYPES,
	GET_POKEMON_ID,
	GET_POKEMON_NAME,
	SWITCH_LOADING,
	CREATE_POKEMON,
} from '../Actions/actionsTypes';

const initialState = {
	allPokemons: [],
	pokemonByName: [],
	details: {},
	types: [],
	loading: true,
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_ALL_POKEMONS:
			return {
				...state,
				allPokemons: payload,
				pokemonByName: payload,
			};
		case GET_ALL_TYPES:
			return {
				...state,
				types: payload,
			};
		case GET_POKEMON_ID:
			return {
				...state,
				details: payload,
			};
		case GET_POKEMON_NAME:
			return {
				...state,
				pokemonByName: payload,
			};
		case SWITCH_LOADING:
			return {
				...state,
				loading: payload,
			};
		case CREATE_POKEMON:
			return {
				...state,
			};
		default:
			return state;
	}
};

export default reducer;
