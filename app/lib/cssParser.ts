const CAMEL_TO_KEBAB: Record<string, string> = {
  // Flex
  flexDirection: "flex-direction",
  flexWrap: "flex-wrap",
  justifyContent: "justify-content",
  alignItems: "align-items",
  alignContent: "align-content",
  alignSelf: "align-self",
  flexGrow: "flex-grow",
  flexShrink: "flex-shrink",
  flexBasis: "flex-basis",
  rowGap: "row-gap",
  columnGap: "column-gap",
  // Grid
  gridTemplateColumns: "grid-template-columns",
  gridTemplateRows: "grid-template-rows",
  gridTemplateAreas: "grid-template-areas",
  gridTemplate: "grid-template",
  gridColumn: "grid-column",
  gridRow: "grid-row",
  gridArea: "grid-area",
  gridColumnStart: "grid-column-start",
  gridColumnEnd: "grid-column-end",
  gridRowStart: "grid-row-start",
  gridRowEnd: "grid-row-end",
  gridAutoColumns: "grid-auto-columns",
  gridAutoRows: "grid-auto-rows",
  gridAutoFlow: "grid-auto-flow",
  justifyItems: "justify-items",
  placeItems: "place-items",
  placeContent: "place-content",
  placeSelf: "place-self",
};

const KEBAB_TO_CAMEL: Record<string, string> = Object.fromEntries(
  Object.entries(CAMEL_TO_KEBAB).map(([k, v]) => [v, k])
);

const ALLOWED_PROPS = new Set([
  // Flex
  "display",
  "flex-direction",
  "flex-wrap",
  "justify-content",
  "align-items",
  "align-content",
  "align-self",
  "flex-grow",
  "flex-shrink",
  "flex-basis",
  "flex",
  "gap",
  "row-gap",
  "column-gap",
  "order",
  // Grid
  "grid-template-columns",
  "grid-template-rows",
  "grid-template-areas",
  "grid-template",
  "grid-column",
  "grid-row",
  "grid-area",
  "grid-column-start",
  "grid-column-end",
  "grid-row-start",
  "grid-row-end",
  "grid-auto-columns",
  "grid-auto-rows",
  "grid-auto-flow",
  "justify-items",
  "place-items",
  "place-content",
  "place-self",
  // Shared alignment
  "align-content",
  // Media (base properties that can appear inside @media)
  "flex-direction",
  "font-size",
  "padding",
  "margin",
  "width",
  "max-width",
  "min-width",
  "height",
  "grid-template-columns",
]);

export type ParsedCSS = Record<string, string>;

export function parseCSSInput(input: string): ParsedCSS {
  const result: ParsedCSS = {};
  // Strip @media blocks for base parsing
  const stripped = input.replace(/@media[^{]*\{[\s\S]*?\}\s*\}/g, "");
  const lines = stripped.split(/[\n;]+/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("/*") || trimmed.startsWith("//")) continue;
    // Skip selector lines
    if (trimmed.includes("{") || trimmed.includes("}")) continue;
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;
    const rawProp = trimmed.slice(0, colonIdx).trim().toLowerCase();
    const rawVal = trimmed.slice(colonIdx + 1).trim().replace(/;$/, "").trim();
    if (!rawVal) continue;

    const prop = KEBAB_TO_CAMEL[rawProp] ?? rawProp;
    const canonProp = CAMEL_TO_KEBAB[prop] ?? prop;
    if (!ALLOWED_PROPS.has(canonProp)) continue;

    result[prop] = rawVal;
  }
  return result;
}

export function checkSolution(
  userCSS: ParsedCSS,
  checkProps: Record<string, string[]>
): boolean {
  for (const [prop, accepted] of Object.entries(checkProps)) {
    const userVal = normalize(userCSS[prop] ?? "");
    if (!accepted.some((v) => normalize(v) === userVal)) return false;
  }
  return true;
}

function normalize(v: string): string {
  return v
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\(\s*/g, "(")
    .replace(/\s*\)/g, ")");
}

export function cssToReactStyle(parsed: ParsedCSS): Record<string, string> {
  return parsed;
}

export function lockedCSSToString(locked: Record<string, string>): string {
  return Object.entries(locked)
    .map(([k, v]) => {
      const kebab = CAMEL_TO_KEBAB[k] ?? k;
      return `${kebab}: ${v};`;
    })
    .join("\n");
}

// ─── Media query helpers ────────────────────────────────────────────────────

export interface MediaBlock {
  condition: string;
  maxWidth?: number;
  minWidth?: number;
  properties: ParsedCSS;
}

/** Extract @media blocks from user input */
export function parseMediaBlocks(input: string): MediaBlock[] {
  const blocks: MediaBlock[] = [];
  // Match @media (...) { ... } — handles nested braces roughly
  const re = /@media\s+[^{]*\(([^)]+)\)[^{]*\{([\s\S]*?)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input)) !== null) {
    const cond = m[1].trim();
    const inner = m[2];
    const maxM = cond.match(/max-width\s*:\s*(\d+)px/i);
    const minM = cond.match(/min-width\s*:\s*(\d+)px/i);
    blocks.push({
      condition: cond,
      maxWidth: maxM ? parseInt(maxM[1]) : undefined,
      minWidth: minM ? parseInt(minM[1]) : undefined,
      properties: parseCSSInputAllowAll(inner),
    });
  }
  return blocks;
}

/** Like parseCSSInput but doesn't filter props — used inside @media blocks */
function parseCSSInputAllowAll(input: string): ParsedCSS {
  const result: ParsedCSS = {};
  const lines = input.split(/[\n;]+/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.includes("{") || trimmed.includes("}")) continue;
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;
    const rawProp = trimmed.slice(0, colonIdx).trim().toLowerCase();
    const rawVal = trimmed.slice(colonIdx + 1).trim().replace(/;$/, "").trim();
    if (!rawVal) continue;
    const prop = KEBAB_TO_CAMEL[rawProp] ?? rawProp;
    result[prop] = rawVal;
  }
  return result;
}

/** Returns CSS to apply at a given simulated viewport width */
export function getCSSAtViewport(
  userInput: string,
  viewportWidth: number,
  baseCSS: Record<string, string>
): Record<string, string> {
  const result = { ...baseCSS };
  for (const block of parseMediaBlocks(userInput)) {
    if (conditionApplies(block, viewportWidth)) {
      Object.assign(result, block.properties);
    }
  }
  return result;
}

function conditionApplies(block: MediaBlock, width: number): boolean {
  if (block.maxWidth !== undefined && width > block.maxWidth) return false;
  if (block.minWidth !== undefined && width < block.minWidth) return false;
  return block.maxWidth !== undefined || block.minWidth !== undefined;
}

/** Check if user's media query produces the expected CSS at mobile (375px) */
export function checkMediaSolution(
  input: string,
  checkProps: Record<string, string[]>
): boolean {
  const blocks = parseMediaBlocks(input);
  if (blocks.length === 0) return false;
  for (const block of blocks) {
    // Block must apply at 375px (mobile)
    if (!conditionApplies(block, 375)) continue;
    // Block must NOT apply at 1024px (desktop)
    if (conditionApplies(block, 1024)) continue;
    if (checkSolution(block.properties, checkProps)) return true;
  }
  return false;
}
