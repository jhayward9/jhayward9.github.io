/* ==========================================================================
   Jesse Hayward — site interactions
   Progressive enhancement only. The page works fine without this file.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* --- Active navigation link -------------------------------------------- */

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav a[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function setCurrentSection(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* --- Scroll reveal ----------------------------------------------------- */

  var revealItems = Array.prototype.slice.call(
    document.querySelectorAll("[data-reveal]")
  );

  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    revealItems.forEach(function (item, index) {
      item.classList.add("reveal");
      item.style.setProperty(
        "--reveal-delay",
        Math.min(index % 3, 2) * 70 + "ms"
      );
    });

    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }

  /* --- Live GitHub profile counts ---------------------------------------- */

  var statNodes = document.querySelectorAll("[data-gh]");

  if (statNodes.length && window.fetch) {
    fetch("https://api.github.com/users/jhayward9", {
      headers: { Accept: "application/vnd.github+json" }
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("GitHub API returned " + response.status);
        }
        return response.json();
      })
      .then(function (profile) {
        statNodes.forEach(function (node) {
          var value = profile[node.getAttribute("data-gh")];
          if (typeof value === "number") {
            node.textContent = new Intl.NumberFormat("en-US").format(value);
          }
        });
      })
      .catch(function () {
        /* Static fallback values stay in place. */
      });
  }

  /* --- Edmonton clock ---------------------------------------------------- */

  var timeNode = document.querySelector("[data-local-time]");

  if (timeNode) {
    var edmontonTime;

    try {
      edmontonTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Edmonton",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      });
    } catch (error) {
      edmontonTime = null;
    }

    if (edmontonTime) {
      var updateClock = function () {
        timeNode.textContent = edmontonTime.format(new Date());
      };

      updateClock();
      window.setInterval(updateClock, 30000);
    }
  }

  /* --- Footer year ------------------------------------------------------- */

  var yearNode = document.querySelector("[data-year]");

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
})();
