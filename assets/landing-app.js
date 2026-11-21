// Comportamiento de la landing estática, sin dependencias del editor.

const releaseLink = document.querySelector("[data-release-link]");
const releaseStatus = document.querySelector("[data-release-status]");
const megabytes = new Intl.NumberFormat("es", { maximumFractionDigits: 1 });

if (releaseLink && releaseStatus) {
	const repository = "https://github.com/nachoweb3/elite-editor";
	const releasesPage = `${repository}/releases`;
	const tag = releaseLink.dataset.releaseTag;
	const releasesApi = `https://api.github.com/repos/nachoweb3/elite-editor/releases/tags/${encodeURIComponent(tag)}`;
	const isWindowsZip = (name) => /(?:^|[._-])(?:windows|win)[._-]?(?:x64|amd64|x86_64|64)(?=[._-]|$).*\.zip$/i.test(name);

	async function updateRelease() {
		try {
			const response = await fetch(releasesApi, {
				headers: { Accept: "application/vnd.github+json" },
				signal: AbortSignal.timeout(5000),
			});
			if (!response.ok) throw new Error(String(response.status));
			const release = await response.json();
			if (release.tag_name !== tag || !release.published_at || release.draft) return;
			const version = `${release.prerelease ? "Prelanzamiento" : "Versión"} ${release.tag_name}`;
			const asset = release.assets?.find((item) => item.size > 0 && isWindowsZip(item.name)
				&& item.browser_download_url?.startsWith(`${releasesPage}/download/`));
			if (asset) {
				releaseLink.href = asset.browser_download_url;
				releaseLink.textContent = "Descargar ZIP para Windows →";
				releaseStatus.textContent = `${version} · ${megabytes.format(asset.size / 1e6)} MB. Descomprime el ZIP en una carpeta.`;
				return;
			}
			releaseLink.href = `${releasesPage}/tag/${encodeURIComponent(tag)}`;
			releaseLink.textContent = "Ver versión y código fuente →";
			releaseStatus.textContent = `${version} · sin paquete preparado para Windows x64.`;
		} catch {
			releaseStatus.textContent = "No se pudo consultar GitHub. El enlace directo sigue disponible.";
		}
	}

	void updateRelease();
}

const menuButton = document.querySelector(".lp-menu-btn");
const menu = document.getElementById("lp-mobile-menu");

if (menuButton && menu) {
	const desktop = window.matchMedia("(min-width: 1120px)");
	const setOpen = (open) => {
		menu.hidden = !open;
		menuButton.setAttribute("aria-expanded", String(open));
		menuButton.setAttribute("aria-label", `${open ? "Cerrar" : "Abrir"} menú de navegación`);
	};
	menuButton.addEventListener("click", () => {
		const open = menu.hidden;
		setOpen(open);
		if (open) menu.querySelector("a")?.focus();
	});
	menu.addEventListener("click", (event) => {
		const link = event.target.closest("a");
		if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		setOpen(false);
		if (!link.getAttribute("href").startsWith("#")) return;
		const section = document.getElementById(link.hash.slice(1));
		const heading = section?.querySelector("h2, h3") ?? section;
		if (heading) {
			event.preventDefault();
			if (location.hash !== link.hash) history.pushState(null, "", link.hash);
			heading.tabIndex = -1;
			heading.focus({ preventScroll: true });
			section.scrollIntoView();
		}
	});
	const closeOutside = (event) => {
		if (!menu.hidden && !menu.contains(event.target) && !menuButton.contains(event.target)) setOpen(false);
	};
	document.addEventListener("pointerdown", closeOutside);
	document.addEventListener("focusin", closeOutside);
	document.addEventListener("keydown", (event) => {
		if (event.key !== "Escape" || menu.hidden) return;
		event.preventDefault();
		setOpen(false);
		menuButton.focus();
	});
	desktop.addEventListener("change", ({ matches }) => {
		if (!matches) return;
		const hadFocus = menu.contains(document.activeElement) || document.activeElement === menuButton;
		setOpen(false);
		if (hadFocus) document.querySelector(".lp-links a")?.focus();
	});
}

const engine = document.querySelector("[data-engine-state]");

if (engine) {
	const label = engine.querySelector("[data-engine-label]");
	const check = engine.querySelector("[data-engine-check]");
	const studioLink = document.querySelector("[data-studio-url]");
	const entryLinks = document.querySelectorAll("[data-studio-entry]");
	const render = (state, message, studioUrl) => {
		engine.dataset.engineState = state;
		label.textContent = message;
		check.disabled = state === "checking";
		studioLink.hidden = !studioUrl;
		if (studioUrl) studioLink.href = studioUrl;
		entryLinks.forEach((entry) => {
			entry.setAttribute("href", studioUrl || "#abrir-editor");
			const entryLabel = entry.querySelector("[data-studio-entry-label]");
			if (entryLabel) entryLabel.textContent = studioUrl ? "Abrir Studio automático" : "Obtener Studio automático";
			if (studioUrl) {
				entry.target = "_blank";
				entry.rel = "noreferrer";
			} else {
				entry.removeAttribute("target");
				entry.removeAttribute("rel");
			}
		});
	};
	check.hidden = false;
	check.addEventListener("click", async () => {
		render("checking", "comprobando…");
		try {
			const results = await Promise.all([5173, 5174, 5175].map(async (port) => {
				try {
					const origin = `http://127.0.0.1:${port}`;
					const response = await fetch(`${origin}/api/health`, {
						cache: "no-store", credentials: "omit", signal: AbortSignal.timeout(4200),
					});
					if (!response.ok) return null;
					const data = await response.json();
					if (data.edition !== "studio" || data.launcher !== "standalone" || !["ok", "degraded"].includes(data.status)) return null;
					return { ...data, studioUrl: `${origin}/?workspace=automatic` };
				} catch {
					return null;
				}
			}));
			const ready = results.find(Boolean);
			if (!ready) throw new Error("No hay un Studio compatible abierto");
			const { status, version, ffmpeg, studioUrl } = ready;
			const running = `motor en marcha${version ? ` · v${version}` : ""}`;
			if (status === "degraded" || ffmpeg === false) {
				render("degraded", `${running}. Añade FFmpeg al PATH y reinicia el estudio para exportar.`, studioUrl);
			} else {
				render("on", running, studioUrl);
			}
		} catch {
			render("off", "Abre INICIAR_ESTUDIO.cmd y vuelve a comprobar. Si tu navegador solicita acceso a la red local, permítelo.");
		} finally {
			check.textContent = "Volver a comprobar";
		}
	});
}

const transcript = document.querySelector("[data-transcript]");

if (transcript) {
	const lines = [...transcript.querySelectorAll(".lp-line")];
	const options = transcript.querySelector("[data-demo-actions]");
	const suggest = options.querySelector("[data-demo-suggest]");
	const undo = options.querySelector("[data-demo-undo]");
	const reset = options.querySelector("[data-demo-reset]");
	const total = transcript.querySelector("[data-demo-total]");
	const bar = transcript.querySelector("[data-demo-bar]");
	const preview = transcript.querySelector(".demo-screen");
	const caption = transcript.querySelector("[data-demo-caption]");
	const clock = transcript.querySelector("[data-demo-clock]");
	const track = transcript.querySelector("[data-demo-track]");
	const scrub = transcript.querySelector("[data-demo-scrub]");
	const play = transcript.querySelector("[data-demo-play]");
	const duration = (line) => Number(line.dataset.duration);
	const base = lines.reduce((sum, line) => sum + duration(line), 0);
	const suggested = lines.filter((line) => line.querySelector("mark"));
	const seconds = new Intl.NumberFormat("es", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
	const history = [];
	let removed = new Set();
	let keptLines = [];
	let kept = base;
	let position = 0;
	let frame = null;
	let started = 0;
	let activeLine;
	const segments = lines.map((line, index) => {
		const clip = document.createElement("button");
		clip.type = "button";
		clip.className = "demo-segment";
		clip.textContent = String(index + 1).padStart(2, "0");
		clip.setAttribute("aria-label", `Ir a la frase ${index + 1}`);
		clip.style.flexGrow = duration(line);
		clip.style.flexBasis = "0";
		clip.addEventListener("click", () => {
			pause();
			const segment = keptLines.find((item) => item.line === line);
			if (segment) seek(segment.start);
		});
		track.append(clip);
		return clip;
	});

	function timecode(value) {
		const tenths = Math.round(value * 10);
		return `${String(Math.floor(tenths / 600)).padStart(2, "0")}:${String(Math.floor(tenths / 10) % 60).padStart(2, "0")},${tenths % 10}`;
	}

	function seek(value) {
		position = Math.min(kept, Math.max(0, value));
		const current = keptLines.find((item) => position < item.start + duration(item.line)) ?? keptLines.at(-1);
		if (activeLine !== current?.line) {
			activeLine = current?.line;
			caption.textContent = activeLine?.querySelector("span").textContent ?? "Recupera una frase para continuar.";
			preview.style.setProperty("--demo-pan", `${42 + (current?.index ?? 0) * 6}%`);
			lines.forEach((line, index) => {
				line.toggleAttribute("data-current", line === current?.line);
				segments[index].setAttribute("aria-current", String(line === current?.line));
			});
		}
		const reading = `${timecode(position)} / ${timecode(kept)}`;
		if (clock.textContent !== reading || !scrub.hasAttribute("aria-valuetext")) {
			clock.textContent = reading;
			scrub.value = String(position);
			scrub.setAttribute("aria-valuetext", `${seconds.format(position)} de ${seconds.format(kept)} segundos`);
		}
		track.style.setProperty("--demo-progress", `${kept ? 100 * position / kept : 0}%`);
	}

	function pause() {
		if (frame !== null) cancelAnimationFrame(frame);
		frame = null;
		play.setAttribute("aria-label", "Reproducir demostración");
		play.firstElementChild.textContent = "▶";
	}

	function animate(now) {
		seek((now - started) / 1000);
		if (position >= kept) pause();
		else frame = requestAnimationFrame(animate);
	}

	play.addEventListener("click", () => {
		if (frame !== null) return pause();
		if (!kept) return;
		if (position >= kept) seek(0);
		started = performance.now() - position * 1000;
		play.setAttribute("aria-label", "Pausar demostración");
		play.firstElementChild.textContent = "Ⅱ";
		frame = requestAnimationFrame(animate);
	});
	scrub.addEventListener("input", () => {
		pause();
		seek(Number(scrub.value));
	});

	const render = () => {
		pause();
		keptLines = [];
		kept = 0;
		lines.forEach((line, index) => {
			const cut = removed.has(line);
			line.setAttribute("aria-pressed", String(cut));
			segments[index].hidden = cut;
			if (cut) return;
			keptLines.push({ line, index, start: kept });
			kept += duration(line);
		});
		const count = removed.size;
		const saved = Math.max(0, base - kept);
		total.textContent = `${count} ${count === 1 ? "frase" : "frases"} fuera · ${seconds.format(saved)} s menos de ${seconds.format(base)} s · quedan ${seconds.format(kept)} s`;
		bar.style.width = `${base ? (kept / base) * 100 : 0}%`;
		suggest.setAttribute("aria-disabled", String(suggested.every((line) => removed.has(line))));
		undo.setAttribute("aria-disabled", String(!history.length));
		reset.setAttribute("aria-disabled", String(!count));
		play.disabled = !kept;
		scrub.disabled = !kept;
		scrub.max = String(kept);
		track.toggleAttribute("data-empty", !kept);
		seek(position);
	};
	const apply = (next) => {
		history.push(removed);
		removed = next;
		render();
	};
	lines.forEach((line) => line.addEventListener("click", () => {
		const next = new Set(removed);
		if (!next.delete(line)) next.add(line);
		apply(next);
	}));
	suggest.addEventListener("click", () => {
		if (suggested.some((line) => !removed.has(line))) apply(new Set([...removed, ...suggested]));
	});
	undo.addEventListener("click", () => {
		if (!history.length) return;
		removed = history.pop();
		render();
	});
	reset.addEventListener("click", () => {
		if (removed.size) apply(new Set());
	});
	options.hidden = false;
	play.hidden = false;
	scrub.hidden = false;
	render();
}
