-- Query para selecionar equipes de F1, filtrando por teamname ou licensedin
select cnum as DriverCod,
       Drivername,
       Nationality,
       Raceentries,
       Racestarts,
       Polepositions,
       Racewins,
       Podiums,
       Fastestlaps,
       Points
from f1drivers
WHERE
    ($1::text IS NULL OR Drivername ILIKE $1) AND -- <--- Com ::text aqui
    ($2::text IS NULL OR Nationality ILIKE $2)  -- <--- E com ::text aqui
;