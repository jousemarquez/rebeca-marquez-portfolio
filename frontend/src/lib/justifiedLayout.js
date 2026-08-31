/**
 * Justified rows: packing by crop aspect ratio.
 * home_size controls solo rows (hero/wide/large) vs packed rows.
 */

export const DEFAULT_RATIO = 16 / 9;

const SOLO_SIZES = new Set(["wide"]);

function maxPerRowForSize(size, globalMax) {
  if (SOLO_SIZES.has(size)) return 1;
  if (size === "small") return Math.min(3, globalMax);
  return Math.min(2, globalMax);
}

function soloMaxHForSize(size, windowH) {
  if (size === "hero") return Math.round(windowH * 0.55);
  if (size === "wide") return Math.round(windowH * 0.36);
  if (size === "large") return Math.round(windowH * 0.48);
  return Math.round(windowH * 0.4);
}

export function packJustified(items, containerWidth, opts = {}) {
  const gap = opts.gap ?? 14;
  const minH = opts.minH ?? 240;
  const windowH = opts.windowH ?? 900;
  const maxH = opts.maxH ?? Math.round(windowH * 0.48);
  const globalMaxPerRow = opts.maxPerRow ?? 2;
  const soloAll = Boolean(opts.soloAll);

  if (!containerWidth || containerWidth < 80 || !items.length) {
    return [];
  }

  const fillH = (list) => {
    const n = list.length;
    const gaps = gap * Math.max(0, n - 1);
    const sumR = list.reduce((s, i) => s + i.ratio, 0);
    return (containerWidth - gaps) / sumR;
  };

  const sizeRow = (list) => {
    let height = fillH(list);
    const cap =
      list.length === 1
        ? Math.min(maxH, soloMaxHForSize(list[0].size, windowH))
        : maxH;
    height = Math.min(height, cap);
    if (list.length > 1) height = Math.max(minH, Math.min(height, maxH));
    height = Math.min(height, fillH(list));
    return list.map((item) => ({
      ...item,
      height,
      width: height * item.ratio,
    }));
  };

  if (soloAll) {
    return items.map((item) => sizeRow([item]));
  }

  // Los "wide" siempre van solos en su fila; el resto se empareja entre sí
  // ignorando dónde caigan los "wide" en medio, para que nunca quede un
  // proyecto normal huérfano en una fila de 1 solo porque un "wide" lo
  // interrumpió (ver home_size en el CMS). Las filas "wide" se reinsertan
  // después en la posición que les corresponda según su orden original.
  const solo = [];
  const normal = [];
  items.forEach((item, index) => {
    if (SOLO_SIZES.has(item.size)) solo.push({ item, index });
    else normal.push({ item, index });
  });

  const normalRows = [];
  let current = [];
  for (const { item } of normal) {
    const rowMax = Math.min(
      globalMaxPerRow,
      maxPerRowForSize(item.size, globalMaxPerRow),
      current.length
        ? maxPerRowForSize(current[0].size, globalMaxPerRow)
        : globalMaxPerRow,
    );
    if (current.length >= rowMax) {
      normalRows.push(current);
      current = [];
    }
    if (current.length && fillH([...current, item]) < minH) {
      normalRows.push(current);
      current = [];
    }
    current.push(item);
  }
  if (current.length) normalRows.push(current);

  if (!solo.length) {
    return normalRows.map((row) => sizeRow(row));
  }

  let consumed = 0;
  const rowBoundaries = normalRows.map((row) => (consumed += row.length));

  const afterRowIdxOf = (index) => {
    const normalsBefore = normal.filter((n) => n.index < index).length;
    if (normalsBefore === 0) return -1;
    const idx = rowBoundaries.findIndex((b) => b >= normalsBefore);
    return idx === -1 ? normalRows.length - 1 : idx;
  };

  const rows = [];
  solo
    .filter(({ index }) => afterRowIdxOf(index) === -1)
    .forEach(({ item }) => rows.push(sizeRow([item])));

  for (let r = 0; r < normalRows.length; r++) {
    rows.push(sizeRow(normalRows[r]));
    solo
      .filter(({ index }) => afterRowIdxOf(index) === r)
      .forEach(({ item }) => rows.push(sizeRow([item])));
  }

  return rows;
}
