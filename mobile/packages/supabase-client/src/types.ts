/** Row shapes for the Supabase tables this app reads/writes — mirrors web usage 1:1. */

export type Gender = 'male' | 'female' | 'other' | string;

export interface ProfileRow {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  age_group: string;
  avatar_url?: string | null;
  created_at?: string;
}

export interface SessionRow {
  id?: string;
  user_id: string;
  exercise_id: string;
  level: number;
  score: number;
  total: number;
  duration_ms: number | null;
  played_at?: string;
}

export interface CognitiveAgeTestRow {
  id?: string;
  user_id: string;
  cognitive_age: number;
  domain_scores: Record<string, number>;
  taken_at?: string;
}

/**
 * Persistent per-exercise adaptive-difficulty state. Table exists in
 * Supabase but is not yet written to by the web app (level currently resets
 * every session) — wiring this up is Этап 3 work, per STORE_RELEASE_PLAN.md.
 */
export interface ExerciseStateRow {
  user_id: string;
  exercise_id: string;
  level: number;
  streak: number;
  updated_at?: string;
}
