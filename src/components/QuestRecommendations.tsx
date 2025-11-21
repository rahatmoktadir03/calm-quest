import { Quest } from "@/lib/questGenerator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy } from "lucide-react";

interface QuestRecommendationsProps {
  currentQuest: Quest;
  allQuests: Quest[];
  onQuestSelect: (quest: Quest) => void;
}

export const QuestRecommendations = ({
  currentQuest,
  allQuests,
  onQuestSelect,
}: QuestRecommendationsProps) => {
  // Get similar quests based on type and difficulty
  const getSimilarQuests = (): Quest[] => {
    return allQuests
      .filter((q) => {
        return (
          q.id !== currentQuest.id &&
          (q.type === currentQuest.type ||
            q.difficulty === currentQuest.difficulty)
        );
      })
      .slice(0, 3);
  };

  const recommendations = getSimilarQuests();

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">You Might Also Like</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((quest) => (
          <Card
            key={quest.id}
            className="p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
            onClick={() => onQuestSelect(quest)}
          >
            <div className="space-y-3">
              <div className="text-3xl">{quest.icon}</div>
              <h4 className="font-semibold line-clamp-1">{quest.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {quest.description}
              </p>
              <div className="flex gap-2 text-xs">
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {quest.duration}m
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Trophy className="h-3 w-3" />
                  {quest.xpReward} XP
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
