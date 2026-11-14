# Elite Editor · landing pública

La presentación publicada en GitHub Pages se genera desde la página actual del editor.

- Sitio: https://nachoweb3.github.io/elite-editor-landing/
- Código actual: https://github.com/nachoweb3/elite-editor
- Generador: `scripts/export-landing.mjs` en el repositorio del editor.

Desde el checkout del editor, ejecutar:

```powershell
node scripts/export-landing.mjs ../Elite-Editor-landing
```

Después revisar y subir `index.html` y `assets/landing-current.css` en este repositorio.
Pages publica `main` desde la raíz. La etiqueta HTML `elite-editor-revision` identifica
la revisión fuente publicada. El acceso al editor abre `http://127.0.0.1:5181/projects`
cuando el programa está arrancado en el equipo del visitante. GitHub Pages no aloja el
backend de edición ni los modelos de IA.

Los paquetes de la release v0.2.0-beta son anteriores a esta actualización del código;
no se actualizan al publicar la landing. La página ofrece la instalación del código
actual y etiqueta por separado los paquetes anteriores.

Created totally free by @nacho_web3. Innovation is our flag.
