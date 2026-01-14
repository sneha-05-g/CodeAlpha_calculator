const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let current = "";

buttons.forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.textContent));
});

function handleInput(value) {
  if (value === "C") current = "";
  else if (value === "⌫") current = current.slice(0, -1);
  else if (value === "=") calculate();
  else current += value;

  display.textContent = current || "0";
}

function calculate() {
  try {
    current = eval(
      current.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")
    ).toString();
  } catch {
    current = "Error";
  }
}

document.addEventListener("keydown", e => {
  const key = e.key;

  if (!isNaN(key) || key === ".") pressKey(key);
  if (key === "+") pressKey("+");
  if (key === "-") pressKey("−");
  if (key === "*") pressKey("×");
  if (key === "/") pressKey("÷");
  if (key === "Enter") pressKey("=");
  if (key === "Backspace") pressKey("⌫");
  if (key === "Escape") pressKey("C");
});

function pressKey(value) {
  const btn = [...buttons].find(b => b.textContent === value);
  if (btn) {
    btn.classList.add("key-active");
    setTimeout(() => btn.classList.remove("key-active"), 150);
  }
  handleInput(value);
}
