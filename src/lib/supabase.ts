import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  total_quests_completed: number;
  total_meditation_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface CompletedQuestDB {
  id: string;
  user_id: string;
  quest_id: string;
  quest_title: string;
  duration: number;
  xp_earned: number;
  completed_at: string;
}

export interface AchievementDB {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: string;
  timestamp: string;
  quest_completed?: boolean;
}
