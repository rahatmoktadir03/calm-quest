import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";
import confetti from "canvas-confetti";

interface Milestone {
  title: string;
  description: string;
  emoji: string;
}

interface MilestoneCelebrationProps {
  milestone: Milestone;
  onClose: () => void;
}

export const MilestoneCelebration = ({
  milestone,
  onClose,
}: MilestoneCelebrationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FFA500", "#FF69B4", "#00CED1", "#9370DB"],
    });

    setTimeout(() => setIsVisible(true), 100);

    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card
        className={`max-w-md w-full p-8 text-center space-y-4 relative transition-all duration-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
            <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
              Milestone Reached!
            </span>
            <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
          </div>

          <div className="text-7xl animate-bounce">{milestone.emoji}</div>

          <div>
            <h2 className="text-3xl font-bold mb-2">{milestone.title}</h2>
            <p className="text-lg text-muted-foreground">
              {milestone.description}
            </p>
          </div>

          <Button onClick={handleClose} size="lg" className="w-full">
            Awesome!
          </Button>
        </div>
      </Card>
    </div>
  );
};

export const checkMilestones = (stats: {
  totalQuestsCompleted: number;
  level: number;
  currentStreak: number;
  achievements: any[];
}): Milestone | null => {
  const { totalQuestsCompleted, level, currentStreak, achievements } = stats;

  // Check for milestones (only trigger on exact numbers)
  if (totalQuestsCompleted === 1) {
    return {
      title: "First Quest Complete!",
      description: "You've taken your first step on the path to mindfulness.",
      emoji: "🌱",
    };
  }

  if (level === 5) {
    return {
      title: "Level 5 Reached!",
      description: "You're becoming a mindfulness warrior!",
      emoji: "⭐",
    };
  }

  if (level === 10) {
    return {
      title: "Level 10 Achieved!",
      description: "You're well on your way to zen mastery!",
      emoji: "🧘",
    };
  }

  if (currentStreak === 7) {
    return {
      title: "Week Streak!",
      description:
        "Seven days of consistency - you're building a powerful habit!",
      emoji: "🔥",
    };
  }

  if (currentStreak === 30) {
    return {
      title: "Month Streak!",
      description: "Thirty days strong! You're unstoppable!",
      emoji: "👑",
    };
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  if (unlockedCount === achievements.length && achievements.length > 0) {
    return {
      title: "All Achievements Unlocked!",
      description:
        "You've completed every challenge. You are a true mindfulness master!",
      emoji: "🏆",
    };
  }

  return null;
};
