#### Bruk av Gitlab verktøy (forslag)

ISSUES: 
- Kort navn, beskrivelse (med tasks) inni 
- Alle issues skal ha en label open/doing/closed
- Alle issus skal ha minst en label relatert til hva det handler om (backend/frontent/bug etc.)
- Alle commits skal tagges med (#X) der X er issuenummer
- Greiner skal navngis issueX-issuenavn 
    - (resulterer i noen "små" greiner, men er oversiktlig og sørger for at greiner ofte blir merget, og sjeldent ligger mange commits bak master. Unngår mergeconflicts, samt at "viktige deler" ikke ligger lokalt på noens maskin lenge slik at andre må vente med å gjøre sitt fordi de trenger noe fra et visst issue) 

MERGE: 
- All merging skjer via Gitlab GUI
- Opprett en mergerequest 
- Vent på at noen andre "reagerer" (f.eks. tommel opp, kommentar, approve)
- Merge (og evt resolve conflicts) i Gitlab 
