const canvas = document.querySelector("#particle-stage");
const ctx = canvas.getContext("2d");
const nav = document.querySelector("#site-nav");
const menuButton = document.querySelector(".menu-button");
const chatWidget = document.querySelector("#chat-widget");
const toast = document.querySelector("#toast");
const serviceDetail = document.querySelector("#service-detail");
const roleField = document.querySelector("#role-field");

let particles = [];
const pointer = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.min(150, Math.max(56, Math.floor((canvas.width * canvas.height) / 11500)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 0.42 - 0.21,
    vy: Math.random() * 0.42 - 0.21,
    r: Math.random() * 2.2 + 0.8,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height * 0.22, 20, canvas.width / 2, canvas.height * 0.22, canvas.width);
  gradient.addColorStop(0, "rgba(22, 132, 255, 0.18)");
  gradient.addColorStop(1, "rgba(2, 6, 18, 0.04)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

    if (pointer.x !== null) {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const distance = Math.hypot(dx, dy) || 1;
      if (distance < 180) {
        const push = (180 - distance) / 180;
        particle.x -= (dx / distance) * push * 2.4;
        particle.y -= (dy / distance) * push * 2.4;
      }
    }

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(57, 220, 255, 0.78)";
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = dx * dx + dy * dy;
      if (distance < 9800) {
        ctx.strokeStyle = `rgba(22, 132, 255, ${1 - distance / 9800})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -10}deg) rotateY(${x * 12}deg) translateY(-6px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

document.querySelectorAll(".service-wheel button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".service-wheel button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    serviceDetail.textContent = `${button.dataset.service}: ${button.dataset.copy}`;
  });
});

const sceneObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.28 },
);

document.querySelectorAll("[data-scene]").forEach((scene) => sceneObserver.observe(scene));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = "true";
      const textValue = entry.target.dataset.text;
      if (textValue) {
        window.setTimeout(() => {
          entry.target.textContent = textValue;
        }, 520);
        return;
      }

      const target = Number(entry.target.dataset.count);
      const suffix = entry.target.dataset.suffix || "";
      const started = performance.now();
      const duration = 1300;

      function tick(now) {
        const progress = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        entry.target.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  },
  { threshold: 0.55 },
);

document.querySelectorAll("[data-count], [data-text]").forEach((counter) => countObserver.observe(counter));

document.querySelectorAll("[data-open-chat]").forEach((button) => {
  button.addEventListener("click", () => chatWidget.classList.add("open"));
});

document.querySelector("[data-close-chat]").addEventListener("click", () => {
  chatWidget.classList.remove("open");
});

document.querySelector("#chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#chat-input");
  const messages = document.querySelector("#chat-messages");
  const value = input.value.trim();
  if (!value) return;

  messages.insertAdjacentHTML("beforeend", `<p class="user">${value}</p>`);
  input.value = "";
  window.setTimeout(() => {
    messages.insertAdjacentHTML(
      "beforeend",
      '<p class="bot">Gracias. Puedo canalizarte a reclutamiento, solicitud de personal o informacion de telecomunicaciones. Deja tus datos en contacto para seguimiento.</p>',
    );
    messages.scrollTop = messages.scrollHeight;
  }, 380);
});

document.querySelectorAll("[data-fill-role]").forEach((button) => {
  button.addEventListener("click", () => {
    roleField.value = button.dataset.fillRole;
    document.querySelector("#contact-form").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("Solicitud recibida en el prototipo. Lista para conectar al CRM.");
  event.currentTarget.reset();
});

window.addEventListener("resize", resizeCanvas);
window.addEventListener("mousemove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});
window.addEventListener("mouseout", () => {
  pointer.x = null;
  pointer.y = null;
});

resizeCanvas();
drawParticles();
