/* ---------- 自动年份 ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- 粒子背景 ---------- */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
const COLORS = ['#ff4d4d', '#ffd93b', '#6bcb77', '#4dd0e1', '#4d7cff', '#b061ff'];
const PARTICLE_COUNT = 70;
const LINK_DIST = 140;

const mouse = { x: -9999, y: -9999 };

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseout', () => { mouse.x = -9999; mouse.y = -9999; });

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }
}
initParticles();

function draw() {
  ctx.clearRect(0, 0, W, H);

  // 粒子运动 + 边界回弹
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    // 鼠标轻微吸引
    const dx = mouse.x - p.x, dy = mouse.y - p.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 160) {
      p.x += dx * 0.012;
      p.y += dy * 0.012;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 0.8;
    ctx.fill();
  });

  // 连线
  ctx.globalAlpha = 1;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < LINK_DIST) {
        ctx.strokeStyle = a.color;
        ctx.globalAlpha = (1 - d / LINK_DIST) * 0.25;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

/* ---------- 卡片轻微倾斜 ---------- */
document.querySelectorAll('.card, .project').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `translateY(-6px) perspective(600px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});
