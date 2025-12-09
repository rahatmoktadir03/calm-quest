import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Target, Trophy, Zap, CheckCircle, Clock, Star } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: "meditation" | "breathing" | "streak" | "social" | "exploration";
  requirement: string;
  reward: {
    xp: number;
    badge?: string;
  };
  icon: React.ComponentType<{ className?: string }>;
  progress: number;
  target: number;
  completed: boolean;
}

const generateDailyChallenges = (
  level: number,
  currentStreak: number
): DailyChallenge[] => {
  const allChallenges = [
    {
      id: "daily-meditation",
      title: "Daily Practice",
      description: "Complete one meditation session today",
      type: "meditation" as const,
      requirement: "Complete 1 session",
      reward: { xp: 50 },
      icon: Target,
      target: 1,
    },
    {
      id: "early-bird",
      title: "Early Bird Meditator",
      description: "Meditate before 9 AM",
      type: "meditation" as const,
      requirement: "Meditate before 9 AM",
      reward: { xp: 75, badge: "🌅" },
      icon: Clock,
      target: 1,
    },
    {
      id: "breathing-master",
      title: "Breath Work",
      description: "Try a breathing exercise",
      type: "breathing" as const,
      requirement: "Complete any breathing technique",
      reward: { xp: 60 },
      icon: Zap,
      target: 1,
    },
    {
      id: "streak-warrior",
      title: "Maintain the Flame",
      description: "Keep your streak alive",
      type: "streak" as const,
      requirement: "Don't break your streak",
      reward: { xp: currentStreak * 10 },
      icon: Trophy,
      target: 1,
    },
    {
      id: "character-explorer",
      title: "Character Journey",
      description: "Try a character-themed meditation",
      type: "exploration" as const,
      requirement: "Use any character theme",
      reward: { xp: 80, badge: "✨" },
      icon: Star,
      target: 1,
    },
    {
      id: "long-session",
      title: "Deep Dive",
      description: "Meditate for 20+ minutes",
      type: "meditation" as const,
      requirement: "Complete a 20+ minute session",
      reward: { xp: 100 },
      icon: Target,
      target: 20,
    },
  ];

  // Return 3 random challenges
  const shuffled = [...allChallenges].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((c) => ({
    ...c,
    progress: 0,
    completed: false,
  }));
};

export const AdvancedDailyChallenges = () => {
  const { stats } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedChallengesDate = localStorage.getItem("challenges-date");
    const storedChallenges = localStorage.getItem("daily-challenges");

    if (storedChallengesDate === today && storedChallenges) {
      setChallenges(JSON.parse(storedChallenges));
    } else {
      const newChallenges = generateDailyChallenges(
        stats.level,
        stats.currentStreak
      );
      setChallenges(newChallenges);
      localStorage.setItem("daily-challenges", JSON.stringify(newChallenges));
      localStorage.setItem("challenges-date", today);
    }
  }, [stats.level, stats.currentStreak]);

  const completeChallenge = (challengeId: string) => {
    setChallenges((prev) => {
      const updated = prev.map((c) =>
        c.id === challengeId ? { ...c, completed: true, progress: c.target } : c
      );
      localStorage.setItem("daily-challenges", JSON.stringify(updated));
      return updated;
    });

    const challenge = challenges.find((c) => c.id === challengeId);
    if (challenge) {
      toast({
        title: "🎉 Challenge Complete!",
        description: `+${challenge.reward.xp} XP earned! ${
          challenge.reward.badge || ""
        }`,
      });
    }
  };

  const completedCount = challenges.filter((c) => c.completed).length;
  const totalChallenges = challenges.length;
  const completionPercentage = (completedCount / totalChallenges) * 100;

  return (
    <Card className="zen-card border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Daily Challenges
            </CardTitle>
            <CardDescription>
              Complete challenges to earn bonus XP
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {completedCount}/{totalChallenges}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Progress</span>
            <span className="font-semibold">
              {Math.round(completionPercentage)}%
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <div className="space-y-3">
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            return (
              <Card
                key={challenge.id}
                className={`p-4 transition-all ${
                  challenge.completed
                    ? "bg-primary/10 border-primary/30"
                    : "hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      challenge.completed ? "bg-primary/20" : "bg-muted"
                    }`}
                  >
                    {challenge.completed ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{challenge.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {challenge.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {challenge.requirement}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        +{challenge.reward.xp} XP
                      </Badge>
                    </div>

                    {!challenge.completed && (
                      <Button
                        size="sm"
                        className="mt-3"
                        onClick={() => {
                          if (challenge.type === "meditation") {
                            navigate("/select-mood");
                          } else if (challenge.type === "breathing") {
                            navigate("/breathing");
                          } else if (challenge.type === "exploration") {
                            navigate("/characters");
                          } else {
                            completeChallenge(challenge.id);
                          }
                        }}
                      >
                        Start Challenge
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {completedCount === totalChallenges && (
          <Card className="p-4 bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
            <div className="text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold">All Challenges Complete! 🎉</p>
              <p className="text-sm text-muted-foreground">
                Come back tomorrow for new challenges
              </p>
            </div>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
