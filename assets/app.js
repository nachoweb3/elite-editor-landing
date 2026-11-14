// Elite Editor · landing estática
// Construida en www.codigoelite.eu por nacho_web3

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** 3D parallax for the editor mock. */
const stage = document.getElementById("stage");
const stageInner = document.getElementById("stageInner");

if (stage && stageInner && !reduceMotion) {
	let frame = 0;

	stage.addEventListener("pointermove", (event) => {
		if (frame) return;
		frame = requestAnimationFrame(() => {
			frame = 0;
			const rect = stage.getBoundingClientRect();
			const x = (event.clientX - rect.left) / rect.width - 0.5;
			const y = (event.clientY - rect.top) / rect.height - 0.5;
			stageInner.style.transform = `rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg)`;
		});
	});

	stage.addEventListener("pointerleave", () => {
		stageInner.style.transform = "";
	});
}

/** Subtle tilt on feature cards. */
document.querySelectorAll(".tilt").forEach((card) => {
	if (reduceMotion) return;

	card.addEventListener("pointermove", (event) => {
		const rect = card.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width - 0.5;
		const y = (event.clientY - rect.top) / rect.height - 0.5;
		card.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
	});

	card.addEventListener("pointerleave", () => {
		card.style.transform = "";
	});
});

/** Copy the local command. */
document.querySelectorAll("[data-copy]").forEach((button) => {
	button.addEventListener("click", async () => {
		const label = button.querySelector("span");
		const value = button.dataset.copy ?? "";
		try {
			await navigator.clipboard.writeText(value);
			if (label) {
				label.textContent = "copiado";
				setTimeout(() => {
					label.textContent = "copiar";
				}, 2000);
			}
		} catch {
			if (label) label.textContent = "selecciona el texto";
		}
	});
});
