/** Stagger helper for grids: 70ms per step, capped at 6 steps so long lists never crawl. Safe in server components. */
export const stagger = (index: number) => Math.min(Math.max(index, 0), 6) * 70;
