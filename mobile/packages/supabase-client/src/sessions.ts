import { supabase } from './client';
import type { CognitiveAgeTestRow, SessionRow } from './types';

/** Log a completed exercise session. Ported 1:1 from web's `logSession`. */
export async function logSession(
  exerciseId: string,
  level: number | undefined,
  score: number,
  total: number,
  durationMs?: number | null
) {
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  if (!user) return;

  const row: SessionRow = {
    user_id: user.id,
    exercise_id: exerciseId,
    level: level || 1,
    score,
    total,
    duration_ms: durationMs ?? null,
  };
  await supabase.from('sessions').insert(row);
}

/** Log a completed Cognitive Age Test result. Ported 1:1 from web's `logCognitiveTest`. */
export async function logCognitiveTest(cognitiveAge: number, domainScores: Record<string, number>) {
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  if (!user) return;

  const row: CognitiveAgeTestRow = {
    user_id: user.id,
    cognitive_age: cognitiveAge,
    domain_scores: domainScores,
  };
  await supabase.from('cognitive_age_tests').insert(row);
}
