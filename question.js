const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function moveNoButton() {
  const card = document.querySelector(".card");
  const rect = card.getBoundingClientRect();

  // area “sicura” dentro la card
  const padding = 24;
  const minX = rect.left + padding;
  const maxX = rect.right - padding - noBtn.offsetWidth;
  const minY = rect.top + padding + 90;
  const maxY = rect.bottom - padding - noBtn.offsetHeight;

  const x = clamp(
    minX + Math.random() * (maxX - minX),
    minX,
    maxX
  );
  const y = clamp(
    minY + Math.random() * (maxY - minY),
    minY,
    maxY
  );

  // posizionamento assoluto nel viewport
  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noBtn.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }],
    { duration: 220, easing: "ease-out" }
  );
}

// Scappa quando provi ad avvicinarti / cliccarlo
["mouseenter", "pointerenter", "pointerdown", "touchstart"].forEach((evt) => {
  noBtn.addEventListener(evt, (e) => {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });
});

// Fallback: ogni tanto si muove da solo, giusto per essere vivo
setInterval(() => {
  if (document.hasFocus()) moveNoButton();
}, 3800);

yesBtn.addEventListener("click", () => {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "./recap.html";
  }, 380);
});

// prima “finta” fuga
setTimeout(moveNoButton, 500);
