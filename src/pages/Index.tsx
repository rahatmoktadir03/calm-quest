import { useNavigate } from "react-router-dom";
import { useUser, xpForNextLevel } from "@/contexts/UserContext";
import { useEffect } from "react";
import { initializeAchievements } from "@/lib/achievements";
import { QuestCard } from "@/components/QuestCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Flame, Star, Heart, Zap, User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { stats, checkStreak } = useUser();

  useEffect(() => {
    // Initialize achievements if not already done
    if (stats.achievements.length === 0) {
      const achievements = initializeAchievements();
      // Store in user context (will be handled by the context itself)
    }
    // Check streak on page load
    checkStreak();
  }, []);

  const currentLevelXP = Math.pow(stats.level - 1, 2) * 100;
  const nextLevelXP = xpForNextLevel(stats.level);
  const xpInCurrentLevel = stats.xp - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  const levelProgress = (xpInCurrentLevel / xpNeededForLevel) * 100;

  const quests = [
    {
      icon: Target,
      title: "Daily Streak Challenge",
      description:
        "Build momentum with consecutive days of meditation. Unlock special badges and rewards as your streak grows stronger.",
    },
    {
      icon: Trophy,
      title: "Achievement Unlocks",
      description:
        "Earn trophies for meditation milestones like '7-Day Warrior' or 'Zen Master'. Collect rare achievements to showcase your progress.",
    },
    {
      icon: Flame,
      title: "XP & Level System",
      description:
        "Gain experience points with each session. Level up to unlock new meditation techniques, sounds, and customization options.",
    },
    {
      icon: Star,
      title: "Quest Missions",
      description:
        "Complete weekly challenges like 'Meditate at sunrise' or 'Try breathing exercises'. Each quest brings unique rewards and discoveries.",
    },
    {
      icon: Heart,
      title: "Wellness Score",
      description:
        "Track your stress relief progress with a dynamic wellness meter. Watch it grow as you maintain consistency and reach new personal bests.",
    },
    {
      icon: Zap,
      title: "Power-Ups & Boosts",
      description:
        "Unlock special meditation modes and guided sessions. Use power-ups to enhance your practice and discover deeper states of calm.",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Profile Button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            onClick={() => navigate("/profile")}
            className="gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Calm Quest
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform meditation into an adventure. Level up your mindfulness,
            unlock achievements, and conquer stress with gamified wellness.
          </p>

          {/* User Stats Card */}
          {stats.totalQuestsCompleted > 0 ? (
            <Card className="max-w-2xl mx-auto p-6 mb-8 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <h3 className="text-2xl font-bold">Level {stats.level}</h3>
                  <p className="text-sm text-muted-foreground">
                    {Math.floor(xpInCurrentLevel)} / {xpNeededForLevel} XP
                  </p>
                </div>
                <div className="flex gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold">
                      {stats.currentStreak}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      🔥 Streak
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {stats.totalQuestsCompleted}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ✅ Quests
                    </div>
                  </div>
                </div>
              </div>
              <Progress value={levelProgress} className="h-2 mb-4" />
              <Button
                onClick={() => navigate("/select-mood")}
                size="lg"
                className="w-full"
              >
                Start Your Daily Quest
              </Button>
            </Card>
          ) : (
            <Button
              onClick={() => navigate("/select-mood")}
              size="lg"
              className="text-lg px-8 py-6"
            >
              Begin Your Journey
            </Button>
          )}
        </div>

        {/* Quest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {quests.map((quest, index) => (
            <QuestCard
              key={quest.title}
              icon={quest.icon}
              title={quest.title}
              description={quest.description}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground animate-fade-in">
          <p className="text-sm">
            Begin your journey to inner peace, one quest at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
