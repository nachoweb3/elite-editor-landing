# Elite Editor · web pública

Landing: https://nachoweb3.github.io/elite-editor-landing/
Editor: https://nachoweb3.github.io/elite-editor-landing/editor/#/projects
Código: https://github.com/nachoweb3/elite-editor

La entrada principal prepara el estudio automático de Windows. Pulsa **Comprobar**
cuando el lanzador esté abierto para detectar el estudio en el puerto 5173, 5174 o
5175. La opción manual del navegador guarda sus proyectos en IndexedDB/OPFS.

Para actualizar el bundle web desde `Elite-Editor-public`:

```powershell
node scripts/build-browser-editor.mjs ../NACHO_WEB3_AI_VIDEO_STUDIO/github-pages-landing/editor
```

El build necesita las dependencias del editor, contenido generado y FFmpeg/ffprobe
para indexar los packs de sonido públicos. Solo copia los packs CC0 incluidos en
el código; no publica bibliotecas privadas, claves ni proyectos del autor.

Conserva `index.html`, `assets/landing-orbit.css`, `assets/landing-app.js`, las imágenes
`assets/elite-orbit.webp` y `assets/studio-lens.webp` y los respaldos `assets/demo-*.webp` al actualizar
el bundle de `editor/`.

Después de desplegar en Pages, verifica el acceso al estudio automático, el menú
móvil y la demo. En el editor manual, crea un proyecto, recarga y exporta una prueba corta.
El ZIP v0.3.0-beta.5 se publica en GitHub Releases y se enlaza desde la sección de instalación.

Created totally free by @nacho_web3. Innovation is our flag.
