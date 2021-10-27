#### Bruk av Gitlab verktøy (forslag)

## Oppsummering funksjonalitet: 
- Liste med filmer 
- Klikke inn på hver film for å se detaljer 
- Søke på tittel
- Sortere søk alfabetisk og etter utgivelsesår 
- Filtrere søk på sjanger 
- Lagre tommel opp/tommel ned (anonymt)

ISSUES: 
- Kort navn, beskrivelse (med tasks) inni 
- Alle issues skal ha en label open/doing/closed
- Alle issus skal ha minst en label relatert til hva det handler om (backend/frontent/bug etc.)
- Alle commits skal tagges med (#X) der X er issuenummer
- Greiner skal navngis issueX-issuenavn 
    - (resulterer i noen "små" greiner, men er oversiktlig og sørger for at greiner ofte blir merget, og sjeldent ligger mange commits bak master. Unngår mergeconflicts, samt at "viktige deler" ikke ligger lokalt på noens maskin lenge slik at andre må vente med å gjøre sitt fordi de trenger noe fra et visst issue) 

ISSUEBORD:
- "Alle issues"/backlog ligger under `Open`
- Issues som prioriteres å gjøres i "nærmeste framtid" ligger under `TODO`
- Issues der arbeid er påbegynt ligger under `Doing`
- Issues der arbeid er ferdig og avventer merge ligger under `For review`
- Issues der arbeid er merget ligger under `Closed`


MERGE: 
- All merging skjer via Gitlab GUI
- Opprett en mergerequest 
- Vent på at noen andre "reagerer" (f.eks. tommel opp, kommentar, approve)
- Merge (og evt resolve conflicts) i Gitlab 

# Innhold og Funksjonalitet:
Grppen har laget en SPA som er en prototype på en søkbar katalog av filmer. Databasen består av 20?? filmer, og er satt opp med MongoDB. Søk i databasen er lagt opp til å håndtere store resultater med at den har støtte for å bla mellom sider i søkeresultatet. Dataen som hentes ut av databasen skjer dynamisk, der det bare hentes ut data om filmene som vises på siden. Dette er gjort for å unngå kostbare databasekall som henter ut mer informasjon fra databasen enn hva som er nødvendig. Det er gjort ved hjelp av spørringer i GraphQL i backend. 

Frontend i websiden gir støtte for å søke etter en tittel gjennom søkefeltet øverst på siden. Søkeresultetet vil gi søkeresultat med alle filmer som inneholder ordet/ordene det er blitt søkt etter. Dersom det ikke er søkt etter noe i søkefeltet vil alle filmer returneres (dynamisk).

Det er også mulig å sortere søkeresultatet. Dette gjøres ved å trykke på filterknappen ved siden av søkefeltet. Filmene kan sorteres på stigende/synkende utgivelsesår eller tittel. Det er også støtte for å filtrere søkeresultatet på sjanger. Dette gjøres ved velge sjangere i nedtrekks menyen. Med å velge sjangere vil søkeresultatet kun bestå av filmer som inneholder en av de valgte sjangerne. Sortering og filtrering skjer alt på databasenivå. Det betyr sorteringen og filtreringen er på hele databasesettet og ikke bare tilfeldigvis på de filmene som er lastet inn på klienten.

Det er også mulighet for å se mer detaljert informasjon om hver film. Dette gjøres ved å klikke på film. Det vil da komme et pop-up-vindu med mer detaljert informasjon om filmen. Det vil da gjøres et nytt databasekall på den spesifikke filmen som henter ut mer informasjon. Dette vinduet kan lukkes igjen ved å trykke på ‘X’. 

Det er også mulig for en bruker å trykke enten ‘tommel opp’ eller ‘tommel ned’ på en film. Dette vil lagres persistent på databaseserveren ve hjelp av en GraphQl mutation i backend.

# Krav til bruk av teknologi:
Backend av prosjeket er basert på node.js og NPM. Appen kan kjøres ved å skrive npm start fra mappen backend/src. Backend må kjøres på NTNUs nett eller med vpn.

Frontend av prosjektet er basert på Node.js og NPM, og er bygget med react-createapp og med typescript som template. Appen kan kjøres ved å skrive npm start fra mappen frontend/src. Frontend må kjøres etter backend har startet. Testene kjøres fra samme mappe ved å kjøre kommandoen npm test.

## Redux / Mobux:
•	Bruk av state managment enten basert på Redux eller MobX (- eller komponenter som gir samme funksjonalitet)

Les her ang. Redux vs. Apollo-client som vi bruker:
https://piazza.com/class/ksk8rtnewz56sh?cid=139 

## GraphQL:
### Types:

Databasen innehlder bare en type, Movie, som har følgende atributter:
- _id: ID!
- title: String!
- thumbsUp: Int!
- year: Int!
- genre: [String!]!
- actors: [String!]
- thumbsDown: Int!
- poster: String!

### Queries:
Under er en liste med queries som er tilgjenglige med GraphQL:
- movies(limit: Int! page: Int! order: Int! sortOn: String!): [Movie!]!
- containsString(limit: Int! page: Int! word: String! order: Int! sortOn: String!): [Movie!]
- movieById(id: ID!): Movie
- movieByTitle(title: String!): Movie
- filterOnGenre(filterGenre: String! limit: Int! page: Int! order: Int!, sortOn: String!): [Movie!]


De ulike argumentene betyr: 
- limit - antall elementer pr. side
- page - nr. på siden (starter på 1)
- order - 1 for stigende, -1 for synkende rekkefølge på sorteringen (default = 1)
- sortOn - 'year' for å sortere på årstall, 'title' for å sortere på tittel (default = 'year')
- word - ordet som søkes etter i tittelen
- id - id-en til filmen

### Mutations:
Det er to mutasjoner som endrer tilstanden på databasen. Disse tar inn en id og øker thumbsUp/thumbsDown med en på "movien" med den gitte id-en
- thumbsUpById(id: ID!): Movie
- thumbsDownById(id: ID!): Movie

### MongoDB:
- skriv om MongoDB
### Komponenter og biblioteker:
- skriv om MUI og lignende
### Responsivt webdesign:
## Testing:




