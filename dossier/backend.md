# backend

## Korte uitleg over jouw applicatie

- Wat is het?
- Hoe is het opgebouwd?
- Zijn er gekende bugs?

### gekende bugs

gedurende het runnen van mijn tests krijg ik een error die ik helemaal niet kan verklaren.
omwille van de migrations krijg ik de error ``

```yaml
# strange bug module imports not allowed fix => ook bij build maar dan bij seeds ipv migrations
- name: disable global setup
	run: sed -i -E 's/^\t+globalSetup:/\/\/globalSetup:/g' jest.config.ts

- name: run tests failure
	continue-on-error: true
	run: npm run test:ci

- name: enable global setup
	run: sed -i -E 's/^\/\/globalSetup:/globalSetup:/g' jest.config.ts

- name: run tests
	run: npm run test:ci
```

## Uitleg over de extra technologie (wat en hoe)

## Printscreens van de swagger API(geen Swagger JSONof YAML!)

## Overzichten beschrijving van de testen