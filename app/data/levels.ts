export interface FlexItem {
  label: string;
  bg: string;
  width?: number;
  height?: number;
}

export type EditTarget = "container" | number;

export interface Level {
  id: number;
  chapter: string;
  chapterIndex: number;
  title: string;
  description: string;
  hint: string;
  explanation: string;
  items: FlexItem[];
  containerHeight: number;
  targetContainerCSS: Record<string, string>;
  targetItemCSS?: Record<number, Record<string, string>>;
  lockedCSS: Record<string, string>;
  editTarget: EditTarget;
  checkProps: Record<string, string[]>;
  editorLabel?: string;
  solution: string;
}

const COLORS = [
  "#8b5cf6",
  "#0ea5e9",
  "#f43f5e",
  "#f97316",
  "#10b981",
  "#a855f7",
  "#06b6d4",
];

function makeItems(count: number, options?: { heights?: number[] }): FlexItem[] {
  const labels = ["A", "B", "C", "D", "E", "F", "G", "H"];
  return Array.from({ length: count }, (_, i) => ({
    label: labels[i],
    bg: COLORS[i % COLORS.length],
    height: options?.heights?.[i],
  }));
}

export const TOTAL_LEVELS = 25;

export const levels: Level[] = [
  // ─────────────────────────────────────────────
  // CHAPTER 1: THE BASICS
  // ─────────────────────────────────────────────
  {
    id: 1,
    chapter: "The Basics",
    chapterIndex: 1,
    title: "Make it Flex!",
    description:
      "These boxes are stacked on top of each other. Use **display: flex** on the container to put them side by side in a row.",
    hint: "Add `display: flex;` to the container.",
    explanation:
      "When you set `display: flex`, the container becomes a **flex container** and its children become **flex items**. By default, items line up in a horizontal row along the **main axis**.",
    items: makeItems(3),
    containerHeight: 100,
    targetContainerCSS: { display: "flex" },
    lockedCSS: {},
    editTarget: "container",
    checkProps: { display: ["flex"] },
    solution: 'display: flex;',
  },
  {
    id: 2,
    chapter: "The Basics",
    chapterIndex: 1,
    title: "Go Vertical",
    description:
      "Items are in a row. Stack them **vertically** using `flex-direction`.",
    hint: "Try `flex-direction: column;`",
    explanation:
      "`flex-direction: column` rotates the **main axis** to run top-to-bottom. Items now stack vertically. The cross axis becomes horizontal.",
    items: makeItems(3),
    containerHeight: 200,
    targetContainerCSS: { display: "flex", flexDirection: "column" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { flexDirection: ["column"] },
    solution: 'flex-direction: column;',
  },
  {
    id: 3,
    chapter: "The Basics",
    chapterIndex: 1,
    title: "Flip the Row",
    description:
      "Reverse the order of items **without changing the HTML**. Items should go right-to-left.",
    hint: "Try `flex-direction: row-reverse;`",
    explanation:
      "`row-reverse` flips the main axis direction. Items still appear in the same DOM order but the layout starts from the right. Useful for RTL (right-to-left) languages!",
    items: makeItems(3),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", flexDirection: "row-reverse" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { flexDirection: ["row-reverse"] },
    solution: 'flex-direction: row-reverse;',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 2: JUSTIFY-CONTENT (MAIN AXIS)
  // ─────────────────────────────────────────────
  {
    id: 4,
    chapter: "Main Axis",
    chapterIndex: 2,
    title: "Push to the End",
    description:
      "Move all items to the **right end** of the container.",
    hint: "Try `justify-content: flex-end;`",
    explanation:
      "`justify-content` controls how items are distributed along the **main axis**. `flex-end` pushes everything to the end of the main axis.",
    items: makeItems(3),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", justifyContent: "flex-end" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { justifyContent: ["flex-end", "end"] },
    solution: 'justify-content: flex-end;',
  },
  {
    id: 5,
    chapter: "Main Axis",
    chapterIndex: 2,
    title: "Center the Stage",
    description:
      "Center all items **horizontally** in the container.",
    hint: "Try `justify-content: center;`",
    explanation:
      "`justify-content: center` groups all items and centers them along the main axis. Extra space is distributed equally on both sides.",
    items: makeItems(3),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", justifyContent: "center" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { justifyContent: ["center"] },
    solution: 'justify-content: center;',
  },
  {
    id: 6,
    chapter: "Main Axis",
    chapterIndex: 2,
    title: "Space Between",
    description:
      "Spread items with **no space at the edges** — first item flush left, last flush right.",
    hint: "Try `justify-content: space-between;`",
    explanation:
      "`space-between` puts the first item at the start, the last at the end, and distributes the remaining space **between** the items equally. No space before the first or after the last.",
    items: makeItems(4),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", justifyContent: "space-between" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { justifyContent: ["space-between"] },
    solution: 'justify-content: space-between;',
  },
  {
    id: 7,
    chapter: "Main Axis",
    chapterIndex: 2,
    title: "Space Around",
    description:
      "Give each item **equal space on both sides**, including the edges.",
    hint: "Try `justify-content: space-around;`",
    explanation:
      "`space-around` gives each item equal space on both sides. This means edge gaps are **half** the size of gaps between items (each gap is shared between two items).",
    items: makeItems(3),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", justifyContent: "space-around" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { justifyContent: ["space-around"] },
    solution: 'justify-content: space-around;',
  },
  {
    id: 8,
    chapter: "Main Axis",
    chapterIndex: 2,
    title: "Space Evenly",
    description:
      "Make all gaps — including the edges — **exactly equal**.",
    hint: "Try `justify-content: space-evenly;`",
    explanation:
      "`space-evenly` distributes items so all spaces (including before the first and after the last) are **identical**. This is different from `space-around` where edge spaces are smaller.",
    items: makeItems(3),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", justifyContent: "space-evenly" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { justifyContent: ["space-evenly"] },
    solution: 'justify-content: space-evenly;',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 3: ALIGN-ITEMS (CROSS AXIS)
  // ─────────────────────────────────────────────
  {
    id: 9,
    chapter: "Cross Axis",
    chapterIndex: 3,
    title: "Sink to the Bottom",
    description:
      "Move all items to the **bottom** of the container. Items have different heights.",
    hint: "Try `align-items: flex-end;`",
    explanation:
      "`align-items` controls alignment along the **cross axis** (perpendicular to main axis). For a row, that's vertical. `flex-end` pushes items to the end of the cross axis — the bottom.",
    items: makeItems(3, { heights: [40, 70, 55] }),
    containerHeight: 160,
    targetContainerCSS: { display: "flex", alignItems: "flex-end" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { alignItems: ["flex-end", "end"] },
    solution: 'align-items: flex-end;',
  },
  {
    id: 10,
    chapter: "Cross Axis",
    chapterIndex: 3,
    title: "Vertical Center",
    description:
      "Center all items **vertically** in the container.",
    hint: "Try `align-items: center;`",
    explanation:
      "`align-items: center` centers items along the cross axis — the middle of the container's height when `flex-direction` is row.",
    items: makeItems(3, { heights: [40, 80, 60] }),
    containerHeight: 160,
    targetContainerCSS: { display: "flex", alignItems: "center" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { alignItems: ["center"] },
    solution: 'align-items: center;',
  },
  {
    id: 11,
    chapter: "Cross Axis",
    chapterIndex: 3,
    title: "Stretch to Fill",
    description:
      "Make items fill the **full height** of the container.",
    hint: "Try `align-items: stretch;` — this is actually the default!",
    explanation:
      "`align-items: stretch` is the **default** value. Items stretch to fill the cross axis. Items without a fixed height will grow to match the container height.",
    items: makeItems(3),
    containerHeight: 160,
    targetContainerCSS: { display: "flex", alignItems: "stretch" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { alignItems: ["stretch"] },
    solution: 'align-items: stretch;',
  },
  {
    id: 12,
    chapter: "Cross Axis",
    chapterIndex: 3,
    title: "Perfect Center",
    description:
      "Center items both **horizontally and vertically**. The classic flexbox centering trick!",
    hint: "You need both `justify-content` and `align-items`.",
    explanation:
      "Combining `justify-content: center` and `align-items: center` is the most popular use of flexbox — perfect centering in both axes with just 2 lines of CSS!",
    items: makeItems(1),
    containerHeight: 200,
    targetContainerCSS: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: {
      justifyContent: ["center"],
      alignItems: ["center"],
    },
    solution: 'justify-content: center;\nalign-items: center;',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 4: FLEX WRAP & GAP
  // ─────────────────────────────────────────────
  {
    id: 13,
    chapter: "Wrap & Gap",
    chapterIndex: 4,
    title: "Wrap It Up",
    description:
      "Items are overflowing! Make them **wrap to the next line** when they run out of space.",
    hint: "Try `flex-wrap: wrap;`",
    explanation:
      "By default, flex items try to fit on one line and may shrink or overflow. `flex-wrap: wrap` lets items flow onto multiple lines when there's not enough space.",
    items: makeItems(7).map((item, i) => ({
      ...item,
      width: 80,
      height: 60,
    })),
    containerHeight: 180,
    targetContainerCSS: { display: "flex", flexWrap: "wrap" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { flexWrap: ["wrap"] },
    solution: 'flex-wrap: wrap;',
  },
  {
    id: 14,
    chapter: "Wrap & Gap",
    chapterIndex: 4,
    title: "Add Some Space",
    description:
      "Add **16px of gap** between all flex items.",
    hint: "Try `gap: 16px;`",
    explanation:
      "`gap` is the modern way to add space between flex items. It only applies to the space **between** items (not on the outer edges). You can also use `row-gap` and `column-gap` separately.",
    items: makeItems(4),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", gap: "16px" },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: { gap: ["16px"] },
    solution: 'gap: 16px;',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 5: ITEM PROPERTIES
  // ─────────────────────────────────────────────
  {
    id: 15,
    chapter: "Item Properties",
    chapterIndex: 5,
    title: "Grow, Item B!",
    description:
      "Make **item B** grow and fill all the available space.",
    hint: "Add `flex-grow: 1;` to item B.",
    explanation:
      "`flex-grow` tells an item how much of the **available free space** it should consume. A value of `1` means the item takes all the leftover space. If multiple items have `flex-grow: 1`, they share it equally.",
    items: makeItems(3).map((item, i) => ({
      ...item,
      width: i === 1 ? undefined : 60,
    })),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", gap: "8px" },
    targetItemCSS: { 1: { flexGrow: "1" } },
    lockedCSS: { display: "flex", gap: "8px" },
    editTarget: 1,
    editorLabel: "Item B",
    checkProps: { flexGrow: ["1"] },
    solution: 'flex-grow: 1;',
  },
  {
    id: 16,
    chapter: "Item Properties",
    chapterIndex: 5,
    title: "Initial Size",
    description:
      "Set item A's **initial size** to **200px** using flex-basis.",
    hint: "Add `flex-basis: 200px;` to item A.",
    explanation:
      "`flex-basis` sets the **initial main-axis size** of a flex item before free space is distributed. It's like `width` for row-direction flex. It takes precedence over `width` when flexbox is in control.",
    items: makeItems(3),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", gap: "8px" },
    targetItemCSS: { 0: { flexBasis: "200px" } },
    lockedCSS: { display: "flex", gap: "8px" },
    editTarget: 0,
    editorLabel: "Item A",
    checkProps: { flexBasis: ["200px"] },
    solution: 'flex-basis: 200px;',
  },
  {
    id: 17,
    chapter: "Item Properties",
    chapterIndex: 5,
    title: "Change the Order",
    description:
      "Move **item C** to appear **first** without changing the HTML.",
    hint: "Set `order: -1;` on item C (or any negative number).",
    explanation:
      "By default all flex items have `order: 0`. Setting a **lower** order makes an item appear first. `order: -1` makes item C appear before everything else. This only affects visual order, not DOM order.",
    items: makeItems(3),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", gap: "8px" },
    targetItemCSS: { 2: { order: "-1" } },
    lockedCSS: { display: "flex", gap: "8px" },
    editTarget: 2,
    editorLabel: "Item C",
    checkProps: { order: ["-1", "-2", "-3"] },
    solution: 'order: -1;',
  },
  {
    id: 18,
    chapter: "Item Properties",
    chapterIndex: 5,
    title: "Self Alignment",
    description:
      "Move **only item B** to the bottom, while A and C stay at the top.",
    hint: "Use `align-self: flex-end;` on item B.",
    explanation:
      "`align-self` overrides `align-items` for a **single item**. This lets you break out of the container's cross-axis alignment for one specific child.",
    items: makeItems(3, { heights: [50, 50, 50] }),
    containerHeight: 180,
    targetContainerCSS: { display: "flex", alignItems: "flex-start", gap: "8px" },
    targetItemCSS: { 1: { alignSelf: "flex-end" } },
    lockedCSS: { display: "flex", alignItems: "flex-start", gap: "8px" },
    editTarget: 1,
    editorLabel: "Item B",
    checkProps: { alignSelf: ["flex-end", "end"] },
    solution: 'align-self: flex-end;',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 6: REAL-WORLD CHALLENGES
  // ─────────────────────────────────────────────
  {
    id: 19,
    chapter: "Real World",
    chapterIndex: 6,
    title: "Navigation Bar",
    description:
      "Build a typical navbar: **logo on the left**, nav links on the right, all vertically centered.",
    hint: "Use `justify-content: space-between` and `align-items: center`.",
    explanation:
      "`justify-content: space-between` pushes logo and links to opposite ends. `align-items: center` vertically centers everything. This is the #1 real-world flexbox pattern.",
    items: [
      { label: "Logo", bg: "#7c3aed", width: 80, height: 40 },
      { label: "Home", bg: "#0891b2", width: 60, height: 36 },
      { label: "About", bg: "#0891b2", width: 60, height: 36 },
      { label: "Contact", bg: "#0891b2", width: 70, height: 36 },
    ],
    containerHeight: 80,
    targetContainerCSS: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    lockedCSS: { display: "flex" },
    editTarget: "container",
    checkProps: {
      justifyContent: ["space-between"],
      alignItems: ["center"],
    },
    solution: 'justify-content: space-between;\nalign-items: center;',
  },
  {
    id: 20,
    chapter: "Real World",
    chapterIndex: 6,
    title: "Column Layout",
    description:
      "Make a **column layout** where the content takes all available space, pushing the footer to the bottom.",
    hint: "Use `flex-direction: column` and `justify-content: space-between`.",
    explanation:
      "This pattern creates a 'sticky footer' — the content grows to fill space and the footer is always at the bottom. Used in cards, panels, and page layouts everywhere.",
    items: [
      { label: "Header", bg: "#7c3aed", width: undefined, height: 50 },
      { label: "Content", bg: "#1d4ed8", width: undefined, height: 80 },
      { label: "Footer", bg: "#15803d", width: undefined, height: 40 },
    ],
    containerHeight: 240,
    targetContainerCSS: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    lockedCSS: { display: "flex", flexDirection: "column" },
    editTarget: "container",
    checkProps: {
      justifyContent: ["space-between"],
    },
    solution: 'justify-content: space-between;',
  },

  // ─────────────────────────────────────────────
  // CHAPTER 7: ITEM CONTROL
  // ─────────────────────────────────────────────
  {
    id: 21,
    chapter: "Item Control",
    chapterIndex: 7,
    title: "Grow to Fill",
    description:
      "Item B should stretch to **fill all remaining horizontal space** in the row. A and C stay their natural size.",
    hint: "Use `flex-grow: 1;` on Item B.",
    explanation:
      "`flex-grow: 1` tells a flex item to absorb **all available free space** left in the container. When only one item grows, it takes everything that's left. This is the classic pattern for a main content area that expands alongside a fixed sidebar.",
    items: makeItems(3, { heights: [60, 60, 60] }),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", gap: "10px", alignItems: "center" },
    targetItemCSS: { 1: { flexGrow: "1" } },
    lockedCSS: { display: "flex", gap: "10px", alignItems: "center" },
    editTarget: 1,
    editorLabel: "Item B",
    checkProps: { flexGrow: ["1"] },
    solution: "flex-grow: 1;",
  },
  {
    id: 22,
    chapter: "Item Control",
    chapterIndex: 7,
    title: "Set a Base Size",
    description:
      "Give Item B a **starting width of 150px** using the flex-basis property, before any growing or shrinking.",
    hint: "Use `flex-basis: 150px;` on Item B.",
    explanation:
      "`flex-basis` sets the **initial main-axis size** of an item before `flex-grow` and `flex-shrink` are applied. Unlike `width`, it's direction-aware — it always works along the main axis regardless of `flex-direction`.",
    items: makeItems(3),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", gap: "10px", alignItems: "center" },
    targetItemCSS: { 1: { flexBasis: "150px" } },
    lockedCSS: { display: "flex", gap: "10px", alignItems: "center" },
    editTarget: 1,
    editorLabel: "Item B",
    checkProps: { flexBasis: ["150px"] },
    solution: "flex-basis: 150px;",
  },
  {
    id: 23,
    chapter: "Item Control",
    chapterIndex: 7,
    title: "Cut the Line",
    description:
      "Item C is last in the HTML. Use the **order** property to make it appear **first**, before A and B.",
    hint: "The default order is `0`. Use `order: -1;` on Item C to push it before everyone else.",
    explanation:
      "`order` controls **visual placement** without touching the HTML. Default is `0` — lower values appear earlier. This is powerful for accessibility (meaningful source order) and responsive layouts (sidebar last in HTML but first on desktop).",
    items: makeItems(3),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", gap: "10px", alignItems: "center" },
    targetItemCSS: { 2: { order: "-1" } },
    lockedCSS: { display: "flex", gap: "10px", alignItems: "center" },
    editTarget: 2,
    editorLabel: "Item C",
    checkProps: { order: ["-1"] },
    solution: "order: -1;",
  },
  {
    id: 24,
    chapter: "Item Control",
    chapterIndex: 7,
    title: "The flex Shorthand",
    description:
      "Use the `flex` shorthand on Item B to make it: **grow** (flex-grow: 1), **not shrink** (flex-shrink: 0), with a **100px base** (flex-basis: 100px).",
    hint: "The shorthand is `flex: grow shrink basis;` — so `flex: 1 0 100px;`",
    explanation:
      "`flex: 1 0 100px` is shorthand for `flex-grow: 1; flex-shrink: 0; flex-basis: 100px`. The three values control growth, shrinkage, and starting size — all in one declaration. This shorthand is widely used in production code.",
    items: makeItems(3),
    containerHeight: 100,
    targetContainerCSS: { display: "flex", gap: "10px" },
    targetItemCSS: { 1: { flex: "1 0 100px" } },
    lockedCSS: { display: "flex", gap: "10px" },
    editTarget: 1,
    editorLabel: "Item B",
    checkProps: { flex: ["1 0 100px"] },
    solution: "flex: 1 0 100px;",
  },
  {
    id: 25,
    chapter: "Item Control",
    chapterIndex: 7,
    title: "Wrap Alignment",
    description:
      "Items wrap onto multiple lines but float in the middle. Use **align-content** to pack all lines to the **top** of the container.",
    hint: "Use `align-content: flex-start;` on the container.",
    explanation:
      "`align-content` controls how **multiple lines** are distributed along the cross axis — but only when `flex-wrap` is enabled. `flex-start` packs all rows to the top. It's like `align-items` but for the entire group of rows.",
    items: makeItems(7),
    containerHeight: 200,
    targetContainerCSS: { display: "flex", flexWrap: "wrap", gap: "8px", alignContent: "flex-start" },
    lockedCSS: { display: "flex", flexWrap: "wrap", gap: "8px" },
    editTarget: "container",
    checkProps: { alignContent: ["flex-start", "start"] },
    solution: "align-content: flex-start;",
  },
];

export function getLevelById(id: number): Level | undefined {
  return levels.find((l) => l.id === id);
}
