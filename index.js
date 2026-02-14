// Password corretta: 21/11/24 (sequenza: 21 -> 11 -> 24)
const TARGET = ["21", "11", "24"];
let picked = [];

const s1 = document.getElementById("s1");
const s2 = document.getElementById("s2");
const s3 = document.getElementById("s3");
const errorEl = document.getElementById("error");

function render() {
  const slots = [s1, s2, s3];
  for (let i = 0; i < 3; i++) {
    slots[i].textContent = picked[i] ?? "__";
  }
}

function resetAll() {
  picked = [];
  errorEl.hidden = true;
  render();
}

function addValue(v) {
  if (picked.length >= 3) return;
  picked.push(v);
  errorEl.hidden = true;
  render();
}

function isCorrect() {
  if (picked.length !== 3) return false;
  for (let i = 0; i < 3; i++) {
    if (picked[i] !== TARGET[i]) return false;
  }
  return true;
}

document.querySelectorAll(".bubble").forEach((btn) => {
  btn.addEventListener("click", () => {
    addValue(btn.dataset.val);
    // micro feedback
    btn.animate(
      [{ transform: "translate(-50%,-50%) scale(1)" }, { transform: "translate(-50%,-50%) scale(1.08)" }, { transform: "translate(-50%,-50%) scale(1)" }],
      { duration: 220, easing: "ease-out" }
    );
  });
});

document.getElementById("resetBtn").addEventListener("click", resetAll);

document.getElementById("enterBtn").addEventListener("click", () => {
  if (!isCorrect()) {
    errorEl.hidden = false;
    // shake leggero della card
    const card = document.querySelector(".card");
    card.animate(
      [
        { transform: "translateY(0) translateX(0)" },
        { transform: "translateY(0) translateX(-6px)" },
        { transform: "translateY(0) translateX(6px)" },
        { transform: "translateY(0) translateX(-4px)" },
        { transform: "translateY(0) translateX(4px)" },
        { transform: "translateY(0) translateX(0)" }
      ],
      { duration: 420, easing: "ease-out" }
    );
    return;
  }

  // piccola transizione
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "./question.html";
  }, 380);
});

// init
resetAll();
