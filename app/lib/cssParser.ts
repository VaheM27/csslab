const CAMEL_TO_KEBAB: Record<string, string> = {
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
};

const KEBAB_TO_CAMEL: Record<string, string> = Object.fromEntries(
  Object.entries(CAMEL_TO_KEBAB).map(([k, v]) => [v, k])
);

const ALLOWED_PROPS = new Set([
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
]);

export type ParsedCSS = Record<string, string>;

export function parseCSSInput(input: string): ParsedCSS {
  const result: ParsedCSS = {};
  const lines = input.split(/[\n;]+/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
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
  return v.trim().toLowerCase().replace(/\s+/g, " ");
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
