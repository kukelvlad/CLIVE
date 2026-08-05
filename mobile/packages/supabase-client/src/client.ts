import { createClient, type SupportedStorage } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// Same Supabase project as the web app (zksoexscmazqngryjade). The anon key
// is safe to embed — RLS policies gate actual access, same as on web.
const SUPABASE_URL = 'https://zksoexscmazqngryjade.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inprc29leHNjbWF6cW5ncnlqYWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzMjQ0MzAsImV4cCI6MjEwMDkwMDQzMH0.BW2o2ssOQr0H1DfAxz6uyd6wpxFwaApQxB9YUTAvLhM';

/**
 * SecureStore-backed storage adapter for supabase-js auth persistence.
 * Web used `localStorage` (the supabase-js default); native has no
 * localStorage, so sessions are persisted in the OS keychain instead —
 * this is the standard Expo + Supabase auth pattern.
 */
const ExpoSecureStoreAdapter: SupportedStorage = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
