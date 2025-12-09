import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Flame, Gift, Trophy, Zap } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface StreakMilestone {
  days: number;
  title: string;
  reward: string;
  icon: string;
  color: string;
}

const streakMilestones: StreakMilestone[] = [
  {
    days: 3,
    title: "Beginner's Fire",
    reward: "+50 XP Bonus",
    icon: "🔥",
    color: "text-orange-500",
  },
  {
    days: 7,
    title: "Week Warrior",
    reward: "New Theme Unlocked",
    icon: "⭐",
    color: "text-yellow-500",
  },
  {
    days: 14,
    title: "Fortnight Focus",
    reward: "+100 XP Bonus",
    icon: "💎",
    color: "text-blue-500",
  },
  {
    days: 30,
    title: "Monthly Master",
    reward: "Legendary Character",
    icon: "👑",
    color: "text-purple-500",
  },
  {
    days: 50,
    title: "Dedication Deity",
    reward: "Exclusive Badge",
    icon: "🏆",
    color: "text-amber-500",
  },
  {
    days: 100,
    title: "Century Sage",
    reward: "Master Title + 500 XP",
    icon: "🌟",
    color: "text-cyan-500",
  },
  {
    days: 365,
    title: "Yearly Zen Master",
    reward: "Ultimate Achievement",
    icon: "🎖️",
    color: "text-rose-500",
  },
];

export const StreakRewards = () => {
  const { stats } = useUser();
  const currentStreak = stats.currentStreak;
  const longestStreak = stats.longestStreak;

  const nextMilestone =
    streakMilestones.find((m) => m.days > currentStreak) ||
    streakMilestones[streakMilestones.length - 1];
  const daysUntilNext = nextMilestone.days - currentStreak;
  const progressToNext = (currentStreak / nextMilestone.days) * 100;

  return (
    <div className="space-y-6">
      {/* Current Streak Card */}
      <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-6 w-6 animate-pulse" />
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="text-6xl font-bold">{currentStreak}</div>
            <div className="text-2xl pb-2">days</div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Next Milestone: {nextMilestone.title}</span>
              <span>{daysUntilNext} days to go</span>
            </div>
            <Progress value={progressToNext} className="h-2 bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Longest Streak */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Personal Best: {longestStreak} Days
          </CardTitle>
          <CardDescription>
            {currentStreak === longestStreak
              ? "🎉 You're on your best streak ever!"
              : `${longestStreak - currentStreak} days away from your record!`}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Streak Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-purple-500" />
            Streak Rewards
          </CardTitle>
          <CardDescription>
            Keep your daily practice going to unlock amazing rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {streakMilestones.map((milestone) => {
              const isCompleted = currentStreak >= milestone.days;
              const isCurrent =
                currentStreak < milestone.days && milestone === nextMilestone;

              return (
                <div
                  key={milestone.days}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                    isCompleted
                      ? "bg-green-50 border-green-500"
                      : isCurrent
                      ? "bg-purple-50 border-purple-500 shadow-md"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="text-4xl">{milestone.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{milestone.title}</h4>
                      <Badge variant={isCompleted ? "default" : "secondary"}>
                        {milestone.days} days
                      </Badge>
                      {isCompleted && (
                        <Badge className="bg-green-500">✓ Unlocked</Badge>
                      )}
                      {isCurrent && (
                        <Badge className="bg-purple-500 animate-pulse">
                          <Zap className="h-3 w-3 mr-1" />
                          Next
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {milestone.reward}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Streak Protection */}
      <Card className="border-2 border-amber-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🛡️ Streak Protection
          </CardTitle>
          <CardDescription>
            Don't lose your streak! Complete at least one meditation session
            today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Today's Progress</span>
              <span>
                {stats.totalQuestsCompleted > 0
                  ? "✓ Complete"
                  : "Not yet started"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              💡 Tip: Earn Streak Freeze items at higher levels to protect your
              streak on busy days!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
