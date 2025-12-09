import { useNavigate } from "react-router-dom";
import { useUser, xpForNextLevel } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { initializeAchievements } from "@/lib/achievements";
import { QuestCard } from "@/components/QuestCard";
import { OnboardingFlow as OnboardingFlowEnhanced } from "@/components/OnboardingFlowEnhanced";
import { AdvancedDailyChallenges } from "@/components/AdvancedDailyChallenges";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  Trophy,
  Flame,
  Star,
  Heart,
  Zap,
  User,
  Sparkles,
  Users,
  Wind,
  Calendar,
  Award,
  BarChart3,
  BookOpen,
  Volume2,
  Settings,
  Smile,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { stats, checkStreak } = useUser();
  const { user, loading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      navigate("/login");
      return;
    }

    // Initialize achievements if not already done
    if (stats.achievements.length === 0) {
      const achievements = initializeAchievements();
      // Store in user context (will be handled by the context itself)
    }
    // Check streak on page load
    checkStreak();
  }, [user, loading]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading CalmQuest...</p>
        </div>
      </div>
    );
  }

  const currentLevelXP = Math.pow(stats.level - 1, 2) * 100;
  const nextLevelXP = xpForNextLevel(stats.level);
  const xpInCurrentLevel = stats.xp - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  const levelProgress = (xpInCurrentLevel / xpNeededForLevel) * 100;

  const quests = [
    {
      icon: Zap,
      title: "Quick Meditation",
      description:
        "Short 1-5 minute sessions for busy moments. Perfect for quick stress relief and instant calm.",
      path: "/quick-meditation",
    },
    {
      icon: Sparkles,
      title: "Character Themes",
      description:
        "Meditate with legendary characters like Jon Snow, Yoda, or Gandalf. Each brings unique wisdom and guidance.",
      path: "/characters",
    },
    {
      icon: Calendar,
      title: "Custom Plans",
      description:
        "Create personalized meditation plans with AI assistance. Set goals, schedule sessions, and track progress.",
      path: "/create-plan",
    },
    {
      icon: Award,
      title: "Achievements",
      description:
        "Track your milestones and unlock rewards. View all your meditation achievements in one beautiful gallery.",
      path: "/achievements",
    },
    {
      icon: Flame,
      title: "Streak Rewards",
      description:
        "Build momentum with consecutive days. Unlock special badges, XP bonuses, and exclusive characters.",
      path: "/streak",
    },
    {
      icon: Smile,
      title: "Mood Tracker",
      description:
        "Log your daily emotions and identify patterns. Understand how meditation impacts your wellbeing.",
      path: "/mood-tracker",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Connect with fellow meditators. View leaderboards, add friends, and share your meditation journey.",
      path: "/community",
    },
    {
      icon: Wind,
      title: "Breathing",
      description:
        "Master breathing techniques like 4-7-8, Box Breathing, and Wim Hof Method with animated guides.",
      path: "/breathing",
    },
    {
      icon: Target,
      title: "Guided Programs",
      description:
        "Follow structured 7-30 day meditation programs. From basics to zen mastery, choose your path.",
      path: "/programs",
    },
    {
      icon: Star,
      title: "AI Coach",
      description:
        "Get personalized guidance from your AI coach. Chat about challenges and receive custom meditation scripts.",
      path: "/ai-coach",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description:
        "Track your meditation patterns with detailed insights. View weekly stats and AI-powered recommendations.",
      path: "/analytics",
    },
    {
      icon: BookOpen,
      title: "Journal",
      description:
        "Reflect on your practice with post-session journaling. Get AI analysis of your meditation journey.",
      path: "/journal",
    },
    {
      icon: Volume2,
      title: "Ambient Sounds",
      description:
        "Create the perfect atmosphere with nature sounds. Mix rain, ocean, forest, and fire sounds.",
      path: "/sounds",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Enhanced Onboarding Flow */}
      <OnboardingFlowEnhanced />

      <div className="max-w-7xl mx-auto">
        {/* Header with Profile Button */}
        <div className="flex justify-end gap-2 mb-4">
          <ThemeToggle />
          <Button
            variant="outline"
            onClick={() => navigate("/settings")}
            className="gap-2 zen-card"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/ai-coach")}
            className="gap-2 zen-card"
          >
            <Star className="h-4 w-4" />
            AI Coach
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/profile")}
            className="gap-2 zen-card"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 zen-text-gradient">
            🧘 Calm Quest
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform meditation into an adventure. Level up your mindfulness,
            unlock achievements, and find inner peace.
          </p>

          {/* Daily Challenge */}
          {stats.totalQuestsCompleted > 0 && (
            <div className="max-w-3xl mx-auto mb-8">
              <AdvancedDailyChallenges />
            </div>
          )}

          {/* User Stats Card */}
          {stats.totalQuestsCompleted > 0 ? (
            <Card className="max-w-2xl mx-auto p-6 mb-8 zen-card">
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            ✨ Explore New Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {quests.map((quest, index) => (
              <div
                key={quest.title}
                onClick={() => navigate(quest.path)}
                className="cursor-pointer"
              >
                <QuestCard
                  icon={quest.icon}
                  title={quest.title}
                  description={quest.description}
                  delay={index * 100}
                />
              </div>
            ))}
          </div>
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
