import { supabase } from './client';
import type { ProfileRow } from './types';

/**
 * Ensure there's a signed-in user (anonymous is fine) and return it.
 * Ported from web's onboarding flow: anonymous sign-in happens silently on
 * first launch, a real identity gets linked later via `linkIdentity` once
 * the user opts to save progress (Apple/Google/magic-link) — not yet wired
 * up here, this just covers the anonymous baseline.
 */
export async function ensureAnonymousSession() {
  const { data } = await supabase.auth.getUser();
  if (data?.user) return data.user;

  const { data: signInData, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return signInData.user;
}

export async function getProfile(userId: string): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;
  return data as ProfileRow | null;
}

export async function upsertProfile(profile: ProfileRow) {
  const { error } = await supabase.from('profiles').upsert(profile);
  if (error) throw error;
}

/**
 * Real in-app account deletion — calls the `delete-account` Edge Function
 * (JWT-scoped caller identification + service-role admin delete), the same
 * one already deployed and live on the web app. Closes Apple Guideline
 * 5.1.1(v) here too; no new backend work needed, just this client call.
 */
export async function deleteAccount() {
  const { data, error } = await supabase.functions.invoke('delete-account');
  if (error || !data?.success) {
    throw error || new Error('Account deletion failed');
  }
  await supabase.auth.signOut();
}
