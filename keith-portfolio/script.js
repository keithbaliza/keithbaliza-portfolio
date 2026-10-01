(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function h(tag, cls, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  }
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2600);
  }
  const lsGet = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

  /* ---------------- Boot screen ---------------- */
  (function boot() {
    const bar = $("#bootBar"), pct = $("#bootPct");
    let p = 0;
    const done = () => {
      document.body.classList.add("ready");
      startTerminal();
      startTyping();
    };
    if (reduceMotion) { bar.style.width = "100%"; pct.textContent = "100%"; done(); return; }
    const t = setInterval(() => {
      p = Math.min(100, p + Math.random() * 16 + 6);
      bar.style.width = p + "%";
      pct.textContent = Math.floor(p) + "%";
      if (p >= 100) { clearInterval(t); setTimeout(done, 300); }
    }, 110);
  })();

  /* ---------------- Lamp: dark / light ---------------- */
  const lamp = $("#lamp");
  function setTheme(theme) {
    root.dataset.theme = theme;
    lamp.setAttribute("aria-pressed", String(theme === "light"));
    lsSet("kb-theme", theme);
    readColors();
  }
  lamp.addEventListener("click", () => {
    lamp.classList.remove("pull");
    void lamp.offsetWidth;
    lamp.classList.add("pull");
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  /* ---------------- Matrix rain ---------------- */
  const cv = $("#matrix"), ctx = cv.getContext("2d");
  const glyphs = "01<>/{}[]=+*#$%&ABCDEFxyz".split("");
  const fs = 16;
  let drops = [], accent = "#33ff33", fade = "rgba(0,0,0,.14)";
  function readColors() {
    const s = getComputedStyle(root);
    accent = s.getPropertyValue("--accent").trim();
    fade = s.getPropertyValue("--fade").trim();
    ctx.fillStyle = s.getPropertyValue("--bg").trim();
    ctx.fillRect(0, 0, cv.width, cv.height);
  }
  function resize() {
    cv.width = innerWidth;
    cv.height = innerHeight;
    drops = Array.from({ length: Math.ceil(cv.width / fs) }, () => Math.random() * -40);
    readColors();
  }
  function drawRain() {
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = accent;
    ctx.font = fs + "px VT323, monospace";
    for (let i = 0; i < drops.length; i++) {
      ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * fs, drops[i] * fs);
      if (drops[i] * fs > cv.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 1;
    }
  }
  setTheme(lsGet("kb-theme", "dark"));
  addEventListener("resize", resize);
  resize();
  if (!reduceMotion) setInterval(drawRain, 70);

  /* ---------------- Typing effect ---------------- */
  function startTyping() {
    const el = $("#typed");
    const roles = ["AI Automation Specialist", "Web Developer", "Virtual Assistant"];
    if (reduceMotion) { el.textContent = roles.join(" / "); return; }
    let r = 0, c = 0, del = false;
    (function tick() {
      const word = roles[r];
      el.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
      if (del && c === 0) { del = false; r = (r + 1) % roles.length; return setTimeout(tick, 350); }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 35 : 75);
    })();
  }

  /* ---------------- Hero terminal ---------------- */
  function startTerminal() {
    const el = $("#term");
    const lines = [
      ["> whoami", ""],
      ["keith_baliza", "k"],
      ["", ""],
      ["> location", ""],
      ["Taguig City, Philippines", "k"],
      ["", ""],
      ["> focus", ""],
      ["ai_automation", "k"],
      ["web_development", "k"],
      ["virtual_assistance", "k"],
      ["", ""],
      ["> status", ""],
      ["ready_for_new_projects", "k"]
    ];
    if (reduceMotion) {
      lines.forEach(([t, k]) => { const s = h("span", k, t + "\n"); el.append(s); });
      return;
    }
    let li = 0, ci = 0, cur = null;
    const cursor = h("span", "blink", "█");
    (function type() {
      if (li >= lines.length) { el.append(cursor); return; }
      const [text, k] = lines[li];
      if (!cur) { cur = h("span", k); el.append(cur); }
      cur.textContent = text.slice(0, ++ci);
      el.append(cursor);
      if (ci >= text.length) { el.insertBefore(document.createTextNode("\n"), cursor); li++; ci = 0; cur = null; return setTimeout(type, text ? 220 : 60); }
      setTimeout(type, 28);
    })();
  }

  /* ---------------- Stats counters ---------------- */
  const counters = $$("[data-count]");
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count;
      countObs.unobserve(el);
      if (reduceMotion) { el.textContent = end; return; }
      let n = 0;
      const t = setInterval(() => { n++; el.textContent = n; if (n >= end) clearInterval(t); }, 220);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => countObs.observe(c));

  /* ---------------- Nav highlight + cursor trail + misc ---------------- */
  const navLinks = $$(".nav a");
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  $$("main section[id]").forEach((s) => secObs.observe(s));

  if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
    let last = 0;
    addEventListener("mousemove", (e) => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;
      const d = h("div", "trail");
      d.style.left = e.clientX + 6 + "px";
      d.style.top = e.clientY + 6 + "px";
      document.body.append(d);
      setTimeout(() => d.remove(), 560);
    });
  }
  $("#year").textContent = new Date().getFullYear();

  /* ---------------- Storage (IndexedDB with memory fallback) ---------------- */
  const Store = {
    db: null,
    mem: new Map(),
    async open() {
      try {
        await new Promise((res, rej) => {
          const r = indexedDB.open("kb-portfolio", 1);
          r.onupgradeneeded = () => r.result.createObjectStore("cards", { keyPath: "id" });
          r.onsuccess = () => { this.db = r.result; res(); };
          r.onerror = () => rej(r.error);
        });
      } catch (e) {
        this.db = null;
        $("#storeWarn").hidden = false;
      }
    },
    req(mode, fn) {
      return new Promise((res, rej) => {
        const q = fn(this.db.transaction("cards", mode).objectStore("cards"));
        q.onsuccess = () => res(q.result);
        q.onerror = () => rej(q.error);
      });
    },
    all() { return this.db ? this.req("readonly", (s) => s.getAll()) : Promise.resolve([...this.mem.values()]); },
    put(c) { if (!this.db) { this.mem.set(c.id, c); return Promise.resolve(); } return this.req("readwrite", (s) => s.put(c)); },
    del(id) { if (!this.db) { this.mem.delete(id); return Promise.resolve(); } return this.req("readwrite", (s) => s.delete(id)); }
  };

  /* ---------------- Projects ---------------- */
  let cards = [];
  let cat = "ai";
  let editing = false;
  let urls = [];
  let replaceId = null;

  const deletedIds = () => { try { return JSON.parse(lsGet("kb-deleted", "[]")); } catch { return []; } };

  async function seed() {
    const have = new Set((await Store.all()).map((c) => c.id));
    const gone = deletedIds();
    for (const d of window.DEFAULT_CARDS || []) {
      if (!have.has(d.id) && !gone.includes(d.id)) await Store.put(JSON.parse(JSON.stringify(d)));
    }
  }
  async function load() {
    cards = (await Store.all()).sort((a, b) => a.order - b.order);
  }

  function fileKind(f) {
    if (f.type.startsWith("video")) return "video";
    if (f.type.startsWith("image")) return "image";
    return "json";
  }

  function fillMedia(box, c) {
    box.replaceChildren();
    const m = c.media;
    if (!m) {
      box.append(h("div", "empty", editing ? "NO MEDIA YET\nUse Replace media below" : "DEMO COMING SOON"));
      box.firstChild.style.whiteSpace = "pre-line";
      return;
    }
    const src = m.blob ? URL.createObjectURL(m.blob) : m.src;
    if (m.blob) urls.push(src);
    if (m.type === "video") {
      const v = document.createElement("video");
      v.src = src; v.controls = true; v.preload = "metadata"; v.playsInline = true;
      box.append(v);
    } else if (m.type === "image") {
      const i = document.createElement("img");
      i.src = src; i.alt = c.title;
      box.append(i);
    } else {
      const wf = h("div", "wf");
      const icon = h("div", "wf-icon");
      for (let n = 0; n < 6; n++) icon.append(document.createElement("i"));
      wf.append(icon, h("p", "", m.name || "workflow.json"));
      wf.append(h("small", "", m.nodes ? m.nodes + " nodes in this n8n workflow" : "n8n workflow file"));
      const a = h("a", "btn small", "Download workflow");
      a.href = src; a.download = m.name || "workflow.json";
      wf.append(a);
      box.append(wf);
    }
  }

  function cardEl(c) {
    const el = h("article", "card");
    const media = h("div", "media");
    fillMedia(media, c);

    const body = h("div", "body");
    const title = h("h3", "c-title", c.title);
    const desc = h("p", "c-desc", c.desc);
    title.contentEditable = editing;
    desc.contentEditable = editing;
    title.spellcheck = desc.spellcheck = true;

    const save = (patch) => { Object.assign(c, patch); Store.put(c); };
    title.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); title.blur(); } });
    title.addEventListener("blur", () => { if (editing) save({ title: title.textContent.trim() || "Untitled project" }); });
    desc.addEventListener("blur", () => { if (editing) save({ desc: desc.innerText.trim() }); });

    let tags;
    if (editing) {
      tags = h("div", "tags-edit", (c.tags || []).join(", "));
      tags.contentEditable = true;
      tags.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); tags.blur(); } });
      tags.addEventListener("blur", () => {
        save({ tags: tags.textContent.split(",").map((t) => t.trim()).filter(Boolean) });
        tags.textContent = c.tags.join(", ");
      });
    } else {
      tags = h("div", "tags");
      (c.tags || []).forEach((t) => tags.append(h("span", "", t)));
    }

    const actions = h("div", "card-actions");
    const rep = h("button", "btn small", "Replace media");
    rep.type = "button";
    rep.addEventListener("click", () => { replaceId = c.id; $("#fileReplace").click(); });
    const del = h("button", "btn small danger", "Delete");
    del.type = "button";
    del.addEventListener("click", async () => {
      if (!confirm('Delete "' + c.title + '"?')) return;
      await Store.del(c.id);
      if ((window.DEFAULT_CARDS || []).some((d) => d.id === c.id)) {
        const gone = deletedIds(); gone.push(c.id); lsSet("kb-deleted", JSON.stringify(gone));
      }
      cards = cards.filter((x) => x.id !== c.id);
      render();
      toast("Deleted");
    });
    actions.append(rep, del);

    body.append(title, desc, tags, actions);
    el.append(media, body);
    return el;
  }

  function render() {
    urls.forEach((u) => URL.revokeObjectURL(u));
    urls = [];
    const grid = $("#grid");
    grid.replaceChildren();
    grid.classList.toggle("wide", cat === "ai");
    const list = cards.filter((c) => c.cat === cat);
    if (!list.length) {
      grid.append(h("div", "empty-tab", editing
        ? "Nothing here yet. Click \"+ Add from my files\" to pick a video, screenshot or n8n workflow."
        : "New projects are coming soon."));
      return;
    }
    list.forEach((c) => grid.append(cardEl(c)));
  }

  async function addFiles(files) {
    for (const f of files) {
      const type = fileKind(f);
      let nodes;
      if (type === "json") {
        try { nodes = (JSON.parse(await f.text()).nodes || []).length || undefined; } catch {}
      }
      const c = {
        id: "u" + Date.now() + Math.random().toString(36).slice(2, 6),
        cat,
        order: Date.now(),
        title: f.name.replace(/\.[^.]+$/, ""),
        desc: "Click here and explain this project: the problem, what you built, the tools you used, and the result.",
        tags: [],
        media: { type, name: f.name, blob: f, nodes }
      };
      await Store.put(c);
      cards.push(c);
    }
    render();
    toast(files.length > 1 ? files.length + " projects added" : "Project added. Now edit the text.");
    const last = $$("#grid .card").pop();
    if (last) last.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function setEditing(on) {
    editing = on;
    document.body.classList.toggle("editing", on);
    $("#editBar").hidden = !on;
    render();
    if (on) {
      $("#projects").scrollIntoView({ behavior: "smooth" });
      toast("Edit mode on");
    }
  }

  /* tabs */
  $$(".tab").forEach((b) => b.addEventListener("click", () => {
    cat = b.dataset.cat;
    $$(".tab").forEach((t) => { const on = t === b; t.classList.toggle("active", on); t.setAttribute("aria-selected", String(on)); });
    render();
  }));

  /* edit bar */
  $("#addBtn").addEventListener("click", () => $("#fileAdd").click());
  $("#fileAdd").addEventListener("change", (e) => { if (e.target.files.length) addFiles([...e.target.files]); e.target.value = ""; });
  $("#fileReplace").addEventListener("change", async (e) => {
    const f = e.target.files[0];
    e.target.value = "";
    const c = cards.find((x) => x.id === replaceId);
    if (!f || !c) return;
    let nodes;
    if (fileKind(f) === "json") { try { nodes = (JSON.parse(await f.text()).nodes || []).length || undefined; } catch {} }
    c.media = { type: fileKind(f), name: f.name, blob: f, nodes };
    await Store.put(c);
    render();
    toast("Media replaced");
  });
  $("#exitEdit").addEventListener("click", () => setEditing(false));
  $("#resetBtn").addEventListener("click", async () => {
    if (!confirm("Restore the default project cards? Your edits to those defaults will be replaced. Projects you added yourself stay.")) return;
    for (const d of window.DEFAULT_CARDS || []) await Store.put(JSON.parse(JSON.stringify(d)));
    lsSet("kb-deleted", "[]");
    await load();
    render();
    toast("Defaults restored");
  });

  /* open edit mode: Ctrl+Shift+E, or add ?edit to the address */
  addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") { e.preventDefault(); setEditing(!editing); }
  });

  (async function init() {
    await Store.open();
    await seed();
    await load();
    render();
    if (new URLSearchParams(location.search).has("edit")) setEditing(true);
  })();
})();
