export interface GridItem {
  label: string;
  bg: string;
  width?: number;
  height?: number;
}

export type EditTarget = "container" | number;

export interface GridLevel {
  id: number;
  chapter: string;
  chapterIndex: number;
  title: string;
  description: string;
  hint: string;
  explanation: string;
  items: GridItem[];
  containerHeight: number;
  targetContainerCSS: Record<string, string>;
  targetItemCSS?: Record<number, Record<string, string>>;
  lockedCSS: Record<string, string>;
  editTarget: EditTarget;
  checkProps: Record<string, string[]>;
  editorLabel?: string;
  solution: string;
}

export const GRID_TOTAL_LEVELS = 20;

const COLORS = [
  "#8b5cf6", "#0ea5e9", "#f43f5e", "#f97316",
  "#10b981", "#a855f7", "#06b6d4", "#ec4899",
];

function makeItems(count: number): GridItem[] {
  const labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  return Array.from({ length: count }, (_, i) => ({
    label: labels[i],
    bg: COLORS[i % COLORS.length],
  }));
}

export const gridLevels: GridLevel[] = [

  // ── Chapter 1: Grid Basics ──────────────────────────────────────────────────
  {
    id: 1,
    chapter: "Grid Basics",
    chapterIndex: 1,
    title: "Enter the Grid",
    description:
      "These items are stacking vertically. The columns are already set — just make this container a **grid**.",
    hint: "Try `display: grid;`",
    explanation:
      "`display: grid` creates a **grid formatting context**. Child elements become grid items and flow into the defined column tracks. Without it, `grid-template-columns` has no effect.",
    items: makeItems(6),
    containerHeight: 160,
    targetContainerCSS: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr" },
    lockedCSS: { gridTemplateColumns: "1fr 1fr 1fr" },
    editTarget: "container",
    checkProps: { display: ["grid"] },
    solution: "display: grid;",
  },

  {
    id: 2,
    chapter: "Grid Basics",
    chapterIndex: 1,
    title: "Column Blueprint",
    description:
      "Create **3 equal columns** in this grid. Use `fr` units — they divide available space proportionally.",
    hint: "Try `grid-template-columns: 1fr 1fr 1fr;` — or the shorthand `repeat(3, 1fr)`",
    explanation:
      "`grid-template-columns` defines the column track sizes. The `fr` unit stands for *fraction* — `1fr 1fr 1fr` gives each column an equal share of available space.",
    items: makeItems(6),
    containerHeight: 160,
    targetContainerCSS: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr" },
    lockedCSS: { display: "grid" },
    editTarget: "container",
    checkProps: {
      gridTemplateColumns: ["1fr 1fr 1fr", "repeat(3, 1fr)", "repeat(3,1fr)"],
    },
    solution: "grid-template-columns: 1fr 1fr 1fr;",
  },

  {
    id: 3,
    chapter: "Grid Basics",
    chapterIndex: 1,
    title: "Space It Out",
    description:
      "Items feel cramped. Add a **16px gap** between all grid cells — both rows and columns.",
    hint: "Try `gap: 16px;` — this sets both `row-gap` and `column-gap` at once",
    explanation:
      "`gap` is shorthand for `row-gap column-gap`. Setting `gap: 16px` adds equal spacing between every row and column track, without adding margin to the outer edges.",
    items: makeItems(6),
    containerHeight: 190,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "16px",
    },
    lockedCSS: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr" },
    editTarget: "container",
    checkProps: { gap: ["16px"] },
    solution: "gap: 16px;",
  },

  // ── Chapter 2: Columns & fr Units ──────────────────────────────────────────
  {
    id: 4,
    chapter: "Columns & fr",
    chapterIndex: 2,
    title: "The repeat() Trick",
    description:
      "Create **4 equal columns** using the `repeat()` function — don't write `1fr` four times.",
    hint: "Try `grid-template-columns: repeat(4, 1fr);`",
    explanation:
      "`repeat(count, size)` is shorthand so you don't have to type the same value repeatedly. `repeat(4, 1fr)` is identical to `1fr 1fr 1fr 1fr` but much more readable and maintainable.",
    items: makeItems(8),
    containerHeight: 170,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "12px",
    },
    lockedCSS: { display: "grid", gap: "12px" },
    editTarget: "container",
    checkProps: {
      gridTemplateColumns: [
        "repeat(4, 1fr)",
        "repeat(4,1fr)",
        "1fr 1fr 1fr 1fr",
      ],
    },
    solution: "grid-template-columns: repeat(4, 1fr);",
  },

  {
    id: 5,
    chapter: "Columns & fr",
    chapterIndex: 2,
    title: "Sidebar Layout",
    description:
      "Create a sidebar layout: a **fixed 200px** first column and a **flexible** second column that fills the rest.",
    hint: "Try `grid-template-columns: 200px 1fr;`",
    explanation:
      "You can mix fixed and flexible units! `200px 1fr` gives the first column a fixed width and the second column all remaining space. This is the classic sidebar pattern.",
    items: makeItems(4),
    containerHeight: 170,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "200px 1fr",
      gap: "12px",
    },
    lockedCSS: { display: "grid", gap: "12px" },
    editTarget: "container",
    checkProps: { gridTemplateColumns: ["200px 1fr"] },
    solution: "grid-template-columns: 200px 1fr;",
  },

  {
    id: 6,
    chapter: "Columns & fr",
    chapterIndex: 2,
    title: "Tall Rows",
    description:
      "The rows look too short. Define **2 rows of 90px** each using `grid-template-rows`.",
    hint: "Try `grid-template-rows: 90px 90px;` or `repeat(2, 90px)`",
    explanation:
      "`grid-template-rows` works just like `grid-template-columns` — it sets explicit heights for each row track. Items in row 1 get 90px, items in row 2 get 90px.",
    items: makeItems(6),
    containerHeight: 220,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "90px 90px",
      gap: "10px",
    },
    lockedCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "10px",
    },
    editTarget: "container",
    checkProps: {
      gridTemplateRows: ["90px 90px", "repeat(2, 90px)", "repeat(2,90px)"],
    },
    solution: "grid-template-rows: 90px 90px;",
  },

  // ── Chapter 3: Spanning ─────────────────────────────────────────────────────
  {
    id: 7,
    chapter: "Spanning",
    chapterIndex: 3,
    title: "Wide Open",
    description:
      "Make item **A** span across **2 columns** so it takes up double the width.",
    hint: "Edit item A. Try `grid-column: span 2;`",
    explanation:
      "`grid-column: span 2` tells the item to occupy 2 column tracks instead of 1. The browser automatically places remaining items after it, creating the natural flow you see.",
    items: makeItems(5),
    containerHeight: 180,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "10px",
    },
    targetItemCSS: { 0: { gridColumn: "span 2" } },
    lockedCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "10px",
    },
    editTarget: 0,
    editorLabel: "A",
    checkProps: {
      gridColumn: ["span 2", "1 / 3", "1 / span 2", "1/3", "1/span 2"],
    },
    solution: "grid-column: span 2;",
  },

  {
    id: 8,
    chapter: "Spanning",
    chapterIndex: 3,
    title: "Full Width",
    description:
      "Make item **A** stretch across **all 3 columns** — a full-width header row.",
    hint: "Try `grid-column: span 3;` or `grid-column: 1 / -1;`",
    explanation:
      "`grid-column: 1 / -1` is a clever trick — `-1` means *the last grid line*. So the item starts at line 1 and ends at the last line, no matter how many columns there are. More flexible than hardcoding `span 3`.",
    items: makeItems(5),
    containerHeight: 190,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "10px",
    },
    targetItemCSS: { 0: { gridColumn: "1 / -1" } },
    lockedCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "10px",
    },
    editTarget: 0,
    editorLabel: "A",
    checkProps: {
      gridColumn: ["1 / -1", "1/-1", "span 3", "1 / 4", "1/4", "1 / span 3"],
    },
    solution: "grid-column: 1 / -1;",
  },

  {
    id: 9,
    chapter: "Spanning",
    chapterIndex: 3,
    title: "Tall Item",
    description:
      "Make item **A** span **2 rows** tall — like a featured image next to smaller cards.",
    hint: "Try `grid-row: span 2;`",
    explanation:
      "`grid-row: span 2` makes the item occupy 2 row tracks. Combined with normal items flowing around it, this creates a *magazine-style* layout common in cards and dashboards.",
    items: makeItems(5),
    containerHeight: 210,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "90px 90px",
      gap: "10px",
    },
    targetItemCSS: { 0: { gridRow: "span 2" } },
    lockedCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "90px 90px",
      gap: "10px",
    },
    editTarget: 0,
    editorLabel: "A",
    checkProps: {
      gridRow: ["span 2", "1 / 3", "1/3", "1 / span 2"],
    },
    solution: "grid-row: span 2;",
  },

  {
    id: 10,
    chapter: "Spanning",
    chapterIndex: 3,
    title: "Precise Placement",
    description:
      "Place item **C** starting at column 2 and ending at column 4 — skipping the first column.",
    hint: "Try `grid-column: 2 / 4;`",
    explanation:
      "`grid-column: 2 / 4` uses *grid line numbers*. Lines are counted from the left, starting at 1. So `2 / 4` means: start at line 2, end at line 4 — which spans 2 columns.",
    items: makeItems(4),
    containerHeight: 180,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "10px",
    },
    targetItemCSS: { 2: { gridColumn: "2 / 4" } },
    lockedCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "10px",
    },
    editTarget: 2,
    editorLabel: "C",
    checkProps: {
      gridColumn: ["2 / 4", "2/4", "2 / span 2", "2/span 2"],
    },
    solution: "grid-column: 2 / 4;",
  },

  // ── Chapter 4: Alignment ────────────────────────────────────────────────────
  {
    id: 11,
    chapter: "Alignment",
    chapterIndex: 4,
    title: "Center the Items",
    description:
      "Items stretch to fill their cells. **Center them horizontally** within each cell instead.",
    hint: "Try `justify-items: center;`",
    explanation:
      "`justify-items` controls how items are aligned along the *inline (horizontal) axis* within their cell. Default is `stretch`. Setting it to `center` shrinks each item to its natural width and centers it.",
    items: makeItems(4).map((item) => ({ ...item, width: 60, height: 60 })),
    containerHeight: 180,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      justifyItems: "center",
    },
    lockedCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
    },
    editTarget: "container",
    checkProps: { justifyItems: ["center"] },
    solution: "justify-items: center;",
  },

  {
    id: 12,
    chapter: "Alignment",
    chapterIndex: 4,
    title: "Vertical Center",
    description:
      "The rows are tall but items sit at the top. **Align items to the center** of each row.",
    hint: "Try `align-items: center;`",
    explanation:
      "`align-items` controls alignment on the *block (vertical) axis* within each cell. With explicit row heights, this lets you center items vertically — just like in flexbox.",
    items: makeItems(4).map((item) => ({ ...item, width: 60, height: 60 })),
    containerHeight: 220,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "100px 100px",
      gap: "12px",
      alignItems: "center",
    },
    lockedCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "100px 100px",
      gap: "12px",
    },
    editTarget: "container",
    checkProps: { alignItems: ["center"] },
    solution: "align-items: center;",
  },

  {
    id: 13,
    chapter: "Alignment",
    chapterIndex: 4,
    title: "Place It All",
    description:
      "Center items both **horizontally and vertically** in one declaration.",
    hint: "Try `place-items: center;`",
    explanation:
      "`place-items` is shorthand for `align-items justify-items`. Writing `place-items: center` centers items on both axes at once — clean and concise.",
    items: makeItems(6).map((item) => ({ ...item, width: 60, height: 60 })),
    containerHeight: 230,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "100px 100px",
      gap: "12px",
      placeItems: "center",
    },
    lockedCSS: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "100px 100px",
      gap: "12px",
    },
    editTarget: "container",
    checkProps: {
      placeItems: ["center", "center center"],
    },
    solution: "place-items: center;",
  },

  // ── Chapter 5: Real World ───────────────────────────────────────────────────
  {
    id: 14,
    chapter: "Real World",
    chapterIndex: 5,
    title: "Flow Sideways",
    description:
      "By default items flow left-to-right, row by row. Make them flow **column by column** instead.",
    hint: "Try `grid-auto-flow: column;`",
    explanation:
      "`grid-auto-flow: column` changes how implicit tracks are created. Instead of adding new rows, the grid adds new columns. Items flow top-to-bottom, then start the next column — great for vertical lists.",
    items: makeItems(6),
    containerHeight: 210,
    targetContainerCSS: {
      display: "grid",
      gridTemplateRows: "repeat(3, 60px)",
      gridAutoFlow: "column",
      gap: "10px",
    },
    lockedCSS: {
      display: "grid",
      gridTemplateRows: "repeat(3, 60px)",
      gap: "10px",
    },
    editTarget: "container",
    checkProps: { gridAutoFlow: ["column"] },
    solution: "grid-auto-flow: column;",
  },

  {
    id: 15,
    chapter: "Real World",
    chapterIndex: 5,
    title: "Responsive Grid",
    description:
      "Create a grid that **auto-fills** as many columns as fit, each at least **80px** wide.",
    hint: "Try `grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));`",
    explanation:
      "`repeat(auto-fill, minmax(80px, 1fr))` is the holy grail of responsive grids — no media queries needed! `auto-fill` creates as many columns as fit. `minmax(80px, 1fr)` means each column is *at least* 80px but can grow to fill space.",
    items: makeItems(8),
    containerHeight: 200,
    targetContainerCSS: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
      gap: "10px",
    },
    lockedCSS: { display: "grid", gap: "10px" },
    editTarget: "container",
    checkProps: {
      gridTemplateColumns: [
        "repeat(auto-fill, minmax(80px, 1fr))",
        "repeat(auto-fill,minmax(80px,1fr))",
        "repeat(auto-fill, minmax(80px,1fr))",
      ],
    },
    solution: "grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));",
  },

  // ── Chapter 6: Advanced ─────────────────────────────────────────────────────
  {
    id: 16,
    chapter: "Advanced",
    chapterIndex: 6,
    title: "Two Sidebars",
    description:
      "Create a classic **Holy Grail** column structure: a **160px left sidebar**, a fluid center, and a **160px right sidebar**.",
    hint: "Try `grid-template-columns: 160px 1fr 160px;`",
    explanation:
      "Mixing fixed `px` and fluid `fr` units is a key Grid technique. The `1fr` column stretches to fill all remaining space after the fixed sidebars are placed. This pattern powers most app layouts.",
    items: makeItems(3),
    containerHeight: 110,
    targetContainerCSS: { display: "grid", gridTemplateColumns: "160px 1fr 160px", gap: "10px" },
    lockedCSS: { display: "grid", gap: "10px" },
    editTarget: "container",
    checkProps: { gridTemplateColumns: ["160px 1fr 160px"] },
    solution: "grid-template-columns: 160px 1fr 160px;",
  },
  {
    id: 17,
    chapter: "Advanced",
    chapterIndex: 6,
    title: "Tall Item",
    description:
      "Make Item B span **2 rows** tall, stretching to fill the full height of the grid while other items fit beside it.",
    hint: "Use `grid-row: span 2;` on Item B.",
    explanation:
      "`grid-row: span 2` tells an item to occupy **two consecutive row tracks**. This is the shorthand for `grid-row-start: auto; grid-row-end: span 2`. It's how you create magazine-style or dashboard card layouts.",
    items: makeItems(5),
    containerHeight: 180,
    targetContainerCSS: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "70px", gap: "8px" },
    targetItemCSS: { 1: { gridRow: "span 2" } },
    lockedCSS: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "70px", gap: "8px" },
    editTarget: 1,
    editorLabel: "Item B",
    checkProps: { gridRow: ["span 2", "1 / 3", "1 / span 2"] },
    solution: "grid-row: span 2;",
  },
  {
    id: 18,
    chapter: "Advanced",
    chapterIndex: 6,
    title: "Wide Item",
    description:
      "Make Item A span **columns 1 through 2**, taking up twice the width of a normal cell.",
    hint: "Use `grid-column: 1 / 3;` on Item A — or try `grid-column: span 2;`",
    explanation:
      "`grid-column: 1 / 3` means start at column line 1 and end at line 3 — spanning 2 columns. You can also use `span 2` which means 'span 2 tracks from wherever you start'. Both approaches work great for hero images, wide cards, or full-width banners.",
    items: makeItems(5),
    containerHeight: 180,
    targetContainerCSS: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "70px", gap: "8px" },
    targetItemCSS: { 0: { gridColumn: "1 / 3" } },
    lockedCSS: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "70px", gap: "8px" },
    editTarget: 0,
    editorLabel: "Item A",
    checkProps: { gridColumn: ["1 / 3", "1 / span 2", "span 2"] },
    solution: "grid-column: 1 / 3;",
  },
  {
    id: 19,
    chapter: "Advanced",
    chapterIndex: 6,
    title: "Auto Row Height",
    description:
      "Implicitly-created rows collapse to the content size. Make every auto-generated row exactly **80px** tall.",
    hint: "Use `grid-auto-rows: 80px;` on the container.",
    explanation:
      "`grid-auto-rows` sets the size of rows that are **automatically created** when content overflows the explicit grid. Without it, rows shrink to fit. Setting a fixed height ensures a consistent, uniform grid regardless of how many items are added.",
    items: makeItems(6),
    containerHeight: 200,
    targetContainerCSS: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "80px", gap: "8px" },
    lockedCSS: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" },
    editTarget: "container",
    checkProps: { gridAutoRows: ["80px"] },
    solution: "grid-auto-rows: 80px;",
  },
  {
    id: 20,
    chapter: "Advanced",
    chapterIndex: 6,
    title: "Auto-Fit Grid",
    description:
      "Create a grid that **auto-fits** columns with a minimum width of **100px**. Like auto-fill but it collapses empty tracks.",
    hint: "Try `grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));`",
    explanation:
      "`auto-fit` works like `auto-fill` but **collapses empty tracks** to zero width. This means if you have 3 items in a 6-column space, the items stretch to fill instead of leaving gaps. Use `auto-fit` when you want items to always fill the available width.",
    items: makeItems(5),
    containerHeight: 190,
    targetContainerCSS: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "10px" },
    lockedCSS: { display: "grid", gap: "10px" },
    editTarget: "container",
    checkProps: { gridTemplateColumns: ["repeat(auto-fit, minmax(100px, 1fr))", "repeat(auto-fit,minmax(100px,1fr))", "repeat(auto-fit, minmax(100px,1fr))"] },
    solution: "grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));",
  },
];
