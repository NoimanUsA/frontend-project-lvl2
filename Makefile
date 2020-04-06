build :
	sudo npm run build --dry-run

start:
	babel-node src/bin/gendiff.js _fixtures_/before.json _fixtures_/after.json

lint :
	npx eslint .

lint-fix :
	npx eslint . --fix

test: 
	npx jest --watch

test-coverage: 
	npx jest --coverage
