const filterButtons = document.querySelectorAll(".filter-button");
const courseCards = document.querySelectorAll(".course-card");
const courseCount = document.querySelector(".course-count");
const emptyState = document.querySelector(".no-results");

function applyCourseFilter(filter) {
  let visibleCount = 0;

  courseCards.forEach((card) => {
    const isVisible = filter === "all" || card.dataset.category === filter;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  courseCount.textContent = `${visibleCount} ${getCourseWord(visibleCount)}`;
  emptyState.hidden = visibleCount !== 0;
}

function getCourseWord(count) {
  const remainder10 = count % 10;
  const remainder100 = count % 100;

  if (remainder10 === 1 && remainder100 !== 11) return "курс";
  if (remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 12 || remainder100 > 14)) return "курса";
  return "курсов";
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    applyCourseFilter(button.dataset.filter);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Открыть меню" : "Закрыть меню");
  mainNav.classList.toggle("is-open", !isExpanded);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
    mainNav.classList.remove("is-open");
  });
});