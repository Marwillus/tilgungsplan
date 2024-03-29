# Tilgungsplan Rechner

Coding Challenge für S-Comm

## Userstory:

Als Sparkassenkunde möchte ich einen Tilgungsplan für Kredite berechnen können, damit ich den Verlauf meines Darlehens besser verstehen kann.

---

### Akzeptanzkriterien:

- Der Nutzer kann Darlehensbetrag, Sollzinssatz und anfängliche Tilgung (%) eingeben

- Optional: Der Nutzer kann eine Zinsbindungsdauer zwischen 1 - 30 Jahren wählen

- Mit Klick auf den Button “Berechnen” werden dem Nutzer die monatliche Rate und optional die Restschuld am Ende der Zinsbindung angezeigt

- Weiterhin wird ein Tilgungsplan mit jährlicher Aufgliederung von Jahr, Rate, Zinsanteil, Tilgungsanteil und Restschuld angezeigt

- Bei Änderung der Eingabeparameter wird die Berechnung automatisch aktualisiert

- Der Tilgungsrechner ist sowohl mobil als auch per Desktop System verwendbar

---

 ### Ergänzende Informationen:

- Die Umsetzung soll frontendseitig mittels ReactJS und MUI erfolgen

- Die Berechnung soll im Backend erfolgen und mit NestJS, ExpressJS oder innerhalb NextJS realisiert werden

- Der entstandene Code soll problemlos auch auf Systemen anderer Entwickler lauffähig sein

- Die Berechnung kann anhand von: https://finanzrechner-tilgung.faz.net/rechner3/faz/tilgungsrechner/?AspxAutoDetectCookieSupport=1 überprüft werden

- Die Implementierung kann in Teilen prototypenhaft erfolgen, soll aber wesentliche Programmier-/Architekturkonzepte erkennen lassen. Abkürzungen sollten erkennbar sein und gern erläutert werden.

- Das Arbeitsergebnis muss inklusive dem Sourcecode komplett bereitgestellt werden



## Dev-Note

### Backend

- erweitern um Validation
- interfaces global speichern - SPOT

### Frontend

- nextJS vorteile hab ich fast gar nicht ausgespielt, ist quasi ne React App im NextJS Mantel
- auto result refresh nicht eingebaut. Am besten mit delayed fetching bei handleInputChange
- mobile view nicht optimal, optimierung möglich
- wollte tilgung in % oder € ermöglichen, aufgrund von Zeitmangel gestrichen
- repaymentContext vielleicht nicht unbedingt möglich, wäre mit anderer komponentenstruktur auch händelbar gewesen
- theming (color, fonts..) fehlt
- SEO, Accessibility und andere Themen nur angekratzt, war nicht im Scope

### Docker

- die erzeugten Images sind noch namenlos. 