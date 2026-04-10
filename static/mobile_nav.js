(function () {
  function closeMenu(header) {
    header.classList.remove("nav-open");
    const toggle = header.querySelector(".mobile-menu-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const headers = document.querySelectorAll(".navbar");

    headers.forEach(function (header) {
      const toggle = header.querySelector(".mobile-menu-toggle");
      if (!toggle) return;

      toggle.addEventListener("click", function () {
        const isOpen = header.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      });

      header.querySelectorAll(".nav-links a, .nav-actions a, .nav-actions button").forEach(function (item) {
        item.addEventListener("click", function () {
          closeMenu(header);
        });
      });
    });

    document.addEventListener("click", function (event) {
      headers.forEach(function (header) {
        if (!header.contains(event.target)) {
          closeMenu(header);
        }
      });
    });
  });
})();
