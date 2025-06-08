-- Query para selecionar equipes de F1, filtrando por teamname ou licensedin
select cnum as TeamCod,
           teamname,
           Licensedin,
           RacesEntered,
           RacesStarted,
           Drivers,
           Wins,
           Points,
           Poles,
           FastedLaps,
           Podiums
  from f1teams
WHERE
    ($1::text IS NULL OR teamname ILIKE $1) AND -- <--- Com ::text aqui
    ($2::text IS NULL OR licensedin ILIKE $2);  -- <--- E com ::text aqui