import { useNavigate } from "react-router-dom";
import { useUser, xpForNextLevel } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Trophy,
  Flame,
  Clock,
  Target,
  Award,
  LogOut,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { stats, resetProgress } = useUser();
  const { signOut, user } = useAuth();

  const currentLevelXP = Math.pow(stats.level - 1, 2) * 100;
  const nextLevelXP = xpForNextLevel(stats.level);
  const xpInCurrentLevel = stats.xp - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  const levelProgress = (xpInCurrentLevel / xpNeededForLevel) * 100;

  const unlockedAchievements = stats.achievements.filter((a) => a.unlocked);
  const lockedAchievements = stats.achievements.filter((a) => !a.unlocked);

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all progress? This cannot be undone."
      )
    ) {
      resetProgress();
      navigate("/");
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          {user && (
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Header Card */}
          <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-6xl mb-4">🧘</div>
            <h1 className="text-4xl font-bold mb-2">
              Level {stats.level} Mindful Warrior
            </h1>
            <p className="text-muted-foreground mb-6">
              Keep going on your journey to inner peace
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span>Level {stats.level}</span>
                <span>Level {stats.level + 1}</span>
              </div>
              <Progress value={levelProgress} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground">
                {Math.floor(xpInCurrentLevel)} / {xpNeededForLevel} XP
              </p>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Quests</h3>
              </div>
              <p className="text-3xl font-bold">{stats.totalQuestsCompleted}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="h-6 w-6 text-orange-500" />
                <h3 className="font-semibold">Streak</h3>
              </div>
              <p className="text-3xl font-bold">{stats.currentStreak}</p>
              <p className="text-sm text-muted-foreground">
                Best: {stats.longestStreak} days
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-6 w-6 text-blue-500" />
                <h3 className="font-semibold">Time</h3>
              </div>
              <p className="text-3xl font-bold">
                {stats.totalMeditationMinutes}
              </p>
              <p className="text-sm text-muted-foreground">
                {Math.floor(stats.totalMeditationMinutes / 60)}h{" "}
                {stats.totalMeditationMinutes % 60}m total
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <h3 className="font-semibold">Achievements</h3>
              </div>
              <p className="text-3xl font-bold">
                {unlockedAchievements.length}
              </p>
              <p className="text-sm text-muted-foreground">
                of {stats.achievements.length} unlocked
              </p>
            </Card>
          </div>

          {/* Achievements Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Achievements</h2>
            </div>

            {unlockedAchievements.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-green-600 dark:text-green-400">
                  ✨ Unlocked ({unlockedAchievements.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {unlockedAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                    >
                      <span className="text-3xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-semibold">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.unlockedAt && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Unlocked{" "}
                            {new Date(
                              achievement.unlockedAt
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lockedAchievements.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 text-muted-foreground">
                  🔒 Locked ({lockedAchievements.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lockedAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 opacity-60"
                    >
                      <span className="text-3xl grayscale">
                        {achievement.icon}
                      </span>
                      <div>
                        <h4 className="font-semibold">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Recent Activity */}
          {stats.completedQuests.length > 0 && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {stats.completedQuests
                  .slice(-5)
                  .reverse()
                  .map((quest, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                    >
                      <div>
                        <p className="font-semibold">Quest Completed</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(quest.completedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge>+{quest.xpEarned} XP</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {quest.duration} min
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/select-mood")} size="lg">
              Start New Quest
            </Button>
            <Button onClick={handleReset} variant="destructive" size="lg">
              Reset Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
