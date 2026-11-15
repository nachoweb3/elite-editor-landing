# Elite Editor · web pública

Landing: https://nachoweb3.github.io/elite-editor-landing/
Editor: https://nachoweb3.github.io/elite-editor-landing/editor/#/projects
Código: https://github.com/nachoweb3/elite-editor

El editor se ejecuta en el navegador y guarda proyectos en IndexedDB/OPFS.
Los botones de la landing abren el editor web directamente, sin depender de localhost.
La automatización FFmpeg y los servicios con claves privadas requieren la versión local.

Para actualizar, desde el repositorio del editor:

```powershell
node scripts/export-landing.mjs ../Elite-Editor-landing
node scripts/build-browser-editor.mjs ../Elite-Editor-landing/editor
```

El build necesita las dependencias del editor, contenido generado y FFmpeg/ffprobe
para indexar los packs de sonido públicos. Solo copia los packs CC0 incluidos en
el código; no publica bibliotecas privadas, claves ni proyectos del autor.

La sección `#novedades`, sus estilos `.lp-ai-*` y las imágenes `assets/demo-*.webp`
son manuales: consérvalos al reexportar la landing.

Subir los cambios y esperar al despliegue Pages. Verificar el enlace de inicio,
crear un proyecto, añadir un elemento, recargar y exportar una prueba corta.
Los ZIP v0.2.0-beta son paquetes anteriores, independientes de la versión web.

Created totally free by @nacho_web3. Innovation is our flag.
