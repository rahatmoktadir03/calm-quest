import { QuestCard } from "@/components/QuestCard";
import { Target, Trophy, Flame, Star, Heart, Zap } from "lucide-react";

const Index = () => {
  const quests = [
    {
      icon: Target,
      title: "Daily Streak Challenge",
      description: "Build momentum with consecutive days of meditation. Unlock special badges and rewards as your streak grows stronger.",
    },
    {
      icon: Trophy,
      title: "Achievement Unlocks",
      description: "Earn trophies for meditation milestones like '7-Day Warrior' or 'Zen Master'. Collect rare achievements to showcase your progress.",
    },
    {
      icon: Flame,
      title: "XP & Level System",
      description: "Gain experience points with each session. Level up to unlock new meditation techniques, sounds, and customization options.",
    },
    {
      icon: Star,
      title: "Quest Missions",
      description: "Complete weekly challenges like 'Meditate at sunrise' or 'Try breathing exercises'. Each quest brings unique rewards and discoveries.",
    },
    {
      icon: Heart,
      title: "Wellness Score",
      description: "Track your stress relief progress with a dynamic wellness meter. Watch it grow as you maintain consistency and reach new personal bests.",
    },
    {
      icon: Zap,
      title: "Power-Ups & Boosts",
      description: "Unlock special meditation modes and guided sessions. Use power-ups to enhance your practice and discover deeper states of calm.",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Calm Quest
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform meditation into an adventure. Level up your mindfulness, unlock achievements, and conquer stress with gamified wellness.
          </p>
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
