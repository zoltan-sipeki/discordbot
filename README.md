Discord bot

A bot két parancsra reagál:

    !tournaments
    !clan <name1 name2 ...> [limit]

Az 1. parancs kilistázza az elkövetkező League of Legends bajnokságokat (név, meddig lehet rá regisztrálni, mikor kezdődik). A Riot API-t használja.

A 2. parancs kilistázza azokat a Clash of Clans klánokat (név, szint, pontok, meccsek száma (nyert, döntetlen, bukott), nyerési arány, tagok száma, ország), amiknek a nevében szerepel a name1, name2 ... szavak (ezeknek a megadása kötelező). A limit paraméter szabályozza, hogy mennyit írjon ki. Ha üresen van hagyva, az alapértelmezett érték 5. Pl.: !clan greatest of all time 2. A CoC API-t használja.
