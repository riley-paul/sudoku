import { describe, it, expect } from 'vitest';
import { Board } from './Board';

describe('board tests', () => {
	it('prints successfully', () => {
		const board = new Board();
		const string = board.toString();
		console.log(string);
		expect(string).toBeTypeOf('string');
	});
	it('initializes with a grid', () => {
		const grid = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9]
		];
		const board = new Board(grid);
		expect(board.grid).toEqual(grid);
	});
	it('fails to initialize with an invalid grid', () => {
		const grid = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 4, 5, 6, 7, 8, 9]
		];
		expect(() => new Board(grid)).toThrowError();
	});
});
