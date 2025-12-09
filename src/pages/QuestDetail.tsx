import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Quest, getAllQuests } from "@/lib/questGenerator";
import { useUser } from "@/contexts/UserContext";
import { MeditationTimer } from "@/components/MeditationTimer";
import { BreathingVisualizer } from "@/components/BreathingVisualizer";
import { MeditationScriptGenerator } from "@/components/MeditationScriptGenerator";
import { AchievementUnlock } from "@/components/AchievementUnlock";
import { ShareAchievement } from "@/components/ShareAchievement";
import { QuestRecommendations } from "@/components/QuestRecommendations";
import {
  MilestoneCelebration,
  checkMilestones,
} from "@/components/MilestoneCelebration";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Trophy, Sparkles } from "lucide-react";
import { checkAchievements } from "@/lib/achievements";
import { soundEffects } from "@/lib/soundEffects";
import confetti from "canvas-confetti";

const QuestDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { stats, completeQuest, unlockAchievement } = useUser();
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [showAchievementToast, setShowAchievementToast] = useState(false);
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);
  const [milestone, setMilestone] = useState<any>(null);
  const [showBreathingViz, setShowBreathingViz] = useState(false);

  const quest = location.state?.quest as Quest;
  const character = location.state?.character;
  const allQuests = getAllQuests();

  // All hooks must be at the top level
  useEffect(() => {
    if (!quest) {
      navigate("/select-mood");
    }
  }, [quest, navigate]);

  // Handle showing achievements sequentially
  useEffect(() => {
    if (
      showAchievementToast &&
      currentAchievementIndex < newAchievements.length
    ) {
      const timer = setTimeout(() => {
        setCurrentAchievementIndex((prev) => prev + 1);
        if (currentAchievementIndex < newAchievements.length - 1) {
          setShowAchievementToast(true);
        } else {
          setShowAchievementToast(false);
        }
      }, 5500); // Slightly longer than achievement display time
      return () => clearTimeout(timer);
    }
  }, [showAchievementToast, currentAchievementIndex, newAchievements]);

  if (!quest) return null;

  const handleComplete = () => {
    const xpEarned = Math.floor(quest.duration * 2 + 50);
    setEarnedXP(xpEarned);

    // Play sounds
    soundEffects.questComplete();
    soundEffects.xpGain();

    const oldLevel = stats.level;
    completeQuest(quest.id, quest.title, quest.duration);

    // Check if leveled up
    const newLevel = Math.floor(Math.sqrt((stats.xp + xpEarned) / 100)) + 1;
    if (newLevel > oldLevel) {
      setTimeout(() => soundEffects.levelUp(), 300);
    }

    // Check for new achievements
    const newlyUnlocked = checkAchievements(stats);
    setNewAchievements(newlyUnlocked);
    newlyUnlocked.forEach((achievementId) => {
      unlockAchievement(achievementId);
      soundEffects.achievement();
    });

    // Check for milestones
    const detectedMilestone = checkMilestones({
      ...stats,
      totalQuestsCompleted: stats.totalQuestsCompleted + 1,
    });
    if (detectedMilestone) {
      setMilestone(detectedMilestone);
    }

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setShowCompletion(true);

    // Show achievement toasts one by one
    if (newlyUnlocked.length > 0) {
      setTimeout(() => {
        setShowAchievementToast(true);
      }, 500);
    }
  };

  const currentLevelXP = Math.pow(stats.level - 1, 2) * 100;
  const nextLevelXP = Math.pow(stats.level, 2) * 100;
  const xpInCurrentLevel = stats.xp - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  const levelProgress = (xpInCurrentLevel / xpNeededForLevel) * 100;

  // If quest is not found, redirect (handled by useEffect)
  if (!quest) {
    return null;
  }

  if (showCompletion) {
    const currentAchievement = newAchievements[currentAchievementIndex]
      ? stats.achievements.find(
          (a) => a.id === newAchievements[currentAchievementIndex]
        )
      : undefined;

    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Milestone celebration */}
        {milestone && (
          <MilestoneCelebration
            milestone={milestone}
            onClose={() => setMilestone(null)}
          />
        )}

        {showAchievementToast && currentAchievement && (
          <AchievementUnlock
            achievement={currentAchievement}
            onClose={() => setShowAchievementToast(false)}
          />
        )}
        <div className="max-w-2xl w-full space-y-6">
          <Card className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="text-6xl">🎉</div>
              <h1 className="text-4xl font-bold">Quest Complete!</h1>
              <p className="text-xl text-muted-foreground">
                Amazing work on completing this quest
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-primary/10 rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  <span className="text-2xl font-bold">+{earnedXP} XP</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Level {stats.level} • {Math.floor(xpInCurrentLevel)}/
                  {xpNeededForLevel} XP
                </p>
                <Progress value={levelProgress} className="mt-3 h-2" />
              </div>

              {newAchievements.length > 0 && (
                <>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                      <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                        New Achievement{newAchievements.length > 1 ? "s" : ""}{" "}
                        Unlocked!
                      </span>
                    </div>
                    <div className="space-y-2">
                      {newAchievements.map((achievementId) => {
                        const achievement = stats.achievements.find(
                          (a) => a.id === achievementId
                        );
                        return achievement ? (
                          <Badge
                            key={achievementId}
                            variant="outline"
                            className="text-sm"
                          >
                            {achievement.icon} {achievement.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Share Achievement */}
                  {newAchievements.length > 0 && (
                    <ShareAchievement
                      achievement={
                        stats.achievements.find(
                          (a) => a.id === newAchievements[0]
                        )!
                      }
                    />
                  )}
                </>
              )}

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">
                    {stats.totalQuestsCompleted}
                  </div>
                  <div className="text-xs text-muted-foreground">Quests</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {stats.currentStreak}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Day Streak
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {stats.totalMeditationMinutes}
                  </div>
                  <div className="text-xs text-muted-foreground">Minutes</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quest Recommendations */}
          <QuestRecommendations
            currentQuest={quest}
            allQuests={allQuests}
            onQuestSelect={(selectedQuest) => {
              navigate(`/quest/${selectedQuest.id}`, {
                state: { quest: selectedQuest },
              });
              window.location.reload(); // Refresh to reset state
            }}
          />

          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/quests")} size="lg">
              Continue Questing
            </Button>
            <Button
              onClick={() => navigate("/profile")}
              variant="outline"
              size="lg"
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quests
        </Button>

        <div className="space-y-8">
          {/* Quest Info Card */}
          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-6xl">{quest.icon}</div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{quest.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {quest.description}
                </p>
                <div className="flex gap-3">
                  <Badge variant="outline">{quest.duration} minutes</Badge>
                  <Badge variant="outline" className="capitalize">
                    {quest.type}
                  </Badge>
                  <Badge variant="outline">{quest.xpReward} XP</Badge>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Instructions
              </h3>
              <ul className="space-y-2">
                {quest.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-primary font-semibold">
                      {index + 1}.
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Breathing Visualizer for breathing quests */}
          {quest.type === "breathing" && (
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Follow the Breathing Guide
              </h3>
              <BreathingVisualizer
                isActive={showBreathingViz}
                onCycleComplete={() => {}}
              />
              <div className="flex justify-center mt-6">
                <Button
                  onClick={() => setShowBreathingViz(!showBreathingViz)}
                  variant={showBreathingViz ? "outline" : "default"}
                  size="lg"
                >
                  {showBreathingViz
                    ? "Stop Breathing Guide"
                    : "Start Breathing Guide"}
                </Button>
              </div>
            </Card>
          )}

          {/* AI Meditation Script Generator */}
          {stats.currentMood && (
            <MeditationScriptGenerator
              mood={stats.currentMood}
              duration={quest.duration}
              character={character}
            />
          )}

          {/* Timer */}
          <MeditationTimer
            duration={quest.duration}
            onComplete={handleComplete}
            questTitle={quest.title}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestDetail;
