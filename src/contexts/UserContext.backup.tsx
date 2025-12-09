import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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
  addXP: (amount: number) => void;
  completeQuest: (questId: string, duration: number) => void;
  updateMood: (mood: Mood) => void;
  checkStreak: () => void;
  unlockAchievement: (achievementId: string) => void;
  resetProgress: () => void;
}

const defaultStats: UserStats = {
  xp: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  totalQuestsCompleted: 0,
  totalMeditationMinutes: 0,
  achievements: [],
  completedQuests: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const calculateLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

const xpForNextLevel = (currentLevel: number): number => {
  return Math.pow(currentLevel, 2) * 100;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem("calmquest_user_stats");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      if (parsed.lastCheckIn) parsed.lastCheckIn = new Date(parsed.lastCheckIn);
      parsed.completedQuests = parsed.completedQuests.map((q: any) => ({
        ...q,
        completedAt: new Date(q.completedAt),
      }));
      parsed.achievements = parsed.achievements.map((a: any) => ({
        ...a,
        unlockedAt: a.unlockedAt ? new Date(a.unlockedAt) : undefined,
      }));
      return parsed;
    }
    // Initialize with achievements on first load
    return {
      ...defaultStats,
      achievements: initializeAchievements(),
    };
  });

  useEffect(() => {
    localStorage.setItem("calmquest_user_stats", JSON.stringify(stats));
  }, [stats]);

  const addXP = (amount: number) => {
    setStats((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const completeQuest = (questId: string, duration: number) => {
    const xpEarned = Math.floor(duration * 2 + 50); // Base 50 XP + 2 XP per minute

    setStats((prev) => {
      const newXP = prev.xp + xpEarned;
      const newLevel = calculateLevel(newXP);
      const newCompletedQuest: CompletedQuest = {
        id: questId,
        completedAt: new Date(),
        xpEarned,
        duration,
      };

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        totalQuestsCompleted: prev.totalQuestsCompleted + 1,
        totalMeditationMinutes: prev.totalMeditationMinutes + duration,
        completedQuests: [...prev.completedQuests, newCompletedQuest],
      };
    });

    checkStreak();
  };

  const updateMood = (mood: Mood) => {
    setStats((prev) => ({
      ...prev,
      currentMood: mood,
      lastCheckIn: new Date(),
    }));
  };

  const checkStreak = () => {
    setStats((prev) => {
      const now = new Date();
      const lastCheckIn = prev.lastCheckIn;

      if (!lastCheckIn) {
        return {
          ...prev,
          currentStreak: 1,
          longestStreak: Math.max(1, prev.longestStreak),
          lastCheckIn: now,
        };
      }

      const daysSinceLastCheckIn = Math.floor(
        (now.getTime() - new Date(lastCheckIn).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      let newStreak = prev.currentStreak;

      if (daysSinceLastCheckIn === 0) {
        // Same day - maintain streak
        newStreak = prev.currentStreak;
      } else if (daysSinceLastCheckIn === 1) {
        // Next day - increment streak
        newStreak = prev.currentStreak + 1;
      } else {
        // Missed days - reset streak
        newStreak = 1;
      }

      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak),
        lastCheckIn: now,
      };
    });
  };

  const unlockAchievement = (achievementId: string) => {
    setStats((prev) => {
      const achievementIndex = prev.achievements.findIndex(
        (a) => a.id === achievementId
      );
      if (
        achievementIndex === -1 ||
        prev.achievements[achievementIndex].unlocked
      ) {
        return prev;
      }

      const newAchievements = [...prev.achievements];
      newAchievements[achievementIndex] = {
        ...newAchievements[achievementIndex],
        unlocked: true,
        unlockedAt: new Date(),
      };

      return {
        ...prev,
        achievements: newAchievements,
      };
    });
  };

  const resetProgress = () => {
    setStats(defaultStats);
    localStorage.removeItem("calmquest_user_stats");
  };

  return (
    <UserContext.Provider
      value={{
        stats,
        addXP,
        completeQuest,
        updateMood,
        checkStreak,
        unlockAchievement,
        resetProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { xpForNextLevel };
