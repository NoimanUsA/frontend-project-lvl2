 install: install-deps

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build
	
test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run
