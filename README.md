# Huilén · Bailes del conjunto (PWA) — v1.1.0

## Archivos (súbelos todos a la raíz del repo)
index.html, manifest.json, sw.js, logo.png, favicon.png, apple-touch-icon.png,
icon-192.png, icon-512.png, icon-maskable-512.png, README.md
(el antiguo icon.svg ya no se usa; puedes borrarlo del repo)

## Cloudinary: un cambio necesario para las fotos
Settings > Upload > Upload presets > `videos_bailes` > pestaña "Optimize and Deliver" >
**Allowed formats**: `mp4, mov, webm, jpg, jpeg, png, webp` > Save.

## Firebase
Sin cambios. Los bailes antiguos siguen funcionando: aparecen en "Sin cuadro"
hasta que los edites (Editar baile > escribe el cuadro > Guardar).

## v1.2.0: fotos del vestuario
Las 51 fotos van en la raíz del repo, junto a index.html (sin carpeta).
1. Descomprime `fotos-vestuario.zip`: quedan 51 imágenes sueltas (.jpg), sin carpeta.
2. En GitHub: Add file > Upload files, selecciona las 51 imágenes y haz commit.
3. Las fotos son livianas (unos 2,5 MB en total).

Si cambian una prenda en el Word, avísame y regenero los datos.

## v1.3.0: vestuario editable (cambio necesario en Firebase)
Firestore > Reglas: agrega este bloque (junto al de `bailes`, sin borrar nada más) y publica:
```
match /vestuario/{id} { allow read: if true; allow write: if request.auth != null; }
```
Sin esa regla, la app muestra el vestuario base pero no deja guardar ni editar prendas.

Primer uso: entra con Ingreso admin, abre cualquier cuadro > Vestuario y toca
"Guardar vestuario base en la app" (una sola vez). Desde ahí puedes agregar, editar y eliminar prendas.
Las fotos nuevas se suben a Cloudinary (el preset ya permite imágenes).
