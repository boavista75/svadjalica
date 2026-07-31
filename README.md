# Svadjalica

Staticka PWA aplikacija za GitHub Pages.

## Sta radi

- prikazuje poslednji sacuvani datum svadje
- racuna koliko je dana proslo od tog datuma do danas
- dugme `UNESI NOVU SVADJU :(` postavlja danasnji datum kao novi pocetak
- cuva datum lokalno u browseru preko `localStorage`
- moze da se instalira kao PWA aplikacija

Pocetni datum je `04.03.2026`.

## Lokalno pokretanje

Za lokalni pregled pokreni jednostavan staticki server iz korena projekta, na primer:

```powershell
py -m http.server 8080
```

Zatim otvori `http://localhost:8080`.
