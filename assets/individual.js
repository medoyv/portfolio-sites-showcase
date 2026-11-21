(() => {
  const scene = document.body.dataset.scene || "coffee";
  const header = document.querySelector(".demo-header");
  const nav = document.getElementById("demoNav");
  const heroCopy = document.querySelector(".demo-copy");
  const proof = document.querySelector(".demo-proof");
  if (!header || !nav || !heroCopy || !proof) return;

  const guide = {
    coffee: { badge: "ОБЖАРЕНО СЕГОДНЯ · 08:00—22:00", steps: ["Зёрна", "Способ", "Первый глоток"], jump: "К меню" },
    bakery: { badge: "ПЕРВАЯ ПАРТИЯ · ИЗ ПЕЧИ", steps: ["Замес", "Огонь", "Забрать тёплым"], jump: "На полку" },
    flower: { badge: "СЕЗОННЫЙ ЦВЕТ · РУЧНАЯ СБОРКА", steps: ["Повод", "Букет", "Доставка"], jump: "Найти букет" },
    architecture: { badge: "ИЗБРАННОЕ · 2021—2026", steps: ["Место", "Материал", "Форма"], jump: "К проектам" },
    beauty: { badge: "КОЖА / РИТУАЛ / БАЛАНС", steps: ["Очищение", "Поддержка", "Защита"], jump: "Подобрать уход" },
    barber: { badge: "БЛИЖАЙШЕЕ ОКНО · СЕГОДНЯ", steps: ["Услуга", "Мастер", "Время"], jump: "К записи" },
    fashion: { badge: "COLLECTION 04 · NEW DROP", steps: ["Силуэт", "Размер", "Примерка"], jump: "В коллекцию" },
    travel: { badge: "МАЛЕНЬКИЕ ГРУППЫ · ДО 8 ЧЕЛОВЕК", steps: ["Маршрут", "Даты", "В дорогу"], jump: "К маршрутам" },
    interior: { badge: "ПРОСТРАНСТВО · 04 ИСТОРИИ", steps: ["План", "Фактура", "Дом"], jump: "В портфолио" },
    photo: { badge: "СРЕДА / ВИЗУАЛЬНЫЕ ИСТОРИИ", steps: ["Свет", "Наблюдение", "Кадр"], jump: "К сериям" },
    cowork: { badge: "WORK CLUB · МОСКВА", steps: ["Пространство", "Формат", "Рабочий день"], jump: "Выбрать место" },
    course: { badge: "8 НЕДЕЛЬ · ОТ ИДЕИ К ОБЪЕКТУ", steps: ["Наблюдать", "Собрать", "Проверить"], jump: "Смотреть программу" },
    realty: { badge: "ПОДБОРКА · 12 АДРЕСОВ", steps: ["Район", "Бюджет", "Ключи"], jump: "К объектам" },
    saas: { badge: "SIGNAL WORKSPACE · V 01.4", steps: ["Задачи", "Команда", "Результат"], jump: "Выбрать план" },
    bookshop: { badge: "НЕЗАВИСИМАЯ ПОЛКА · СЕГОДНЯ", steps: ["Обложка", "Заметка", "Клуб"], jump: "На полку" },
    festival: { badge: "OPEN AIR · ДВА ДНЯ ВМЕСТЕ", steps: ["Лайн-ап", "Сцена", "После заката"], jump: "К расписанию" }
  }[scene];

  if (guide) {
    nav.classList.add("nav-" + scene);
    const badge = document.createElement("span");
    badge.className = "demo-badge badge-" + scene;
    badge.textContent = guide.badge;
    heroCopy.insertBefore(badge, heroCopy.querySelector(".demo-lead"));

    const wrap = proof.querySelector(".wrap");
    if (wrap) {
      const jump = wrap.querySelector("a");
      proof.classList.add("route-" + scene);
      wrap.replaceChildren();
      guide.steps.forEach((label, index) => {
        const step = document.createElement("span");
        step.className = "route-step";
        step.innerHTML = "<b>0" + (index + 1) + "</b><span></span>";
        step.lastElementChild.textContent = label;
        wrap.append(step);
      });
      if (jump) {
        jump.className = "route-jump";
        jump.textContent = guide.jump + " ";
        const arrow = document.createElement("i");
        arrow.textContent = "↘";
        jump.append(arrow);
        wrap.append(jump);
      }
    }
  }

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = links.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      document.body.dataset.activeSection = current.target.id;
      links.forEach(link => {
        const active = link.getAttribute("href") === "#" + current.target.id;
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-22% 0px -62% 0px", threshold: [0, .2, .45] });
    sections.forEach(section => navObserver.observe(section));

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.classList.add("motion-ready");
      const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          reveal.unobserve(entry.target);
        }
      }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
      document.querySelectorAll(".demo-proof, .demo-tile, .demo-about, .demo-contact").forEach((element, index) => {
        element.classList.add("scene-reveal");
        element.style.setProperty("--reveal-order", String(index % 6));
        reveal.observe(element);
      });
    }
  }

  const updateReadingLine = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    document.documentElement.style.setProperty("--reading-progress", progress.toFixed(3));
  };
  window.addEventListener("scroll", updateReadingLine, { passive: true });
  updateReadingLine();
})();

