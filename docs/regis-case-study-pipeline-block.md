# Bloc `pipeline:` de l'etape 3 de Regis, retire le 2026-09-07

Le bloc (`components/case-study-blocks/pipeline.tsx`) reste dans le code. Retire de
`content/case-studies/regis-v2.md` parce que les cinq cartes ne tiennent pas sur une
ligne dans le viewport de Jonathan : a retravailler (moins de cartes, ou deux rangees
de trois, ou une version sans les tables) avant de le remettre, juste apres l'intro de
l'etape 3. Texte a reinserer tel quel :

```
pipeline:
- **Sets up a property and its lease** once | bien; bail; personne; compte_bancaire
->
- **Bank lines arrive, already sorted** automatic | transaction; iban_interne; echeance; regle; saisie_assistee
-> lettrage
- **Validates each ledger entry** one click | depense; revenu; activite
-> document_ecriture
- **Invoices enrich the entries** when they arrive | document; consommation_ia
->
- **Exports the tax return per property** every year | categorie_depense; no table, computed from the entries
= Top of each card, what the landlord does. Under the line, the tables that step writes, and the link to the next.

```
