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
