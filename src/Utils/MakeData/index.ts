/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker/locale/pt_BR';
import { TAnimal } from '../../Types/TAnimal';
import { TPerson } from '../../Types/TPerson';

const range = (len: number) => {
	const arr = [];
	for (let i = 0; i < len; i += 1) {
		arr.push(i);
	}
	return arr;
};

export function animal(...lens: number[]) {
	const makeDataLevel = (depth = 0): TAnimal[] => {
		const len = lens[depth]!;
		return range(len).map(
			(i): TAnimal => ({
				id: String(i + 1),
				name: faker.helpers.arrayElement([
					faker.animal.dog(),
					faker.animal.cat(),
					faker.animal.bird(),
				]),
			})
		);
	};

	return makeDataLevel();
}

export function person(...lens: number[]) {
	const makeDataLevel = (depth = 0): TPerson[] => {
		const len = lens[depth]!;
		return range(len).map(
			(i): TPerson => ({
				id: String(i + 1),
				name: faker.name.firstName(),
				lastName: faker.name.lastName(),
				birthday: faker.date.past().toISOString(),
				email: faker.internet.email(),
				avatar: faker.internet.avatar(),
				role: faker.helpers.arrayElement(['Admin', 'User', 'Dev']),
				isActive: faker.helpers.arrayElement([true, false]),
				friends: animal(faker.helpers.arrayElement([1, 2, 3])),
			})
		);
	};

	return makeDataLevel();
}

export const makeData = { person };
