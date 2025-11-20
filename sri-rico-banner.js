(() => {
  const initCountdown = (root) => {
    const deadlineStr = root?.dataset?.deadline;
    if (!deadlineStr) return;

    const deadline = new Date(deadlineStr.replace(' ', 'T')); // tolerate "YYYY-MM-DD HH:MM:SS"
    if (isNaN(deadline.getTime())) return;

    const num = (unit) => root.querySelector(`.sri-rico-countdown__num[data-unit="${unit}"]`);
    const units = { days: num('days'), hours: num('hours'), minutes: num('minutes'), seconds: num('seconds') };
    if (!units.days || !units.hours || !units.minutes || !units.seconds) return;

    const pad = (v) => String(v).padStart(2, '0');

    const tick = () => {
      const now = new Date();
      let diff = Math.max(0, deadline - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= d * 24 * 60 * 60 * 1000;
      const h = Math.floor(diff / (1000 * 60 * 60));
      diff -= h * 60 * 60 * 1000;
      const m = Math.floor(diff / (1000 * 60));
      diff -= m * 60 * 1000;
      const s = Math.floor(diff / 1000);

      units.days.textContent = d;
      units.hours.textContent = pad(h);
      units.minutes.textContent = pad(m);
      units.seconds.textContent = pad(s);

      if (deadline - now <= 0) clearInterval(timer);
    };

    tick();
    const timer = setInterval(tick, 1000);
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sri-rico-countdown').forEach(initCountdown);
  });
})();
