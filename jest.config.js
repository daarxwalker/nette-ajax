module.exports = {
	roots: ['<rootDir>/src/'],
	modulePaths: ['<rootDir>/src/'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	verbose: true,
}
