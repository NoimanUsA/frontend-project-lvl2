install: install-deps

install-deps:
	npm ci
	
build :
	npm run build --dry-run

start:
	babel-node src/bin/gendiff.js _fixtures_/before.json _fixtures_/after.json

lint :
	npx eslint .

test: 
	npx jest --watch

test-coverage: 
	npx jest --coverage

push: 
	git push origin master