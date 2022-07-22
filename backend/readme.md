# web services project

een Node.js rest api geschreven in Typescript principieel gebruik makend van Koa, Knex en Socket.io.

## requirements

- ✅ werkende REST API in NodeJS
- ✅ domein laag met een zekere complexiteit
- ✅ onderliggende databank => PSQL
- ✅ best practices toepassen
  - ✅ invoervalidatie
  - ✅ degelijke foutboodschappen bij falende HTTP requests
  - ✅ logging
  - ✅ gelaagde applicatie
- ✅ extra technologie => typescript, websockets, swagger
- ✅ meerdere routesmet invoervalidatie
- ✅ degelijke authorisatie / authenticatie op alle routes => JWT
- ✅ een aantal niet triviale unit testen, de routes van minstens één controller moeten volledige test coverage hebben
- ✅ API dient online te draaien

## Info

- hoe start ik de app op ?
- hoe gebruik ik de app ?
- hoe meld ik aan ?
- extra installaties nodig ?

### About

Deze api wordt gebruikt voor de applicatie *what do you meme?* en staat hierbij in voor volgende functionaliteiten.

- authenticatie en authorisatie voor het gebruik van de applicatie
- beheer van vriendshappen onder gebruikers
- gebruikersbeheer door de admin
- beheer van opgeslagen memes door de admin
- beheer van communicatie tussen gebruikers tijdens een spel

### Opstarten

lokaal kan de applicatie snel opstarten het volstaat om volgende stappen te volgen:

1. clone repository lokaal => `git clone [repository-url]`
2. installeer alle vereiste package => `npm i`
3. ssh of powershell naar de rootdirectory van het project
4. indien docker desktop (windows) of docker (linux) al geïnstalleerd is volstaat volgend commando om de database op te starten => `docker-compose up` zoniet installeer je dit eerst en voer je erna het commando uit
5. om de app zelf te starten voer je uit in root directory => `npm run dev`

om de app te gebruiken

### Gebruik

de api kan op zich gebruikt worden op voorwaarde dat een gebruiker eerste een account aanmaakt. Voor een account is een gebruikersnaam, email en passwoord vereist. De gemakkelijkste manier om uit te proberen is via postman. voor de live api kan ingelogd worden als admin met de credentials username `ADMIN` en passwoord `ADMIN`

### Links

- [docker desktop install](https://www.docker.com/products/docker-desktop)
- [api health check](https://webservices-app.herokuapp.com/api/status)
- [api swagger docs](https://webservices-app.herokuapp.com/docs)
