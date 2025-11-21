import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Zap } from "lucide-react";

interface DailyChallengeBannerProps {
  onStartChallenge: () => void;
}

export const DailyChallengeB = ({
  onStartChallenge,
}: DailyChallengeBannerProps) => {
  // Simple daily challenge - changes based on day of week
  const getDailyChallenge = () => {
    const day = new Date().getDay();
    const challenges = [
      {
        title: "Sunday Serenity",
        description: "Complete 2 meditation quests",
        reward: 100,
        emoji: "🌅",
      },
      {
        title: "Mindful Monday",
        description: "Complete any 3 quests",
        reward: 150,
        emoji: "🎯",
      },
      {
        title: "Tranquil Tuesday",
        description: "Try a breathing exercise",
        reward: 80,
        emoji: "💨",
      },
      {
        title: "Wellness Wednesday",
        description: "Complete a 10+ min quest",
        reward: 120,
        emoji: "🌿",
      },
      {
        title: "Thankful Thursday",
        description: "Complete 2 quests today",
        reward: 100,
        emoji: "🙏",
      },
      {
        title: "Focus Friday",
        description: "Complete a hard difficulty quest",
        reward: 200,
        emoji: "🔥",
      },
      {
        title: "Self-Care Saturday",
        description: "Complete any quest + share it",
        reward: 150,
        emoji: "✨",
      },
    ];
    return challenges[day];
  };

  const challenge = getDailyChallenge();

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border-purple-500/20">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl" />
      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                Daily Challenge
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              {challenge.emoji} {challenge.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              {challenge.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 rounded-full">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="font-bold text-yellow-600 dark:text-yellow-400">
                  +{challenge.reward} Bonus XP
                </span>
              </div>
            </div>
          </div>
          <Button onClick={onStartChallenge} size="lg" className="shrink-0">
            Accept Challenge
          </Button>
        </div>
      </div>
    </Card>
  );
};
