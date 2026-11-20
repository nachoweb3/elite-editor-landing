# Elite Editor · web pública

Landing: https://nachoweb3.github.io/elite-editor-landing/
Editor: https://nachoweb3.github.io/elite-editor-landing/editor/#/projects
Código: https://github.com/nachoweb3/elite-editor

Los botones principales llevan al estudio automático de Windows en
`http://127.0.0.1:5173/?workspace=automatic`. La landing muestra primero cómo abrirlo
y permite comprobar manualmente si responde el motor. La opción manual del navegador
guarda proyectos en IndexedDB/OPFS.

Para actualizar el bundle web desde `Elite-Editor-public`:

```powershell
node scripts/build-browser-editor.mjs ../NACHO_WEB3_AI_VIDEO_STUDIO/github-pages-landing/editor
```

El build necesita las dependencias del editor, contenido generado y FFmpeg/ffprobe
para indexar los packs de sonido públicos. Solo copia los packs CC0 incluidos en
el código; no publica bibliotecas privadas, claves ni proyectos del autor.

Conserva `index.html`, `assets/landing-current.css`, `assets/landing-app.js` y
las imágenes `assets/demo-*.webp` al actualizar el bundle de `editor/`.

Después de desplegar en Pages, verifica el acceso al estudio automático, el menú
móvil y la demo. En el editor manual, crea un proyecto, recarga y exporta una prueba corta.
El ZIP v0.3.0-beta.1 se publica en GitHub Releases y se enlaza desde la sección de instalación.

Created totally free by @nacho_web3. Innovation is our flag.
