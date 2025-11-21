import { useLocation, useNavigate } from "react-router-dom";
import { Quest, getDifficultyColor } from "@/lib/questGenerator";
import { Mood } from "@/contexts/UserContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Trophy, Zap } from "lucide-react";

const QuestList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mood, quests } = location.state as { mood: Mood; quests: Quest[] };

  if (!quests || quests.length === 0) {
    navigate("/select-mood");
    return null;
  }

  const handleQuestClick = (quest: Quest) => {
    navigate(`/quest/${quest.id}`, { state: { quest } });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/select-mood")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Change Mood
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Personalized Quests</h1>
          <p className="text-lg text-muted-foreground">
            Based on your current mood:{" "}
            <span className="capitalize font-semibold">{mood}</span>
          </p>
        </div>

        <div className="space-y-6">
          {quests.map((quest) => (
            <Card
              key={quest.id}
              className="p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
              onClick={() => handleQuestClick(quest)}
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{quest.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold">{quest.title}</h3>
                    <Badge className={getDifficultyColor(quest.difficulty)}>
                      {quest.difficulty}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {quest.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{quest.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span>{quest.xpReward} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="capitalize">{quest.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate("/select-mood")}>
            Get Different Quests
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestList;
