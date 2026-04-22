export interface MediaItem {
  label: string;
  bg: string;
}

export interface MediaLevel {
  id: number;
  chapter: string;
  chapterIndex: number;
  title: string;
  description: string;
  hint: string;
  explanation: string;
  items: MediaItem[];
  containerHeight: number;
  baseCSS: Record<string, string>;
  targetMobileCSS: Record<string, string>;
  breakpoint: number;
  breakpointType: "max-width" | "min-width";
  checkProps: Record<string, string[]>;
  solution: string;
}

export const MEDIA_TOTAL_LEVELS = 15;

const COLORS = [
  "#8b5cf6", "#0ea5e9", "#f43f5e", "#f97316",
  "#10b981", "#a855f7", "#06b6d4",
];

function makeItems(count: number): MediaItem[] {
  const labels = ["A", "B", "C", "D", "E", "F"];
  return Array.from({ length: count }, (_, i) => ({
    label: labels[i],
    bg: COLORS[i % COLORS.length],
  }));
}

export const mediaLevels: MediaLevel[] = [

  // ── Chapter 1: Breakpoints ──────────────────────────────────────────────────
  {
    id: 1,
    chapter: "Breakpoints",
    chapterIndex: 1,
    title: "Your First Breakpoint",
    description:
      "On desktop, items sit in a **row**. Below **600px**, make them stack in a **column**. Write a `max-width` media query.",
    hint: "Try:\n`@media (max-width: 600px) {\n  flex-direction: column;\n}`",
    explanation:
      "`@media (max-width: 600px)` applies styles only when the screen is 600px or narrower. This is the *desktop-first* approach — start wide, then override for small screens.",
    items: makeItems(3),
    containerHeight: 130,
    baseCSS: { display: "flex", flexDirection: "row", gap: "10px" },
    targetMobileCSS: { flexDirection: "column" },
    breakpoint: 600,
    breakpointType: "max-width",
    checkProps: { flexDirection: ["column"] },
    solution: "@media (max-width: 600px) {\n  flex-direction: column;\n}",
  },

  {
    id: 2,
    chapter: "Breakpoints",
    chapterIndex: 1,
    title: "Mobile-First",
    description:
      "Start with a **column** layout (mobile-first). On screens **768px and wider**, switch to a **row**.",
    hint: "Use `min-width` this time:\n`@media (min-width: 768px) {\n  flex-direction: row;\n}`",
    explanation:
      "`@media (min-width: 768px)` applies when the screen is *at least* 768px wide. **Mobile-first** means your base styles target small screens, and media queries *enhance* for larger ones — this is the recommended modern approach.",
    items: makeItems(3),
    containerHeight: 130,
    baseCSS: { display: "flex", flexDirection: "column", gap: "10px" },
    targetMobileCSS: { flexDirection: "row" },
    breakpoint: 768,
    breakpointType: "min-width",
    checkProps: { flexDirection: ["row"] },
    solution: "@media (min-width: 768px) {\n  flex-direction: row;\n}",
  },

  {
    id: 3,
    chapter: "Breakpoints",
    chapterIndex: 1,
    title: "Multi-Property",
    description:
      "At mobile (≤ 600px): stack items in a **column** AND center them horizontally.",
    hint: "You can set multiple properties inside one @media block:\n`@media (max-width: 600px) {\n  flex-direction: column;\n  align-items: center;\n}`",
    explanation:
      "Media query blocks can contain as many CSS declarations as needed. All rules inside apply together when the condition matches — there's no limit to how much you can change between breakpoints.",
    items: makeItems(3),
    containerHeight: 130,
    baseCSS: { display: "flex", flexDirection: "row", gap: "10px" },
    targetMobileCSS: { flexDirection: "column", alignItems: "center" },
    breakpoint: 600,
    breakpointType: "max-width",
    checkProps: { flexDirection: ["column"], alignItems: ["center"] },
    solution:
      "@media (max-width: 600px) {\n  flex-direction: column;\n  align-items: center;\n}",
  },

  // ── Chapter 2: Layout Changes ────────────────────────────────────────────────
  {
    id: 4,
    chapter: "Layout Changes",
    chapterIndex: 2,
    title: "Reverse on Mobile",
    description:
      "On mobile (≤ 500px), reverse the order — show items from **right to left** (`row-reverse`).",
    hint: "Try `@media (max-width: 500px) { flex-direction: row-reverse; }`",
    explanation:
      "`flex-direction: row-reverse` flips the order visually without changing the HTML structure. This is useful for mobile layouts where you want secondary content to appear after primary content.",
    items: makeItems(3),
    containerHeight: 110,
    baseCSS: { display: "flex", flexDirection: "row", gap: "10px" },
    targetMobileCSS: { flexDirection: "row-reverse" },
    breakpoint: 500,
    breakpointType: "max-width",
    checkProps: { flexDirection: ["row-reverse"] },
    solution: "@media (max-width: 500px) {\n  flex-direction: row-reverse;\n}",
  },

  {
    id: 5,
    chapter: "Layout Changes",
    chapterIndex: 2,
    title: "Space Out on Desktop",
    description:
      "On wide screens (≥ 768px), spread items with **space-between** instead of grouped together.",
    hint: "Try `@media (min-width: 768px) { justify-content: space-between; }`",
    explanation:
      "`justify-content: space-between` places the first item at the start, the last item at the end, and distributes remaining items evenly between them — perfect for navigation bars on wide screens.",
    items: makeItems(4),
    containerHeight: 110,
    baseCSS: { display: "flex", justifyContent: "flex-start", gap: "10px" },
    targetMobileCSS: { justifyContent: "space-between" },
    breakpoint: 768,
    breakpointType: "min-width",
    checkProps: { justifyContent: ["space-between"] },
    solution:
      "@media (min-width: 768px) {\n  justify-content: space-between;\n}",
  },

  {
    id: 6,
    chapter: "Layout Changes",
    chapterIndex: 2,
    title: "Wrap on Mobile",
    description:
      "On mobile (≤ 480px), allow items to **wrap** onto multiple lines instead of overflowing.",
    hint: "Try `@media (max-width: 480px) { flex-wrap: wrap; }`",
    explanation:
      "`flex-wrap: wrap` lets items flow onto the next line when they don't fit. On desktop, the row is wide enough — no wrapping needed. On mobile, wrapping prevents overflow and keeps items visible.",
    items: makeItems(5),
    containerHeight: 150,
    baseCSS: { display: "flex", flexWrap: "nowrap", gap: "10px" },
    targetMobileCSS: { flexWrap: "wrap" },
    breakpoint: 480,
    breakpointType: "max-width",
    checkProps: { flexWrap: ["wrap"] },
    solution: "@media (max-width: 480px) {\n  flex-wrap: wrap;\n}",
  },

  {
    id: 7,
    chapter: "Layout Changes",
    chapterIndex: 2,
    title: "Grid on Desktop",
    description:
      "On wide screens (≥ 600px), switch from a flex column to a **2-column grid**.",
    hint: "Try `@media (min-width: 600px) { display: grid; grid-template-columns: 1fr 1fr; }`",
    explanation:
      "You can switch between layout modes with media queries! A single-column stack on mobile becomes a grid on desktop. This is a very common pattern for card grids and galleries.",
    items: makeItems(4),
    containerHeight: 160,
    baseCSS: { display: "flex", flexDirection: "column", gap: "10px" },
    targetMobileCSS: { display: "grid", gridTemplateColumns: "1fr 1fr" },
    breakpoint: 600,
    breakpointType: "min-width",
    checkProps: {
      display: ["grid"],
      gridTemplateColumns: ["1fr 1fr", "repeat(2, 1fr)", "repeat(2,1fr)"],
    },
    solution:
      "@media (min-width: 600px) {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}",
  },

  // ── Chapter 3: Advanced ──────────────────────────────────────────────────────
  {
    id: 8,
    chapter: "Advanced",
    chapterIndex: 3,
    title: "Column Stack at 500px",
    description:
      "Stack items in a column at **500px or less**. Use the exact `500px` breakpoint.",
    hint: "`@media (max-width: 500px) { flex-direction: column; }`",
    explanation:
      "Breakpoints should be chosen based on where your *content breaks* — not based on specific device sizes. 500px is a common breakpoint for small phones in landscape or narrow browser windows.",
    items: makeItems(3),
    containerHeight: 130,
    baseCSS: { display: "flex", flexDirection: "row", gap: "12px", alignItems: "center" },
    targetMobileCSS: { flexDirection: "column" },
    breakpoint: 500,
    breakpointType: "max-width",
    checkProps: { flexDirection: ["column"] },
    solution: "@media (max-width: 500px) {\n  flex-direction: column;\n}",
  },

  {
    id: 9,
    chapter: "Advanced",
    chapterIndex: 3,
    title: "Align Center at 640px",
    description:
      "On screens **640px or narrower**, center the items horizontally and change direction to **column**.",
    hint: "Combine `flex-direction: column` and `align-items: center` in one query at `max-width: 640px`",
    explanation:
      "Combining layout direction and alignment changes in one breakpoint is common. When going from `row` to `column`, alignment axes swap — `justify-content` controls vertical placement and `align-items` controls horizontal.",
    items: makeItems(3),
    containerHeight: 130,
    baseCSS: { display: "flex", flexDirection: "row", gap: "12px" },
    targetMobileCSS: { flexDirection: "column", alignItems: "center" },
    breakpoint: 640,
    breakpointType: "max-width",
    checkProps: { flexDirection: ["column"], alignItems: ["center"] },
    solution:
      "@media (max-width: 640px) {\n  flex-direction: column;\n  align-items: center;\n}",
  },

  {
    id: 10,
    chapter: "Advanced",
    chapterIndex: 3,
    title: "Three Columns Wide",
    description:
      "On screens **900px and wider**, create a **3-column grid**. Mobile stays as a flex column.",
    hint: "Use `min-width: 900px` and set `display: grid` with 3 equal columns",
    explanation:
      "This is a real-world pattern: stack content on mobile, expand to a multi-column grid on desktop — with zero JavaScript. The browser handles it all through media queries and CSS layout.",
    items: makeItems(6),
    containerHeight: 190,
    baseCSS: { display: "flex", flexDirection: "column", gap: "10px" },
    targetMobileCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    breakpoint: 900,
    breakpointType: "min-width",
    checkProps: {
      display: ["grid"],
      gridTemplateColumns: [
        "1fr 1fr 1fr",
        "repeat(3, 1fr)",
        "repeat(3,1fr)",
      ],
    },
    solution:
      "@media (min-width: 900px) {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}",
  },

  // ── Chapter 4: Real World ───────────────────────────────────────────────────
  {
    id: 11,
    chapter: "Real World",
    chapterIndex: 4,
    title: "Reverse on Mobile",
    description:
      "On screens **480px or narrower**, flip the row so items appear in **reverse order** — right-to-left.",
    hint: "Use `flex-direction: row-reverse;` inside a `max-width: 480px` query.",
    explanation:
      "`row-reverse` is useful when you want mobile users to see the most important item first without changing HTML order. Combined with media queries, you get full control over visual order at different breakpoints.",
    items: makeItems(3),
    containerHeight: 100,
    baseCSS: { display: "flex", flexDirection: "row", gap: "12px", alignItems: "center" },
    targetMobileCSS: { flexDirection: "row-reverse" },
    breakpoint: 480,
    breakpointType: "max-width",
    checkProps: { flexDirection: ["row-reverse"] },
    solution: "@media (max-width: 480px) {\n  flex-direction: row-reverse;\n}",
  },
  {
    id: 12,
    chapter: "Real World",
    chapterIndex: 4,
    title: "Wrap on Mobile",
    description:
      "Items are forced onto one line and overflow. On screens **600px or narrower**, let them **wrap** to the next line.",
    hint: "Use `flex-wrap: wrap;` inside a `max-width: 600px` query.",
    explanation:
      "`flex-wrap: wrap` allows items to break onto new lines instead of shrinking or overflowing. This is one of the simplest and most effective responsive techniques — no grid needed for basic wrapping behavior.",
    items: makeItems(5),
    containerHeight: 140,
    baseCSS: { display: "flex", flexWrap: "nowrap", gap: "8px" },
    targetMobileCSS: { flexWrap: "wrap" },
    breakpoint: 600,
    breakpointType: "max-width",
    checkProps: { flexWrap: ["wrap"] },
    solution: "@media (max-width: 600px) {\n  flex-wrap: wrap;\n}",
  },
  {
    id: 13,
    chapter: "Real World",
    chapterIndex: 4,
    title: "Desktop Three-Pack",
    description:
      "Items stack vertically on mobile. On screens **768px and wider**, switch to a **3-column grid** layout.",
    hint: "Use `min-width: 768px` and set `display: grid` with 3 equal columns.",
    explanation:
      "Switching between a flex column stack on mobile and a CSS Grid on desktop is a very common real-world pattern. The browser handles all transitions automatically — no JavaScript, no visibility toggling.",
    items: makeItems(3),
    containerHeight: 190,
    baseCSS: { display: "flex", flexDirection: "column", gap: "10px" },
    targetMobileCSS: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)" },
    breakpoint: 768,
    breakpointType: "min-width",
    checkProps: {
      display: ["grid"],
      gridTemplateColumns: ["repeat(3, 1fr)", "repeat(3,1fr)", "1fr 1fr 1fr"],
    },
    solution: "@media (min-width: 768px) {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}",
  },
  {
    id: 14,
    chapter: "Real World",
    chapterIndex: 4,
    title: "Space Out on Mobile",
    description:
      "On screens **540px or narrower**, spread items to the **edges** of the container with maximum space between them.",
    hint: "Use `justify-content: space-between;` inside a `max-width: 540px` query.",
    explanation:
      "`justify-content: space-between` pushes items to the edges of the container with equal space between them. On mobile it creates a clean, spread-out look perfect for toolbars, navigation bars, and icon rows.",
    items: makeItems(3),
    containerHeight: 100,
    baseCSS: { display: "flex", gap: "12px", alignItems: "center" },
    targetMobileCSS: { justifyContent: "space-between" },
    breakpoint: 540,
    breakpointType: "max-width",
    checkProps: { justifyContent: ["space-between"] },
    solution: "@media (max-width: 540px) {\n  justify-content: space-between;\n}",
  },
  {
    id: 15,
    chapter: "Real World",
    chapterIndex: 4,
    title: "Four on Desktop",
    description:
      "The grid shows **2 columns** on small screens. On **1024px and wider**, expand to **4 columns**.",
    hint: "Use `min-width: 1024px` and change `grid-template-columns` to 4 equal columns.",
    explanation:
      "Progressive enhancement with `min-width` breakpoints is mobile-first CSS. Start with a simple 2-column layout and enhance it for larger screens. Switching from `repeat(2, 1fr)` to `repeat(4, 1fr)` doubles the visual density on wide screens — common for product grids and dashboards.",
    items: makeItems(4),
    containerHeight: 170,
    baseCSS: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" },
    targetMobileCSS: { gridTemplateColumns: "repeat(4, 1fr)" },
    breakpoint: 1024,
    breakpointType: "min-width",
    checkProps: {
      gridTemplateColumns: ["repeat(4, 1fr)", "repeat(4,1fr)", "1fr 1fr 1fr 1fr"],
    },
    solution: "@media (min-width: 1024px) {\n  grid-template-columns: repeat(4, 1fr);\n}",
  },
];
