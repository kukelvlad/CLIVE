/**
 * Pure game logic for the 6 exercises + Cognitive Age Test, kept separate
 * from UI so it doesn't care whether it's rendered on web or native.
 *
 * Placeholder for Этап 1 (foundation only) — the actual logic ports
 * (Shopping List, Find the Odd One, Story & Recall, Number Chain,
 * Matching Pairs, The Route, Cognitive Age Test scoring) happen in Этап 2
 * per STORE_RELEASE_PLAN.md, in that order (simple mechanics first).
 */
/**
 * IDs must match the `exercise_id` values already written to the
 * `sessions` table by the web app (index.html `GAMES` array) — changing
 * these would orphan existing session history for anyone who used the web
 * app before switching to the native build.
 */
export const EXERCISE_IDS = ['shopping', 'odd', 'yesterday', 'chain', 'pairs', 'route'] as const;

export type ExerciseId = (typeof EXERCISE_IDS)[number];

export interface ExerciseMeta {
  id: ExerciseId;
  title: string;
  domain: string;
  /** Design-token color key ('teal' | 'mint'), matching web's alternating pattern. */
  colorToken: 'teal' | 'mint';
  desc: string;
}

/** Ported 1:1 from web's `GAMES` array (id, title, domain, color, desc). */
export const EXERCISES: ExerciseMeta[] = [
  { id: 'shopping', title: 'Shopping List', domain: 'Working Memory', colorToken: 'teal', desc: 'Study a list, then recall the items from memory.' },
  { id: 'odd', title: 'Find the Odd One', domain: 'Attention & Speed', colorToken: 'mint', desc: 'Spot the one item that is different from the rest.' },
  { id: 'yesterday', title: 'Story & Recall', domain: 'Episodic Memory', colorToken: 'teal', desc: 'Read a short story, then answer questions about it.' },
  { id: 'chain', title: 'Number Chain', domain: 'Working Memory + Processing', colorToken: 'mint', desc: 'See digits one by one, then type them in reverse.' },
  { id: 'pairs', title: 'Matching Pairs', domain: 'Visual Memory', colorToken: 'teal', desc: 'Flip cards face-up to find all matching pairs.' },
  { id: 'route', title: 'The Route', domain: 'Executive Function', colorToken: 'mint', desc: 'Plan a route on a map while following the rules.' },
];
