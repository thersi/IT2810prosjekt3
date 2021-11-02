# Innhold og Funksjonalitet:

Gruppen har laget en SPA som er en prototype på en søkbar katalog av filmer. Databasen består av 26 filmer, og er satt opp med MongoDB. Søk i databasen er lagt opp til å håndtere store resultater med at den har støtte for å bla mellom sider i søkeresultatet. Dataen som hentes ut av databasen skjer **_dynamisk_**, der det bare hentes ut data om filmene som vises på siden. Dette er gjort for å unngå kostbare databasekall som henter ut mer informasjon fra databasen enn hva som er nødvendig. Det er gjort ved hjelp av spørringer i GraphQL i backend.

Frontend i websiden gir støtte for å **_søke_** etter en tittel gjennom søkefeltet øverst på siden. Søkeresultetet vil gi søkeresultat med alle filmer som inneholder ordet/ordene det er blitt søkt etter. Dersom det ikke er søkt etter noe i søkefeltet vil alle filmer returneres (dynamisk).

Det er også mulig å **_sortere_** søkeresultatet. Dette gjøres ved å trykke på filterknappen ved siden av søkefeltet. Filmene kan sorteres på stigende/synkende utgivelsesår eller tittel. Det er også støtte for å **_filtrere_** søkeresultatet på sjanger. Dette gjøres ved å velge sjanger i nedtrekks menyen. Ved å velge sjanger vil søkeresultatet kun bestå av filmer som inneholder denne sjangeren. Sortering og filtrering skjer på databasenivå gjennom query resolverene på backend. Dette betyr at sorteringen og filtreringen er på **_hele databasesettet_** og ikke bare tilfeldigvis på de filmene som er lastet inn på klienten.

Det er også mulighet for å **_se mer detaljert informasjon_** om hver film. Dette gjøres ved å klikke på en film. Det vil da komme opp et pop-up-vindu med mer detaljert informasjon om filmen. Når en film trykkes på gjøres det et nytt databasekall på den spesifikke filmen som henter ut mer informasjon. Dette vinduet kan lukkes igjen ved å trykke på ‘X’-knappen i øvre høyre hjørne av pop-up'en.

Det er også mulig for en bruker å trykke enten ‘tommel opp’ eller ‘tommel ned’ på en film. Dette vil **_lagres persistent_** på databaseserveren ve hjelp av en GraphQl mutation i backend.

# Krav til bruk av teknologi:

Backend av prosjeket er basert på node.js og NPM. Appen kan kjøres ved å skrive `npm start` fra mappen `backend`. Backend må kjøres på NTNUs nett eller med vpn.

Frontend av prosjektet er basert på Node.js og NPM, og er bygget med react-createapp og med typescript som template. Appen kan kjøres ved å skrive `npm start` fra mappen `frontend/src`. Frontend må kjøres **etter** backend har startet. Testene kjøres fra samme mappe ved å kjøre kommandoen `npm test`.

### State Managment:

Vi har valg å bruke **_Apollo Client_** for håndtering av State Managment. Apollo Client lagrer allerede states på dataen som hentes ut fra databasen i en egen cache. Å kopiere den dataen og å lagre denne i et state Managment-system som Redux eller Mobux vil derfor være overflødig. Det er dårlig praksis da man også må sørge for at Apollo Client og Redux/Mobux må være synkronisert til enhver tid. I tillegg er Apollo Client enklere å bruke, da det ikke krever videre oppsett enn å oprette en ApolloClient med en InMemoryCache. Dette er gjort i App.tsx.

### GraphQL:

Fordelene med GraphQL er at man bare har _et endpint_ og at det dermed blir enklere for teamene som jobber på frontend og backend å samarbeide. Det er også en fordel at man kun henter den informasjonen fra databasen som man trenger. Sammenlignet med et REST-api, der man her flere endepunkter og ofte henter ut mer data enn man trenger.

##### Types:

Databasen inneholder to typer med følgende atributter:

- movie:
  - \_id: ID!
  - title: String!
  - thumbsUp: Int!
  - year: Int!
  - genre: [String!]!
  - actors: [String!]
  - thumbsDown: Int!
  - poster: String!
- SearchResult:
  - movies: [Movie!]
  - pages: Int!

##### Queries:

Under er en liste med queries som er tilgjenglige med GraphQL:

- movieById(id: ID!): Movie
- filterOnGenre(filterGenre: String! limit: Int! page: Int! order: Int!, sortOn: String!): SearchResult!

De ulike argumentene betyr:

- limit - antall elementer pr. side
- page - nr. på siden (starter på 1)
- order - 1 for stigende, -1 for synkende rekkefølge på sorteringen (default = 1)
- sortOn - 'year' for å sortere på årstall, 'title' for å sortere på tittel (default = 'title')
- word - ordet som søkes etter i tittelen
- id - id-en til filmen

##### Mutations:

Det er to mutasjoner som endrer tilstanden på databasen. Disse tar inn en id og øker thumbsUp/thumbsDown med en på "movien" med den gitte id-en

- thumbsUpById(id: ID!): Movie
- thumbsDownById(id: ID!): Movie

### MongoDB:

MongoDB-databasen er satt opp og kjører på en virtuell maskin. Framgangsmøten for å sette opp databasen på virtuell maskin er [her.](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

Som default kan kun maskinen som kjører databasen og api-scriptet redigere på databasen. I vårt tilfellet har dette vært tungvindt. Vi her derfor laget flere brukere i databasen med lese/skriverettigheter. På denne måten kan man redigere databaseinholdet lokalt fra flere maskiner. Framgangsmøten for å få til dett er [her](https://piazza.com/class/ksk8rtnewz56sh?cid=133).

Databasen består av 26 filmer som er skrevet manuelt inn i databasen igjennom MongoDB Compass.

Hver film i databasen har følgende atributter:

- \_id
- title
- thumbsUp
- year
- genre
- actors
- thumbsDown
- poster

### Komponenter og biblioteker:

MUI Material-UI:
gruppen har brukt flere ferdiglagde komponenter fra MUI og Material-UI. Dette er det samme biblioteket, bare at MUI er den nyeste versjonen. Gruppen har likevel valgt å bruke noen komponenter fra den gamle versjonen, siden vi er mest vandt med disse. Komponenter fra MUI/Material-UI er blant annet brukt i komponentene _GenreTabs, MovieAppBar, og MovieDialog_ m.fl. Grunnen for at vi har valgt å bruke komponenter fra disse bibliotekene er fordi de ser pene ut, har god funksjonalitet og det ville vært svært tidkrevende å lage disse selv.

### Responsivt webdesign:

Vi har i hovedsak implementert et responsivt web design ved å bruke @media screen queries i kombinasjon med CSS-Flexbox og meta-taggen 'viewport' i HTML-filen. I tillegg har vi noen plasser brukt MUI-biblotektet til å style komponenter fra MUI. Da har vi brukt styled og useStyle for styling (i SearchBar og MovieDialog) og Grid-komponenter til å plassere komponentene på siden (i MovieDialog). Grunne for at vi noen plasser har valgt denne tilnærmingen framfor vanlig CSS-koding er fordi både stylingen og komponentene da kommer fra samme bibliotek og det er derfor svært lett å jobbe med.

### Universell utforming:

Vi har lagt fokus på universell utforming og basert appen på Erb Content Accessibility Guidelines(WCAG).
Dette kan bli delt inn i 4 delseksjoner: Perceivable, Operable, Understandable og Robust.

##### Perceivable

Informasjon og UI må være presentert på en måte alle kan forstå.
For hver singledisplay komponent, har vi både forklarende tekst i tillegg til bilde av filmen. Her kan brukeren da se ha tilgang til tekst som et alternativ.

##### Operable

UI komponenter og navigasjon må være mulig.
Her har vi tatt i bruk WAI ARIA i AppBar og GenreTabs, dette gjør det mulig å vite hvor komponenter er ved bruk av tastatur. Vi har også et simpel design på siden vår, uten elementer som blinker eller lignende som kan skape en reakson. Vi bruker også sidenummer slik at bare noen få filmer vises samtidig, noe som gjør det lettere for brukeren å ha oversikt og kontroll på elementene.

##### Understandable

Informasjon og operasjon av UI må være forståelig.

Alt av tekst er lett å lese og står i kontrast med bakgrunnsfarger slik at bruker lett kan se hva som står.
Siden vår er også veldig forutsigbar og følger et likt design som sider som IMDB og Netflix, noe som gjør den lettere å navigere.
Vi tar i bruk ikoner som tommel opp/ned og søkeikon for å tydeliggjør viktige funksjoner på siden.

##### Robust

Innhold må være tilgjengelig for en større gruppe brukere.
Siden vår forholder seg til forskjellige skjerm størrelser, noe som gjør at brukere med spesialskjerm fortsatt kan ta i bruk appen.

# Testing:

#### Ende-til-ende:

Vi har skrevet e2e tester ved hjelp av Cypress. Cypress er et testrammeverk som har god støtte for å enkelt kunne skrive ende-til-ende testing. Det er enkelt å sette opp, er godt dokumentert og koden er svært lesbar og forståelig. Dette er årsaken til at vi valgte å bruke Cypress for e2e.

Testene kan kjøres gjennom Cypress-GUIet og i nettleser ved å kjøre kommandoen `npm run cypress:open` fra terminalen i mappen `E2E`, eller de kan kjøres i terminalen ved å kjøre kommandoen `npm run cypres:run`.

Bildet under viser testene som kjøres (her ved `npm run cypress:open`)

<img src="https://gitlab.stud.idi.ntnu.no/it2810-h21/team-37/prosjekt3/-/wikis/uploads/ee70f3558bc61fd3097410316c61175d/Skjermbilde_2021-11-01_kl._22.43.14.png" width="300" />

#### Frontend:

### Cross browser testing

Applikasjonen er testet i nettleserene Chrome og safari med variabel skjermstørrelse, samt på ulike telefoner.
