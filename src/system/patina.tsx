// ─────────────────────────────────────────────────────────────────────────
// SYSTEM LAYER — the patina engine (v3, monotonic).
// Attention only ever AGES things forward — there is no decay, so flicking a
// cursor over a card can never make it look like it "reverts". A quick hover
// adds a small permanent step; resting on something accrues more; visiting
// (clicking through) ages it further. Everything persists.
// Design-blind: it only decides HOW WORN each id is (0–1).
//
// The whole-page "patina" reading is DERIVED, not a separate accumulator: it's
// the MEAN wear across every element the store knows about, so it only reaches
// 1.0 when every element is fully patina'd, and a maxed element stops moving it.
// ─────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'jmm:patina';
// Reserved id from the v2 engine's page-tarnish accumulator. It's no longer
// written, but old localStorage may still carry it — excluded from the derived
// page-completion mean so a stale entry can't skew the reading.
const PAGE_ID = '__page__';

const ENTER_STEP = 0.06; // permanent bump on each hover-in
const ACCRUE_PER_FRAME = 0.006; // extra wear while resting on something (~0.36/s)
const VISIT_STEP = 0.28; // bump when clicking through
const VISITED_FLOOR = 0.22; // a visited item is at least this worn
const MAX = 1;

interface CardState {
  level: number;
  hovering: boolean;
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function loadLevels(): Map<string, number> {
  if (typeof window === 'undefined') return new Map();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const obj = JSON.parse(raw) as Record<string, number>;
    return new Map(Object.entries(obj).filter(([, v]) => typeof v === 'number'));
  } catch {
    return new Map();
  }
}

class PatinaStore {
  private states = new Map<string, CardState>();
  private listeners = new Map<string, Set<() => void>>();
  private globalListeners = new Set<() => void>();
  private saved = loadLevels();
  private frame: number | null = null;
  private reduceMotion = prefersReducedMotion();
  private saveQueued = false;

  private ensure(id: string): CardState {
    let s = this.states.get(id);
    if (!s) {
      s = { level: this.saved.get(id) ?? 0, hovering: false };
      this.states.set(id, s);
    }
    return s;
  }

  getLevel = (id: string): number => this.ensure(id).level;

  /** Mean wear across every known element (0–1). Reaches 1 only when they all
   *  do; a fully-worn element is capped so it can no longer raise the average. */
  getCompletion = (): number => {
    let sum = 0;
    let n = 0;
    for (const [id, s] of this.states) {
      if (id === PAGE_ID) continue;
      sum += s.level;
      n += 1;
    }
    return n === 0 ? 0 : sum / n;
  };

  subscribe = (id: string, cb: () => void): (() => void) => {
    this.ensure(id);
    let set = this.listeners.get(id);
    if (!set) {
      set = new Set();
      this.listeners.set(id, set);
    }
    set.add(cb);
    return () => set.delete(cb);
  };

  /** Subscribe to ANY change — used to recompute the derived page completion. */
  subscribeAll = (cb: () => void): (() => void) => {
    this.globalListeners.add(cb);
    return () => this.globalListeners.delete(cb);
  };

  private emit(id: string): void {
    this.listeners.get(id)?.forEach((cb) => cb());
    this.globalListeners.forEach((cb) => cb());
  }

  private queueSave(): void {
    if (this.saveQueued || typeof window === 'undefined') return;
    this.saveQueued = true;
    // Coalesce writes to the next frame so rAF accrual doesn't thrash storage.
    requestAnimationFrame(() => {
      this.saveQueued = false;
      try {
        const out: Record<string, number> = {};
        for (const [id, s] of this.states) out[id] = Number(s.level.toFixed(3));
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
      } catch {
        /* best-effort */
      }
    });
  }

  /** Raise an id's wear (monotonic — never lowers it). */
  private bump(id: string, amount: number, cap = MAX): void {
    const s = this.ensure(id);
    const next = Math.min(cap, s.level + amount);
    if (next <= s.level) return;
    s.level = next;
    this.emit(id);
    this.queueSave();
  }

  enter = (id: string): void => {
    const s = this.ensure(id);
    s.hovering = true;
    this.bump(id, ENTER_STEP);
    if (!this.reduceMotion) this.startLoop();
  };

  leave = (id: string): void => {
    this.ensure(id).hovering = false;
  };

  visit = (id: string): void => {
    const s = this.ensure(id);
    const target = Math.max(s.level + VISIT_STEP, VISITED_FLOOR);
    this.bump(id, target - s.level);
  };

  private startLoop(): void {
    if (this.frame !== null || typeof window === 'undefined') return;
    const tick = () => {
      let active = false;
      for (const [id, s] of this.states) {
        if (!s.hovering) continue;
        active = true;
        this.bump(id, ACCRUE_PER_FRAME);
      }
      this.frame = active ? requestAnimationFrame(tick) : null;
    };
    this.frame = requestAnimationFrame(tick);
  }
}

const PatinaContext = createContext<PatinaStore | null>(null);

export function PatinaProvider({ children }: { children: ReactNode }) {
  const ref = useRef<PatinaStore>(null);
  ref.current ??= new PatinaStore();
  return <PatinaContext.Provider value={ref.current}>{children}</PatinaContext.Provider>;
}

function useStore(): PatinaStore {
  const store = useContext(PatinaContext);
  if (!store) throw new Error('usePatina must be used within <PatinaProvider>');
  return store;
}

export interface PatinaProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  style: CSSProperties;
}

/** Bind an element to the patina system by id. Spread `patinaProps` onto it. */
export function usePatina(id: string): { level: number; patinaProps: PatinaProps } {
  const store = useStore();
  const level = useSyncExternalStore(
    (cb) => store.subscribe(id, cb),
    () => store.getLevel(id),
    () => 0,
  );
  return {
    level,
    patinaProps: {
      onMouseEnter: () => store.enter(id),
      onMouseLeave: () => store.leave(id),
      onClick: () => store.visit(id),
      style: { '--patina': level.toFixed(3) } as CSSProperties,
    },
  };
}

/** Whole-page patina completion (0–1): the MEAN wear across every element the
 *  store knows about. Only reaches 1 when every element is fully patina'd, and a
 *  maxed element can no longer raise it. Drives the seam meter + the tarnish veil. */
export function usePagePatina(): number {
  const store = useStore();
  return useSyncExternalStore(store.subscribeAll, store.getCompletion, () => 0);
}
