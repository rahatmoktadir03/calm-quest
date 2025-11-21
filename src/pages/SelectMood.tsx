import { useNavigate } from "react-router-dom";
import { MoodSelector } from "@/components/MoodSelector";
import { useUser, Mood } from "@/contexts/UserContext";
import { generateQuestsForMood } from "@/lib/questGenerator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SelectMood = () => {
  const navigate = useNavigate();
  const { updateMood } = useUser();

  const handleMoodSelect = (mood: Mood) => {
    updateMood(mood);
    const quests = generateQuestsForMood(mood, 3);
    navigate("/quests", { state: { mood, quests } });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <MoodSelector onSelectMood={handleMoodSelect} />
      </div>
    </div>
  );
};

export default SelectMood;
