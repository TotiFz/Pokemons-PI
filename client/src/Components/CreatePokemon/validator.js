let validate = value => {
	let errors = {};
	if (value.name.length > 15) {
		errors.name = 'Name is required with no more than 15 characters';
	} else if (value.name) {
		errors.name = '';
	} else {
		errors.name = 'Type a name.';
	}

	if (/^(ftp|http|https):\/\/[^ "]+$/.test(value.img)) {
		errors.img = '';
	} else {
		errors.img = 'Must have a valid link image.';
	}

	if (!value.hp) {
		errors.hp = 'Type a hit points.';
	} else if (!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(value.hp)) {
		errors.hp = 'The hit points must be between 0 and 100';
	} else {
		errors.hp = '';
	}

	if (!value.attack) {
		errors.attack = 'Type a attack power.';
	} else if (!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(value.attack)) {
		errors.attack = 'The attack must be between 0 and 100';
	} else {
		errors.attack = '';
	}

	if (!value.defense) {
		errors.defense = 'Type a defense capacity';
	} else if (!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(value.defense)) {
		errors.defense = 'The defense must be between 0 and 100';
	} else {
		errors.defense = '';
	}

	if (!value.speed) {
		errors.speed = 'Type a speed';
	} else if (!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(value.speed)) {
		errors.speed = 'The speed must be between 0 and 100';
	} else {
		errors.speed = '';
	}

	if (!value.height) {
		errors.height = 'Type a height';
	} else if (!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(value.height)) {
		errors.height = 'The height must be between 0 and 100';
	} else {
		errors.height = '';
	}

	if (!value.weight) {
		errors.weight = 'Type a weight';
	} else if (!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(value.weight)) {
		errors.weight = 'The weight must be between 0 and 100';
	} else {
		errors.weight = '';
	}

	if (value.types.length > 2) {
		errors.types = 'Choose only 2 types';
	} else if (value.types) {
		errors.types = '';
	}

	return errors;
};
export default validate;
