// Vertical version of the project-card dot bar (--card-dots), for the publication
// card's column divider. Two 5px dot columns wide (10px), bottom-anchored: the
// progression runs bottom→top (fresh terracotta → pale verdigris), completing at
// 150px ≈ the half-card-height full-wear bar, then a tiled tail above.
// Same 5 equal bands + Bayer 4×4 ordered dither at the boundaries as --card-dots.

const PALETTE = ['#c9824e', '#9c6b43', '#5e4a38', '#6e8f80', '#8fb2a1']; // fresh → aged
const CELL = 5;
const COLS = 2; // 10px wide
const ROWS_PER_BAND = 8; // 5 bands × 8 rows × 5px = 200px to complete
const TOTAL = 600; // px tall — tail beyond the ramp
const W = 0.3; // dither window, in band-fractions either side of a boundary

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((r) => r.map((v) => (v + 0.5) / 16));

const rampRows = PALETTE.length * ROWS_PER_BAND; // 30 rows = 150px
const rows = Math.floor(TOTAL / CELL);

let dots = '';
for (let r = 0; r < rampRows; r++) {
  // r counts UP from the bottom of the image
  const y = TOTAL - r * CELL - CELL / 2;
  for (let c = 0; c < COLS; c++) {
    const x = c * CELL + CELL / 2;
    const q = (r + 0.5) / ROWS_PER_BAND; // continuous band position
    const k = Math.round(q); // nearest band boundary
    const d = q - k;
    const pUpper = Math.min(1, Math.max(0, (d + W) / (2 * W)));
    // The bar is only 2 dots wide, so a plain [r%4][c%4] lookup samples the same
    // two thresholds every row and some boundaries come out un-stippled. Alternate
    // rows read the other half of the Bayer row, so all four thresholds get used.
    const bx = (c + 2 * (r % 2)) % 4;
    const band = pUpper > BAYER[r % 4][bx] ? k : k - 1;
    const fill = PALETTE[Math.min(PALETTE.length - 1, Math.max(0, band))];
    dots += `<circle cx='${x}' cy='${y}' r='2' fill='${fill}'/>`;
  }
}

// Tail: fully-aged dots tiled above the completed ramp.
const tailTop = TOTAL - rampRows * CELL;
const tail =
  `<defs><pattern id='t' width='5' height='5' patternUnits='userSpaceOnUse'>` +
  `<circle cx='2.5' cy='2.5' r='2' fill='${PALETTE[4]}'/></pattern></defs>` +
  `<rect x='0' y='0' width='${COLS * CELL}' height='${tailTop}' fill='url(#t)'/>`;

const svg =
  `<svg xmlns='http://www.w3.org/2000/svg' width='${COLS * CELL}' height='${TOTAL}'>` +
  tail +
  dots +
  `</svg>`;

const url = `url("data:image/svg+xml,${encodeURIComponent(svg).replace(/%20/g, ' ').replace(/%3D/g, '=').replace(/%2F/g, '/')}")`;
console.log(`  --rail-bar: ${url};`);
