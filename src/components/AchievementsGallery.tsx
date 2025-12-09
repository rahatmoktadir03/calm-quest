import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Trophy,
  Lock,
  Target,
  Flame,
  Star,
  Award,
  Crown,
  Heart,
  Sparkles,
  Zap,
  Mountain,
  Calendar,
  Users,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "meditation" | "streak" | "social" | "special";
  rarity: "common" | "rare" | "epic" | "legendary";
  requirement: number;
  currentProgress?: number;
  unlocked: boolean;
  unlockedDate?: string;
  reward: string;
}

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
};

const rarityGlow = {
  common: "shadow-gray-500/50",
  rare: "shadow-blue-500/50",
  epic: "shadow-purple-500/50",
  legendary: "shadow-yellow-500/50",
};

export const AchievementsGallery = () => {
  const { stats: userStats } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const meditationCount = userStats?.totalQuestsCompleted || 0;
  const streak = userStats?.currentStreak || 0;
  const level = userStats?.level || 1;

  const achievements: Achievement[] = [
    // Meditation Achievements
    {
      id: "first-step",
      name: "First Step",
      description: "Complete your first meditation",
      icon: Sparkles,
      category: "meditation",
      rarity: "common",
      requirement: 1,
      currentProgress: meditationCount,
      unlocked: meditationCount >= 1,
      unlockedDate: meditationCount >= 1 ? "2024-01-15" : undefined,
      reward: "50 XP",
    },
    {
      id: "dedicated-meditator",
      name: "Dedicated Meditator",
      description: "Complete 10 meditation sessions",
      icon: Target,
      category: "meditation",
      rarity: "common",
      requirement: 10,
      currentProgress: meditationCount,
      unlocked: meditationCount >= 10,
      unlockedDate: meditationCount >= 10 ? "2024-01-20" : undefined,
      reward: "100 XP",
    },
    {
      id: "zen-master",
      name: "Zen Master",
      description: "Complete 50 meditation sessions",
      icon: Star,
      category: "meditation",
      rarity: "rare",
      requirement: 50,
      currentProgress: meditationCount,
      unlocked: meditationCount >= 50,
      reward: "250 XP + Exclusive Badge",
    },
    {
      id: "enlightenment",
      name: "Enlightenment",
      description: "Complete 100 meditation sessions",
      icon: Crown,
      category: "meditation",
      rarity: "epic",
      requirement: 100,
      currentProgress: meditationCount,
      unlocked: meditationCount >= 100,
      reward: "500 XP + Special Character",
    },
    {
      id: "meditation-legend",
      name: "Meditation Legend",
      description: "Complete 365 meditation sessions",
      icon: Trophy,
      category: "meditation",
      rarity: "legendary",
      requirement: 365,
      currentProgress: meditationCount,
      unlocked: meditationCount >= 365,
      reward: "1000 XP + Legendary Title",
    },
    // Streak Achievements
    {
      id: "consistency",
      name: "Consistency",
      description: "Maintain a 3-day streak",
      icon: Flame,
      category: "streak",
      rarity: "common",
      requirement: 3,
      currentProgress: streak,
      unlocked: streak >= 3,
      unlockedDate: streak >= 3 ? "2024-01-18" : undefined,
      reward: "75 XP",
    },
    {
      id: "week-warrior",
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: Calendar,
      category: "streak",
      rarity: "rare",
      requirement: 7,
      currentProgress: streak,
      unlocked: streak >= 7,
      reward: "150 XP",
    },
    {
      id: "unstoppable",
      name: "Unstoppable",
      description: "Maintain a 30-day streak",
      icon: Zap,
      category: "streak",
      rarity: "epic",
      requirement: 30,
      currentProgress: streak,
      unlocked: streak >= 30,
      reward: "400 XP + Streak Shield",
    },
    {
      id: "eternal-flame",
      name: "Eternal Flame",
      description: "Maintain a 100-day streak",
      icon: Mountain,
      category: "streak",
      rarity: "legendary",
      requirement: 100,
      currentProgress: streak,
      unlocked: streak >= 100,
      reward: "1000 XP + Legendary Badge",
    },
    // Social Achievements
    {
      id: "friendly",
      name: "Friendly",
      description: "Add your first friend",
      icon: Users,
      category: "social",
      rarity: "common",
      requirement: 1,
      currentProgress: 0,
      unlocked: false,
      reward: "50 XP",
    },
    {
      id: "popular",
      name: "Popular",
      description: "Reach top 10 on leaderboard",
      icon: Award,
      category: "social",
      rarity: "rare",
      requirement: 1,
      currentProgress: 0,
      unlocked: false,
      reward: "200 XP",
    },
    // Special Achievements
    {
      id: "level-up",
      name: "Rising Star",
      description: "Reach level 5",
      icon: Star,
      category: "special",
      rarity: "rare",
      requirement: 5,
      currentProgress: level,
      unlocked: level >= 5,
      reward: "150 XP",
    },
    {
      id: "completionist",
      name: "Completionist",
      description: "Try all meditation types",
      icon: Heart,
      category: "special",
      rarity: "epic",
      requirement: 6,
      currentProgress: 3,
      unlocked: false,
      reward: "300 XP + All Themes",
    },
  ];

  const filteredAchievements =
    selectedCategory === "all"
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  const achievementStats = {
    total: achievements.length,
    unlocked: achievements.filter((a) => a.unlocked).length,
    common: achievements.filter((a) => a.rarity === "common" && a.unlocked)
      .length,
    rare: achievements.filter((a) => a.rarity === "rare" && a.unlocked).length,
    epic: achievements.filter((a) => a.rarity === "epic" && a.unlocked).length,
    legendary: achievements.filter(
      (a) => a.rarity === "legendary" && a.unlocked
    ).length,
  };

  const completionPercentage = Math.round(
    (achievementStats.unlocked / achievementStats.total) * 100
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Card className="zen-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Achievement Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {achievementStats.unlocked} / {achievementStats.total} Unlocked
            </span>
            <span className="text-sm font-semibold">
              {completionPercentage}%
            </span>
          </div>
          <Progress value={completionPercentage} className="h-3" />

          <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="text-center p-2 bg-gray-500/10 rounded">
              <div className="text-lg font-bold">{achievementStats.common}</div>
              <div className="text-xs text-muted-foreground">Common</div>
            </div>
            <div className="text-center p-2 bg-blue-500/10 rounded">
              <div className="text-lg font-bold">{achievementStats.rare}</div>
              <div className="text-xs text-muted-foreground">Rare</div>
            </div>
            <div className="text-center p-2 bg-purple-500/10 rounded">
              <div className="text-lg font-bold">{achievementStats.epic}</div>
              <div className="text-xs text-muted-foreground">Epic</div>
            </div>
            <div className="text-center p-2 bg-yellow-500/10 rounded">
              <div className="text-lg font-bold">
                {achievementStats.legendary}
              </div>
              <div className="text-xs text-muted-foreground">Legendary</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="meditation">Meditation</TabsTrigger>
          <TabsTrigger value="streak">Streak</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="special">Special</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory || "all"} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement) => {
              const Icon = achievement.icon;
              const progress = achievement.currentProgress
                ? (achievement.currentProgress / achievement.requirement) * 100
                : 0;

              return (
                <Card
                  key={achievement.id}
                  className={`zen-card relative overflow-hidden transition-all ${
                    achievement.unlocked
                      ? `${
                          rarityGlow[achievement.rarity]
                        } shadow-lg hover:scale-105`
                      : "opacity-60"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`${
                          achievement.unlocked
                            ? rarityColors[achievement.rarity]
                            : "bg-muted"
                        } h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        {achievement.unlocked ? (
                          <Icon className="h-6 w-6 text-white" />
                        ) : (
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">
                          {achievement.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            achievement.unlocked
                              ? rarityColors[achievement.rarity]
                              : ""
                          }`}
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>

                    {!achievement.unlocked &&
                      achievement.currentProgress !== undefined && (
                        <div className="space-y-1 mb-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">
                              Progress
                            </span>
                            <span className="font-semibold">
                              {achievement.currentProgress} /{" "}
                              {achievement.requirement}
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}

                    {achievement.unlocked && achievement.unlockedDate && (
                      <p className="text-xs text-muted-foreground mb-2">
                        Unlocked: {achievement.unlockedDate}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-muted-foreground">
                        Reward:
                      </span>
                      <span className="text-xs font-semibold">
                        {achievement.reward}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {["meditation", "streak", "social", "special"].map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements
                .filter((a) => a.category === category)
                .map((achievement) => {
                  const Icon = achievement.icon;
                  const progress = achievement.currentProgress
                    ? (achievement.currentProgress / achievement.requirement) *
                      100
                    : 0;

                  return (
                    <Card
                      key={achievement.id}
                      className={`zen-card relative overflow-hidden transition-all ${
                        achievement.unlocked
                          ? `${
                              rarityGlow[achievement.rarity]
                            } shadow-lg hover:scale-105`
                          : "opacity-60"
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className={`${
                              achievement.unlocked
                                ? rarityColors[achievement.rarity]
                                : "bg-muted"
                            } h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            {achievement.unlocked ? (
                              <Icon className="h-6 w-6 text-white" />
                            ) : (
                              <Lock className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">
                              {achievement.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                achievement.unlocked
                                  ? rarityColors[achievement.rarity]
                                  : ""
                              }`}
                            >
                              {achievement.rarity}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                          {achievement.description}
                        </p>

                        {!achievement.unlocked &&
                          achievement.currentProgress !== undefined && (
                            <div className="space-y-1 mb-3">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Progress
                                </span>
                                <span className="font-semibold">
                                  {achievement.currentProgress} /{" "}
                                  {achievement.requirement}
                                </span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>
                          )}

                        {achievement.unlocked && achievement.unlockedDate && (
                          <p className="text-xs text-muted-foreground mb-2">
                            Unlocked: {achievement.unlockedDate}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-xs text-muted-foreground">
                            Reward:
                          </span>
                          <span className="text-xs font-semibold">
                            {achievement.reward}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
