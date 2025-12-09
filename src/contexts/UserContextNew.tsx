import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import {
  supabase,
  UserProfile,
  CompletedQuestDB,
  AchievementDB,
} from "@/lib/supabase";
import { initializeAchievements } from "@/lib/achievements";

export type Mood =
  | "stressed"
  | "anxious"
  | "calm"
  | "tired"
  | "energetic"
  | "neutral";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface CompletedQuest {
  id: string;
  completedAt: Date;
  xpEarned: number;
  duration: number;
  questTitle?: string;
}

export interface UserStats {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  totalQuestsCompleted: number;
  totalMeditationMinutes: number;
  lastCheckIn?: Date;
  currentMood?: Mood;
  achievements: Achievement[];
  completedQuests: CompletedQuest[];
}

interface UserContextType {
  stats: UserStats;
  loading: boolean;
  addXP: (amount: number) => Promise<void>;
  completeQuest: (
    questId: string,
    questTitle: string,
    duration: number
  ) => Promise<void>;
  updateMood: (mood: Mood) => Promise<void>;
  checkStreak: () => Promise<void>;
  unlockAchievement: (achievementId: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  syncFromDatabase: () => Promise<void>;
}

const defaultStats: UserStats = {
  xp: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  totalQuestsCompleted: 0,
  totalMeditationMinutes: 0,
  achievements: initializeAchievements(),
  completedQuests: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const calculateLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const xpForNextLevel = (currentLevel: number): number => {
  return Math.pow(currentLevel, 2) * 100;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [loading, setLoading] = useState(true);

  // Sync data from Supabase when user logs in
  const syncFromDatabase = async () => {
    if (!user) {
      setStats(defaultStats);
      setLoading(false);
      return;
    }

    try {
      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      // Fetch completed quests
      const { data: quests, error: questsError } = await supabase
        .from("completed_quests")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });

      if (questsError) throw questsError;

      // Fetch achievements
      const { data: achievements, error: achievementsError } = await supabase
        .from("achievements")
        .select("*")
        .eq("user_id", user.id);

      if (achievementsError) throw achievementsError;

      // Fetch latest mood entry
      const { data: moods, error: moodsError } = await supabase
        .from("mood_entries")
        .select("*")
        .eq("user_id", user.id)
        .order("timestamp", { ascending: false })
        .limit(1);

      if (moodsError) throw moodsError;

      // Merge database data with achievement definitions
      const allAchievements = initializeAchievements().map((ach) => {
        const unlocked = achievements.find((a) => a.achievement_id === ach.id);
        return {
          ...ach,
          unlocked: !!unlocked,
          unlockedAt: unlocked ? new Date(unlocked.unlocked_at) : undefined,
        };
      });

      setStats({
        xp: profile.xp,
        level: profile.level,
        currentStreak: profile.current_streak,
        longestStreak: profile.longest_streak,
        totalQuestsCompleted: profile.total_quests_completed,
        totalMeditationMinutes: profile.total_meditation_minutes,
        currentMood: moods[0]?.mood as Mood,
        lastCheckIn: moods[0] ? new Date(moods[0].timestamp) : undefined,
        achievements: allAchievements,
        completedQuests: quests.map((q: CompletedQuestDB) => ({
          id: q.quest_id,
          questTitle: q.quest_title,
          completedAt: new Date(q.completed_at),
          xpEarned: q.xp_earned,
          duration: q.duration,
        })),
      });
    } catch (error) {
      console.error("Error syncing from database:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    syncFromDatabase();
  }, [user]);

  const addXP = async (amount: number) => {
    if (!user) return;

    const newXP = stats.xp + amount;
    const newLevel = calculateLevel(newXP);

    setStats((prev) => ({
      ...prev,
      xp: newXP,
      level: newLevel,
    }));

    // Update in database
    await supabase
      .from("user_profiles")
      .update({ xp: newXP, level: newLevel })
      .eq("id", user.id);
  };

  const completeQuest = async (
    questId: string,
    questTitle: string,
    duration: number
  ) => {
    if (!user) return;

    const xpEarned = duration * 10;
    const newXP = stats.xp + xpEarned;
    const newLevel = calculateLevel(newXP);
    const newTotalQuests = stats.totalQuestsCompleted + 1;
    const newTotalMinutes = stats.totalMeditationMinutes + duration;

    setStats((prev) => ({
      ...prev,
      xp: newXP,
      level: newLevel,
      totalQuestsCompleted: newTotalQuests,
      totalMeditationMinutes: newTotalMinutes,
      completedQuests: [
        {
          id: questId,
          questTitle,
          completedAt: new Date(),
          xpEarned,
          duration,
        },
        ...prev.completedQuests,
      ],
    }));

    // Update profile
    await supabase
      .from("user_profiles")
      .update({
        xp: newXP,
        level: newLevel,
        total_quests_completed: newTotalQuests,
        total_meditation_minutes: newTotalMinutes,
      })
      .eq("id", user.id);

    // Insert completed quest
    await supabase.from("completed_quests").insert({
      user_id: user.id,
      quest_id: questId,
      quest_title: questTitle,
      duration,
      xp_earned: xpEarned,
    });
  };

  const updateMood = async (mood: Mood) => {
    if (!user) return;

    setStats((prev) => ({
      ...prev,
      currentMood: mood,
      lastCheckIn: new Date(),
    }));

    // Insert mood entry
    await supabase.from("mood_entries").insert({
      user_id: user.id,
      mood,
    });
  };

  const checkStreak = async () => {
    if (!user) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastCheckIn = stats.lastCheckIn ? new Date(stats.lastCheckIn) : null;
    if (lastCheckIn) {
      lastCheckIn.setHours(0, 0, 0, 0);
    }

    if (!lastCheckIn) {
      // First check-in
      const newStreak = 1;
      setStats((prev) => ({
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak),
        lastCheckIn: today,
      }));

      await supabase
        .from("user_profiles")
        .update({
          current_streak: newStreak,
          longest_streak: Math.max(newStreak, stats.longestStreak),
        })
        .eq("id", user.id);
    } else {
      const daysSinceLastCheckIn = Math.floor(
        (today.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastCheckIn === 1) {
        // Consecutive day
        const newStreak = stats.currentStreak + 1;
        setStats((prev) => ({
          ...prev,
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, prev.longestStreak),
          lastCheckIn: today,
        }));

        await supabase
          .from("user_profiles")
          .update({
            current_streak: newStreak,
            longest_streak: Math.max(newStreak, stats.longestStreak),
          })
          .eq("id", user.id);
      } else if (daysSinceLastCheckIn > 1) {
        // Streak broken
        setStats((prev) => ({
          ...prev,
          currentStreak: 1,
          lastCheckIn: today,
        }));

        await supabase
          .from("user_profiles")
          .update({
            current_streak: 1,
          })
          .eq("id", user.id);
      }
      // daysSinceLastCheckIn === 0 means already checked in today, do nothing
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    if (!user) return;

    const achievement = stats.achievements.find((a) => a.id === achievementId);
    if (!achievement || achievement.unlocked) return;

    const updatedAchievements = stats.achievements.map((a) =>
      a.id === achievementId
        ? { ...a, unlocked: true, unlockedAt: new Date() }
        : a
    );

    setStats((prev) => ({
      ...prev,
      achievements: updatedAchievements,
    }));

    // Insert achievement
    await supabase.from("achievements").insert({
      user_id: user.id,
      achievement_id: achievementId,
    });
  };

  const resetProgress = async () => {
    if (!user) return;

    setStats({
      ...defaultStats,
      achievements: initializeAchievements(),
    });

    // Reset in database
    await supabase
      .from("user_profiles")
      .update({
        xp: 0,
        level: 1,
        current_streak: 0,
        longest_streak: 0,
        total_quests_completed: 0,
        total_meditation_minutes: 0,
      })
      .eq("id", user.id);

    // Delete all user data
    await supabase.from("completed_quests").delete().eq("user_id", user.id);
    await supabase.from("achievements").delete().eq("user_id", user.id);
    await supabase.from("mood_entries").delete().eq("user_id", user.id);
  };

  const value = {
    stats,
    loading,
    addXP,
    completeQuest,
    updateMood,
    checkStreak,
    unlockAchievement,
    resetProgress,
    syncFromDatabase,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { calculateLevel, xpForNextLevel };
