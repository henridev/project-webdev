# frontend webdevelopment project

een Reactapp geschreven in Typescript die het kaartspel "What do you meme" online brengt

## requirements

- ✅ een werkendeweb applicatie
- ✅ Reactfrontend
- ✅ login systeem
- ✅ meerdereAPI calls(naast de login / register)
- ✅ best practices toepassen
  - 🛑 degelijke foutboodschappen bij falende HTTP requests
  - ✅ splitsen van components
  - ✅ hooks
- ✅ meerdere components(naast login / register)
- ✅ minstens één form met validatie(naast login / register)
- ✅ routing met minstens 2 pagina’s(naast login / register)
- 🛑 responsive en een degelijkestijl
- ✅ extra technologie => typescript, websockets, chakra
- ✅ een aantal niet triviale testen(unit en/of e2een/of ui)
- ✅ goede README.md’s op de github repositories
- ✅ de applicatie dient online te draaien

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

### Gebruik

de api kan op zich gebruikt worden op voorwaarde dat een gebruiker eerste een account aanmaakt. Voor een account is een gebruikersnaam, email en passwoord vereist.
De gemakkelijkste manier om uit te proberen is via postman

### Links

- [link naar webpagina](https://henridev.github.io/frontendweb-thomas-2122-henri-de-bel/index.html)
