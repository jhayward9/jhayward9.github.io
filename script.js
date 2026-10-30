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

  var revealObserver =
    "IntersectionObserver" in window && !reduceMotion.matches
      ? new IntersectionObserver(
          function (entries, observer) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        )
      : null;

  /* Called before insertion so cards never flash visible first. */
  function prepareReveal(items) {
    if (!revealObserver) return;

    Array.prototype.forEach.call(items, function (item, index) {
      item.classList.add("reveal");
      item.style.setProperty(
        "--reveal-delay",
        Math.min(index % 3, 2) * 70 + "ms"
      );
    });
  }

  function observeReveal(items) {
    if (!revealObserver) return;

    Array.prototype.forEach.call(items, function (item) {
      revealObserver.observe(item);
    });
  }

  var pageRevealItems = document.querySelectorAll("[data-reveal]");
  prepareReveal(pageRevealItems);
  observeReveal(pageRevealItems);

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

  /* --- Project cards from projects.json ---------------------------------- */

  /* index.html ships hand-written cards that work with no JavaScript and no
     network. When projects.json is reachable, this rebuilds the grid from it
     and reuses any bespoke card artwork (the featured bet slip) by cloning the
     matching element out of the fallback markup. */

  var projectGrid = document.querySelector(".project-grid");

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (typeof text === "string") node.textContent = text;
    return node;
  }

  function svgIcon(name) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");

    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#i-" + name);
    svg.appendChild(use);

    return svg;
  }

  function srOnly(text) {
    var span = element("span", "sr-only", text);
    return span;
  }

  function externalLink(className, href, label, withIcon) {
    var link = element("a", className, label);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    if (withIcon) link.appendChild(svgIcon("arrow-up-right"));
    link.appendChild(srOnly("(opens in a new tab)"));

    return link;
  }

  /* Only absolute https URLs from projects.json are ever linked. */
  function safeUrl(url) {
    return typeof url === "string" && /^https:\/\/[^\s"'<>]+$/i.test(url)
      ? url
      : null;
  }

  function repoSlug(url) {
    var match = /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/?#]+)/i.exec(
      url || ""
    );

    return match ? (match[1] + "/" + match[2]).toLowerCase() : null;
  }

  function setLeadingText(node, text) {
    for (var index = 0; index < node.childNodes.length; index += 1) {
      var child = node.childNodes[index];

      if (child.nodeType === 3 && child.nodeValue.trim()) {
        child.nodeValue = "\n                " + text + "\n                ";
        return;
      }
    }
  }

  function collectArtwork(grid) {
    var artwork = {};

    Array.prototype.forEach.call(
      grid.querySelectorAll(".project"),
      function (card) {
        var visual = card.querySelector(".project-visual");
        if (!visual) return;

        var link = card.querySelector('a[href*="github.com/"]');
        var slug = repoSlug(link && link.getAttribute("href"));

        if (slug) artwork[slug] = visual;
      }
    );

    return artwork;
  }

  function buildProjectCard(project, artwork) {
    var isFeatured = Boolean(project.featured);
    var card = element(
      "article",
      isFeatured ? "project project--featured" : "project"
    );

    card.setAttribute("data-accent", project.accent || "green");
    card.setAttribute("data-reveal", "");

    var body = isFeatured ? element("div", "project-body") : card;

    var head = element("div", "project-head");
    var iconWrap = element("span", "project-icon");
    iconWrap.setAttribute("aria-hidden", "true");
    iconWrap.appendChild(svgIcon(project.icon || "terminal"));
    head.appendChild(iconWrap);

    if (project.badge) {
      head.appendChild(element("span", "project-badge", project.badge));
    }

    body.appendChild(head);

    var title = element("h3");
    var repoUrl = project.missing ? null : safeUrl(project.url);

    if (repoUrl) {
      title.appendChild(externalLink(null, repoUrl, project.title, false));
    } else {
      title.textContent = project.title;
    }

    body.appendChild(title);

    if (project.kicker) {
      body.appendChild(element("p", "project-kicker", project.kicker));
    }

    if (project.description) {
      body.appendChild(element("p", "project-desc", project.description));
    }

    if (project.tags && project.tags.length) {
      var tags = element("ul", "tag-list");
      tags.setAttribute("role", "list");
      tags.setAttribute("aria-label", project.tagLabel || "Details");

      Array.prototype.forEach.call(project.tags, function (tag) {
        tags.appendChild(element("li", null, tag));
      });

      body.appendChild(tags);
    }

    var foot = element("div", "project-foot");

    if (project.language && project.language.label) {
      var language = element("span", "lang");
      var dot = element("span", "lang-dot");
      dot.setAttribute("aria-hidden", "true");
      dot.style.setProperty("--dot", project.language.color || "#8b949e");
      language.appendChild(dot);
      language.appendChild(document.createTextNode(project.language.label));
      foot.appendChild(language);
    }

    var links = [];

    Array.prototype.forEach.call(project.extraLinks || [], function (link) {
      var href = safeUrl(link && link.url);
      if (href && link.label) links.push({ label: link.label, url: href });
    });

    /* A repo that 404s gets no Repository button; surviving links stay. */
    if (repoUrl) links.push({ label: "Repository", url: repoUrl });

    if (links.length) {
      var group = links.length > 1 ? element("div", "project-links") : foot;

      Array.prototype.forEach.call(links, function (link) {
        group.appendChild(externalLink("project-link", link.url, link.label, true));
      });

      if (group !== foot) foot.appendChild(group);
    }

    body.appendChild(foot);

    if (body !== card) card.appendChild(body);
    if (artwork) card.appendChild(artwork);

    return card;
  }

  function applySectionCopy(data) {
    var aside = document.querySelector("#work .section-aside");
    if (!aside) return;

    if (data.intro) {
      var intro = aside.querySelector("p");
      if (intro) intro.textContent = data.intro;
    }

    var allLink = aside.querySelector("a.text-link");
    if (!allLink) return;

    var repositoriesUrl = safeUrl(data.repositoriesUrl);
    if (repositoriesUrl) allLink.href = repositoriesUrl;

    if (data.allRepositories) {
      setLeadingText(allLink, data.allRepositories);
    }
  }

  function renderProjects(data) {
    if (!data || !data.projects || !data.projects.length) return;

    var artwork = collectArtwork(projectGrid);
    var fragment = document.createDocumentFragment();
    var cards = [];

    Array.prototype.forEach.call(data.projects, function (project) {
      if (!project || !project.title) return;

      var slug = repoSlug(project.url);
      var decoration =
        slug && artwork[slug] ? artwork[slug].cloneNode(true) : null;
      var card = buildProjectCard(project, decoration);

      cards.push(card);
      fragment.appendChild(card);
    });

    if (!cards.length) return;

    prepareReveal(cards);
    projectGrid.textContent = "";
    projectGrid.appendChild(fragment);
    observeReveal(cards);

    applySectionCopy(data);
  }

  function loadProjects() {
    window
      .fetch("projects.json", { headers: { Accept: "application/json" } })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("projects.json returned " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        renderProjects(data);
      })
      .catch(function () {
        /* The hand-written cards already on the page stay in place. */
      });
  }

  if (projectGrid) {
    loadProjects();
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
