import { Achievement, UserStats } from "@/contexts/UserContext";

export const achievementDefinitions: Omit<
  Achievement,
  "unlocked" | "unlockedAt"
>[] = [
  {
    id: "first_quest",
    name: "First Steps",
    description: "Complete your first quest",
    icon: "🌱",
  },
  {
    id: "streak_3",
    name: "3-Day Warrior",
    description: "Maintain a 3-day streak",
    icon: "🔥",
  },
  {
    id: "streak_7",
    name: "Week Champion",
    description: "Maintain a 7-day streak",
    icon: "⭐",
  },
  {
    id: "streak_30",
    name: "Month Master",
    description: "Maintain a 30-day streak",
    icon: "👑",
  },
  {
    id: "level_5",
    name: "Rising Star",
    description: "Reach level 5",
    icon: "✨",
  },
  {
    id: "level_10",
    name: "Zen Seeker",
    description: "Reach level 10",
    icon: "🧘",
  },
  {
    id: "level_20",
    name: "Mindful Master",
    description: "Reach level 20",
    icon: "🏆",
  },
  {
    id: "quests_10",
    name: "Quest Explorer",
    description: "Complete 10 quests",
    icon: "🗺️",
  },
  {
    id: "quests_25",
    name: "Quest Veteran",
    description: "Complete 25 quests",
    icon: "⚔️",
  },
  {
    id: "quests_50",
    name: "Quest Legend",
    description: "Complete 50 quests",
    icon: "🌟",
  },
  {
    id: "meditation_60",
    name: "Hour of Peace",
    description: "Meditate for 60 minutes total",
    icon: "🕐",
  },
  {
    id: "meditation_300",
    name: "Five Hour Focus",
    description: "Meditate for 5 hours total",
    icon: "⏰",
  },
  {
    id: "meditation_1000",
    name: "Thousand Minutes",
    description: "Meditate for 1000 minutes total",
    icon: "🎯",
  },
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Complete a quest before 8 AM",
    icon: "🌅",
  },
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Complete a quest after 10 PM",
    icon: "🌙",
  },
];

export const checkAchievements = (stats: UserStats): string[] => {
  const newlyUnlocked: string[] = [];

  const checkAndAdd = (id: string, condition: boolean) => {
    const achievement = stats.achievements.find((a) => a.id === id);
    if (condition && achievement && !achievement.unlocked) {
      newlyUnlocked.push(id);
    }
  };

  // Quest completion achievements
  checkAndAdd("first_quest", stats.totalQuestsCompleted >= 1);
  checkAndAdd("quests_10", stats.totalQuestsCompleted >= 10);
  checkAndAdd("quests_25", stats.totalQuestsCompleted >= 25);
  checkAndAdd("quests_50", stats.totalQuestsCompleted >= 50);

  // Streak achievements
  checkAndAdd("streak_3", stats.currentStreak >= 3);
  checkAndAdd("streak_7", stats.currentStreak >= 7);
  checkAndAdd("streak_30", stats.currentStreak >= 30);

  // Level achievements
  checkAndAdd("level_5", stats.level >= 5);
  checkAndAdd("level_10", stats.level >= 10);
  checkAndAdd("level_20", stats.level >= 20);

  // Time-based achievements
  checkAndAdd("meditation_60", stats.totalMeditationMinutes >= 60);
  checkAndAdd("meditation_300", stats.totalMeditationMinutes >= 300);
  checkAndAdd("meditation_1000", stats.totalMeditationMinutes >= 1000);

  // Time of day achievements (check latest quest)
  if (stats.completedQuests.length > 0) {
    const latestQuest = stats.completedQuests[stats.completedQuests.length - 1];
    const completedHour = new Date(latestQuest.completedAt).getHours();
    checkAndAdd("early_bird", completedHour < 8);
    checkAndAdd("night_owl", completedHour >= 22);
  }

  return newlyUnlocked;
};

export const initializeAchievements = (): Achievement[] => {
  return achievementDefinitions.map((def) => ({
    ...def,
    unlocked: false,
  }));
};
