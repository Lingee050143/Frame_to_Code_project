/**
 * Frame to Code - Core Logic
 */

class FrameToCode {
  constructor() {
    this.cards = [];
    this.currentScreen = "home";
    this.history = [];
    this.currentCard = null; // For detail view
    this.session = null; // { seenInSession: [], queue: [], stats: { viewed: 0, again: 0, mastered: 0 } }

    this.init();
  }

  async init() {
    this.loadData();
    this.setupEventListeners();
    this.render();
  }

  loadData() {
    const savedCards = localStorage.getItem("ftc_cards");
    if (savedCards) {
      this.cards = JSON.parse(savedCards);
    } else {
      this.createInitialData();
    }
  }

  saveData() {
    localStorage.setItem("ftc_cards", JSON.stringify(this.cards));
  }

  createInitialData() {
    const visualPath = "ux_concept_visuals_1773124008675.png"; // Using the generated image
    const examples = [
      {
        id: "card_auto_layout",
        term: "Auto Layout",
        oneLine: "Figma automatic layout system",
        category: "Figma",
        figmaConcept:
          "Manages spacing and alignment automatically inside frames",
        htmlMapping: "flexbox (display: flex)",
        keyPoints: ["direction", "gap", "padding", "alignment"],
        visual: visualPath,
        myNote: "Padding + gap behaves exactly like flexbox in CSS.",
        tags: ["layout", "container"],
        viewedCount: 0,
        lastViewedAt: "",
        confidence: 0,
        againCount: 0,
        masteredCount: 0,
        favorite: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "card_flexbox",
        term: "Flexbox",
        oneLine: "One-dimensional layout model",
        category: "HTML",
        figmaConcept: "Direct equivalent to Auto Layout",
        htmlMapping: "display: flex",
        keyPoints: ["flex-direction", "justify-content", "align-items"],
        visual: visualPath,
        myNote: "Use flex-direction: column for vertical Auto Layout.",
        tags: ["web", "layout"],
        viewedCount: 0,
        lastViewedAt: "",
        confidence: 0,
        againCount: 0,
        masteredCount: 0,
        favorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "card_component",
        term: "Component",
        oneLine: "Reusable design element",
        category: "Figma",
        figmaConcept: "Main components and instances for scalability",
        htmlMapping: "React/Vue Components or Classes",
        keyPoints: ["master", "instance", "overrides"],
        visual: visualPath,
        myNote: "Changing the master updates all instances.",
        tags: ["reusability", "system"],
        viewedCount: 0,
        lastViewedAt: "",
        confidence: 0,
        againCount: 0,
        masteredCount: 0,
        favorite: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "card_div",
        term: "div",
        oneLine: "Generic container element",
        category: "HTML",
        figmaConcept: "Roughly equivalent to a Frame (non-auto layout)",
        htmlMapping: "<div> tag",
        keyPoints: ["block-level", "grouping", "styling hook"],
        visual: visualPath,
        myNote: "The workhorse of web layouts.",
        tags: ["elements", "basics"],
        viewedCount: 0,
        lastViewedAt: "",
        confidence: 0,
        againCount: 0,
        masteredCount: 0,
        favorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "card_variants",
        term: "Variants",
        oneLine: "Grouping component variations",
        category: "Figma",
        figmaConcept: "Combined components with shared properties",
        htmlMapping: "State-based styling (e.g., .btn--primary)",
        keyPoints: ["properties", "values", "organization"],
        visual: visualPath,
        myNote: "Hover, Pressed, and Disabled states are perfect for variants.",
        tags: ["figma", "advanced"],
        viewedCount: 0,
        lastViewedAt: "",
        confidence: 0,
        againCount: 0,
        masteredCount: 0,
        favorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "card_cognitive_load",
        term: "Cognitive Load",
        oneLine: "Mental effort used in working memory",
        category: "UX",
        figmaConcept: "Visual complexity affecting user perception",
        htmlMapping: "Progressive disclosure / minimalism",
        keyPoints: ["intrinsic", "extraneous", "germane"],
        visual: "",
        myNote: "Keep forms simple to reduce load.",
        tags: ["psychology", "design"],
        viewedCount: 0,
        lastViewedAt: "",
        confidence: 0,
        againCount: 0,
        masteredCount: 0,
        favorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "card_design_system",
        term: "Design System",
        oneLine: "Source of truth for design & code",
        category: "DesignSystem",
        figmaConcept: "Library of variables and components",
        htmlMapping: "CSS Variables and reusable tokens",
        keyPoints: ["tokens", "documentation", "consistency"],
        visual: "",
        myNote: "The bridge between designers and developers.",
        tags: ["ds", "collaboration"],
        viewedCount: 0,
        lastViewedAt: "",
        confidence: 0,
        againCount: 0,
        masteredCount: 0,
        favorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "card_microcopy",
        term: "Microcopy",
        oneLine: "Small words with high impact",
        category: "Microcopy",
        figmaConcept: "Text layers in buttons and labels",
        htmlMapping: "Alt text, placeholders, CTAs",
        keyPoints: ["clarity", "voice", "guidance"],
        visual: "",
        myNote: "Good microcopy prevents user errors.",
        tags: ["content", "ux"],
        viewedCount: 0,
        lastViewedAt: "",
        confidence: 0,
        againCount: 0,
        masteredCount: 0,
        favorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "card_grid",
        term: "CSS Grid",
        oneLine: "Two-dimensional layout system",
        category: "HTML",
        figmaConcept: "Layout Grids (fixed or fluid)",
        htmlMapping: "display: grid",
        keyPoints: ["rows", "columns", "areas"],
        visual: "",
        myNote: "Figma's grid system is quite consistent with CSS Grid.",
        tags: ["layout", "advanced"],
        viewedCount: 0,
        lastViewedAt: "",
        confidence: 0,
        againCount: 0,
        masteredCount: 0,
        favorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "card_frame",
        term: "Frame",
        oneLine: "The basic container in Figma",
        category: "Figma",
        figmaConcept: "Can contain layers, other frames, and Auto Layout",
        htmlMapping: "<section> or <article> or <div>",
        keyPoints: ["clipping", "padding", "constraints"],
        visual: "",
        myNote: "Think of it as a container with overflow: hidden potential.",
        tags: ["basics", "figma"],
        viewedCount: 0,
        lastViewedAt: "",
        confidence: 0,
        againCount: 0,
        masteredCount: 0,
        favorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    this.cards = examples;
    this.saveData();
  }

  setupEventListeners() {
    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const screen = e.currentTarget.dataset.screen;
        this.navigateTo(screen);
      });
    });

    // Delegate for dynamic elements
    document.body.addEventListener("click", (e) => {
      const cardEl = e.target.closest(".card-preview");
      if (cardEl && !this.currentScreen.includes("study")) {
        const id = cardEl.dataset.id;
        this.showDetail(id);
      }
    });
  }

  navigateTo(screen, id = null) {
    this.currentScreen = screen;

    // Update nav active state
    document.querySelectorAll(".nav-item").forEach((nav) => {
      nav.classList.toggle("active", nav.dataset.screen === screen);
    });

    this.render();
  }

  goBack() {
    this.navigateTo("library");
  }

  render() {
    const container = document.getElementById("screen-container");
    container.innerHTML = "";

    let templateId = `template-${this.currentScreen}`;
    if (this.currentScreen === "add" && this.currentCardId)
      templateId = "template-add";

    const template = document.getElementById(templateId);
    if (!template) {
      console.error("Template not found:", templateId);
      return;
    }

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);

    // Screen specific init
    if (this.currentScreen === "home") this.initHomeScreen();
    if (this.currentScreen === "library") this.initLibraryScreen();
    if (this.currentScreen === "detail") this.initDetailScreen();
    if (this.currentScreen === "study") this.initStudyScreen();
    if (this.currentScreen === "add") this.initAddScreen();

    window.scrollTo(0, 0);
  }

  // --- HOME SCREEN ---
  initHomeScreen() {
    const todayContainer = document.getElementById("today-card-container");
    const recentContainer = document.getElementById("recent-cards-container");

    // Pick one "Today" card (could be random or highest priority)
    const todayCard = this.cards[Math.floor(Math.random() * this.cards.length)];
    todayContainer.innerHTML = this.renderCardPreview(todayCard);

    // Recently viewed (sorted by lastViewedAt)
    const viewed = this.cards
      .filter((c) => c.lastViewedAt)
      .sort((a, b) => new Date(b.lastViewedAt) - new Date(a.lastViewedAt))
      .slice(0, 5);

    if (viewed.length === 0) {
      recentContainer.innerHTML =
        '<p style="color:var(--subtext); padding:10px 0;">No cards viewed yet.</p>';
    } else {
      recentContainer.innerHTML = viewed
        .map((c) => this.renderCardPreview(c))
        .join("");
    }

    // Category clicks
    document.querySelectorAll(".cat-pill").forEach((pill) => {
      pill.onclick = () => {
        this.navigateTo("library");
        // We'll need a way to pass the filter to library
        setTimeout(() => {
          const filterBtn = document.querySelector(
            `.filter-chip[data-cat="${pill.dataset.category}"]`,
          );
          if (filterBtn) filterBtn.click();
        }, 50);
      };
    });
  }

  renderCardPreview(card) {
    return `
            <div class="card-preview" data-id="${card.id}">
                <span class="cat-tag tag-${card.category}">${card.category}</span>
                <h3>${card.term}</h3>
                <p class="oneline">${card.oneLine}</p>
                <span class="mapping">${card.htmlMapping}</span>
            </div>
        `;
  }

  // --- LIBRARY SCREEN ---
  initLibraryScreen() {
    const grid = document.getElementById("library-grid");
    const searchInput = document.getElementById("library-search");
    const sortSelect = document.getElementById("library-sort");
    const filterChips = document.querySelectorAll(".filter-chip");

    let currentCat = "all";
    let searchQuery = "";

    const updateGrid = () => {
      let filtered = this.cards.filter((c) => {
        const matchesCat = currentCat === "all" || c.category === currentCat;
        const matchesSearch =
          c.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.oneLine.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
      });

      // Sorting
      const sortVal = sortSelect.value;
      if (sortVal === "alphabet") {
        filtered.sort((a, b) => a.term.localeCompare(b.term));
      } else if (sortVal === "mostViewed") {
        filtered.sort((a, b) => b.viewedCount - a.viewedCount);
      } else {
        filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      }

      grid.innerHTML = filtered.map((c) => this.renderCardPreview(c)).join("");
    };

    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      updateGrid();
    };

    sortSelect.onchange = updateGrid;

    filterChips.forEach((chip) => {
      chip.onclick = () => {
        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        currentCat = chip.dataset.cat;
        updateGrid();
      };
    });

    updateGrid();
  }

  // --- DETAIL SCREEN ---
  showDetail(id) {
    this.currentCardId = id;
    const card = this.cards.find((c) => c.id === id);

    // Update tracking
    card.viewedCount++;
    card.lastViewedAt = new Date().toISOString();
    this.saveData();

    this.navigateTo("detail");
  }

  initDetailScreen() {
    const card = this.cards.find((c) => c.id === this.currentCardId);
    if (!card) return;

    const content = document.getElementById("detail-content");
    const favBtn = document.getElementById("detail-fav-toggle");
    favBtn.classList.toggle("active", card.favorite);

    content.innerHTML = `
            <div id="export-target">
                <div class="detail-header">
                    <span class="cat-tag tag-${card.category}">${card.category}</span>
                    <h1>${card.term}</h1>
                    <p class="oneline">${card.oneLine}</p>
                </div>

                <div class="detail-section">
                    <h4>Figma Concept</h4>
                    <div class="content">${card.figmaConcept}</div>
                </div>

                <div class="detail-section">
                    <h4>HTML Mapping</h4>
                    <div class="content"><code>${card.htmlMapping}</code></div>
                </div>

                <div class="detail-section">
                    <h4>Key Points</h4>
                    <div class="key-points">
                        ${card.keyPoints.map((p) => `<span class="point">${p}</span>`).join("")}
                    </div>
                </div>

                ${
                  card.visual
                    ? `
                <div class="detail-section">
                    <h4>Visual</h4>
                    <div class="visual-box">
                        <img src="${card.visual}" alt="Visual breakdown">
                    </div>
                </div>`
                    : ""
                }

                <div class="detail-section">
                    <h4>My Note</h4>
                    <div class="content">${card.myNote || "No notes added."}</div>
                </div>
            </div>
        `;

    favBtn.onclick = () => {
      card.favorite = !card.favorite;
      favBtn.classList.toggle("active", card.favorite);
      this.saveData();
    };

    document.getElementById("btn-export").onclick = () => this.exportCard();
    document.getElementById("btn-edit").onclick = () => {
      this.isEditing = true;
      this.navigateTo("add");
    };
    document.getElementById("btn-delete").onclick = () => {
      if (confirm("Delete this card?")) {
        this.cards = this.cards.filter((c) => c.id !== card.id);
        this.saveData();
        this.navigateTo("library");
      }
    };
  }

  async exportCard() {
    const target = document.getElementById("export-target");
    const btn = document.getElementById("btn-export");
    btn.innerText = "Generating...";

    const canvas = await html2canvas(target, {
      backgroundColor: "#F7F8FB",
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = `FTC_${this.currentCardId}.png`;
    link.href = canvas.toDataURL();
    link.click();

    btn.innerText = "Export Image";
  }

  // --- STUDY SCREEN (Weighted Random) ---
  startStudy() {
    this.session = {
      seenInSession: [],
      queue: [],
      stats: { viewed: 0, again: 0, mastered: 0 },
    };

    // Select 5 cards using weighted random
    for (let i = 0; i < 5; i++) {
      const next = this.pickWeightedCard(this.session.queue);
      if (next) this.session.queue.push(next);
    }

    this.navigateTo("study");
  }

  pickWeightedCard(excludeList = []) {
    const now = new Date();
    const scores = this.cards.map((card) => {
      if (excludeList.find((c) => c.id === card.id))
        return { card, score: -9999 };

      let score = 0;

      // unseenBonus
      if (card.viewedCount === 0) score += 50;
      else if (card.viewedCount <= 2) score += 25;

      // lowConfidenceBonus
      const confBonuses = [40, 30, 20, 10, 0];
      score += confBonuses[card.confidence] || 0;

      // staleBonus
      if (card.lastViewedAt) {
        const days =
          (now - new Date(card.lastViewedAt)) / (1000 * 60 * 60 * 24);
        if (days >= 7) score += 25;
        else if (days >= 3) score += 15;
        else if (days >= 1) score += 8;
      }

      // againBonus
      score += Math.min(card.againCount * 5, 20);

      // favoriteBonus
      if (card.favorite) score += 8;

      // recentPenalty
      if (this.session && this.session.seenInSession.includes(card.id))
        score -= 100;
      // (Note: last 5 viewed penalty would require a global history array, let's keep it simple for now)

      return { card, score };
    });

    // Sort by score desc and pick from top 3 for some variety
    scores.sort((a, b) => b.score - a.score);
    const candidates = scores.slice(0, 3);
    const selected =
      candidates[Math.floor(Math.random() * candidates.length)].card;

    return selected;
  }

  initStudyScreen() {
    if (!this.session || this.session.queue.length === 0) {
      this.renderStudyDone();
      return;
    }

    const card = this.session.queue[0];
    const container = document.getElementById("study-card-container");
    const progress = document.getElementById("study-progress");

    progress.innerText = `Card ${this.session.stats.viewed + 1} / 5`;

    container.innerHTML = `
            <div class="study-card" id="card-inner-box">
                <div class="study-card-inner">
                    <div id="study-front">
                        <h2>${card.term}</h2>
                        <p class="oneline">${card.oneLine}</p>
                    </div>
                    <div id="study-back" class="hidden" style="width:100%">
                        <div class="detail-section">
                            <h4>Figma & HTML</h4>
                            <p>${card.figmaConcept}</p>
                            <p><code>${card.htmlMapping}</code></p>
                        </div>
                        <div class="detail-section">
                            <h4>Key Points</h4>
                            <div class="key-points">
                                ${card.keyPoints.map((p) => `<span class="point">${p}</span>`).join("")}
                            </div>
                        </div>
                        ${card.visual ? `<img src="${card.visual}" style="width:100%; border-radius:8px; margin-top:10px;">` : ""}
                        ${card.myNote ? `<p style="margin-top:15px; font-style:italic;">"${card.myNote}"</p>` : ""}
                    </div>
                </div>
            </div>
        `;
  }

  revealStudy() {
    document.getElementById("study-back").classList.remove("hidden");
    document.getElementById("study-reveal").classList.add("hidden");
    document.getElementById("study-actions").classList.remove("hidden");
    document.getElementById("card-inner-box").classList.add("revealed");

    const card = this.session.queue[0];
    card.viewedCount++;
    card.lastViewedAt = new Date().toISOString();
    this.saveData();
  }

  answerStudy(type) {
    const card = this.session.queue.shift();
    this.session.seenInSession.push(card.id);

    const cardData = this.cards.find((c) => c.id === card.id);

    if (type === "again") {
      cardData.againCount++;
      cardData.confidence = Math.max(cardData.confidence - 1, 0);
      this.session.stats.again++;

      // Insert after 3 cards (or at end)
      const insertIdx = Math.min(3, this.session.queue.length);
      this.session.queue.splice(insertIdx, 0, card);
    } else {
      cardData.masteredCount++;
      cardData.confidence = Math.min(cardData.confidence + 1, 4);
      this.session.stats.viewed++;
      this.session.stats.mastered++;
    }

    this.saveData();
    this.initStudyScreen();
  }

  renderStudyDone() {
    const container = document.getElementById("study-card-container");
    document.getElementById("study-reveal").classList.add("hidden");
    document.getElementById("study-actions").classList.add("hidden");
    document.getElementById("study-progress").innerText = "Session Complete!";

    container.innerHTML = `
            <div class="study-card">
                <div class="study-card-inner" style="background:#EEF0FF; border:none;">
                    <span style="font-size:60px;">🎉</span>
                    <h2>Great job!</h2>
                    <p>You've reviewed 5 concepts today.</p>
                    <div style="margin-top:20px; display:flex; gap:15px;">
                        <span style="color:#4CAF50">Mastered: ${this.session.stats.mastered}</span>
                        <span style="color:#FF4D4D">Again: ${this.session.stats.again}</span>
                    </div>
                    <button class="btn btn-primary" onclick="app.navigateTo('home')" style="margin-top:30px; width:100%">Finish</button>
                </div>
            </div>
        `;
  }

  // --- ADD/EDIT SCREEN ---
  initAddScreen() {
    const form = document.getElementById("card-form");
    const title = document.getElementById("add-screen-title");

    if (this.isEditing) {
      const card = this.cards.find((c) => c.id === this.currentCardId);
      title.innerText = "Edit Card";
      document.getElementById("form-id").value = card.id;
      document.getElementById("form-term").value = card.term;
      document.getElementById("form-oneline").value = card.oneLine;
      document.getElementById("form-category").value = card.category;
      document.getElementById("form-figma").value = card.figmaConcept;
      document.getElementById("form-html").value = card.htmlMapping;
      document.getElementById("form-keypoints").value =
        card.keyPoints.join(", ");
      document.getElementById("form-note").value = card.myNote || "";
      document.getElementById("form-tags").value = card.tags.join(", ");
    }

    form.onsubmit = (e) => {
      e.preventDefault();
      const id =
        document.getElementById("form-id").value || `card_${Date.now()}`;

      const newCard = {
        id,
        term: document.getElementById("form-term").value,
        oneLine: document.getElementById("form-oneline").value,
        category: document.getElementById("form-category").value,
        figmaConcept: document.getElementById("form-figma").value,
        htmlMapping: document.getElementById("form-html").value,
        keyPoints: document
          .getElementById("form-keypoints")
          .value.split(",")
          .map((s) => s.trim()),
        visual: this.isEditing
          ? this.cards.find((c) => c.id === id).visual
          : "",
        myNote: document.getElementById("form-note").value,
        tags: document
          .getElementById("form-tags")
          .value.split(",")
          .map((s) => s.trim()),
        updatedAt: new Date().toISOString(),
      };

      if (this.isEditing) {
        const idx = this.cards.findIndex((c) => c.id === id);
        this.cards[idx] = { ...this.cards[idx], ...newCard };
      } else {
        newCard.createdAt = new Date().toISOString();
        newCard.viewedCount = 0;
        newCard.confidence = 0;
        newCard.againCount = 0;
        newCard.masteredCount = 0;
        newCard.favorite = false;
        this.cards.push(newCard);
      }

      this.saveData();
      this.isEditing = false;
      this.navigateTo("library");
    };
  }
}

const app = new FrameToCode();
window.app = app;
