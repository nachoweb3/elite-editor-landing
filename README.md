# Elite Editor · landing

Página de presentación de **Elite Editor** en beta abierta y gratuita.

Construida en [www.codigoelite.eu](https://www.codigoelite.eu) por **nacho_web3**.

## Qué es

Sitio estático sin build: `index.html`, `assets/styles.css` y `assets/app.js`.
Se publica tal cual con GitHub Pages (rama `main`, raíz del repositorio).

- Tipografía: Sora (display), Instrument Serif (acento) y JetBrains Mono (etiquetas).
- Animación: entrada del hero, marquesina, brillo del titular, lluvia de escaneo,
  paralaje 3D con el puntero y tarjetas con inclinación.
- Accesibilidad: respeta `prefers-reduced-motion`; el contenido es visible sin
  depender de JavaScript ni de animaciones de scroll.

## Ver en local

```bash
python -m http.server 4173
# o
npx serve .
```

Abre `http://127.0.0.1:4173/`.

## Publicar una versión nueva del editor

1. Crea la release con los tres ZIP de descarga: `elite-editor-windows-standalone.zip`,
   `elite-editor-macos-standalone.zip` y `elite-editor-linux-standalone.zip`.
2. Déjala como **latest**. Si la marcas como *pre-release*, GitHub la excluye de
   `/releases/latest` y los botones seguirían descargando la anterior.
3. No hay que tocar el HTML: los botones apuntan a `releases/latest/download/...` y el
   peso de cada paquete se lee de la API de GitHub al cargar la página.

## Publicación

GitHub Pages sirve la rama `main` desde la raíz. El archivo `.nojekyll` evita
que Jekyll procese el sitio.

URL: <https://nachoweb3.github.io/elite-editor-landing/>

## Créditos

- Herramienta: **nacho_web3** · [codigoelite.eu](https://www.codigoelite.eu)
- Base del editor: [OpenCut](https://github.com/OpenCut-app/OpenCut) y
  [Open Generative AI](https://github.com/Anil-matcha/Open-Generative-AI)
