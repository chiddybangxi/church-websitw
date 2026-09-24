const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");

function applyTheme(dark) {
  body.classList.toggle("dark", dark);
  themeIcon.textContent = dark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", dark ? "Switch to day mode" : "Switch to night mode");
  localStorage.setItem("stGeorgesTheme", dark ? "dark" : "light");
}
applyTheme(localStorage.getItem("stGeorgesTheme") === "dark");
themeToggle.addEventListener("click", () => applyTheme(!body.classList.contains("dark")));

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const slides = [...document.querySelectorAll(".hero-slide")];
const dotsWrap = document.getElementById("dots");
let current = 0;
let timer;

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
  dot.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(dot);
});
const dots = [...dotsWrap.children];

function goTo(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle("active", i === current));
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
  resetTimer();
}
function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), 6000);
}
document.getElementById("prevSlide").addEventListener("click", () => goTo(current - 1));
document.getElementById("nextSlide").addEventListener("click", () => goTo(current + 1));
resetTimer();

const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");
form.addEventListener("submit", e => {
  e.preventDefault();
  message.textContent = "Thank you — your message is ready to be connected to the church email system.";
  form.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
