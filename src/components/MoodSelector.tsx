import { Mood } from "@/contexts/UserContext";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MoodOption {
  mood: Mood;
  label: string;
  emoji: string;
  description: string;
  color: string;
}

const moodOptions: MoodOption[] = [
  {
    mood: "stressed",
    label: "Stressed",
    emoji: "😰",
    description: "Feeling overwhelmed or tense",
    color: "hover:border-red-500",
  },
  {
    mood: "anxious",
    label: "Anxious",
    emoji: "😟",
    description: "Worried or uneasy",
    color: "hover:border-orange-500",
  },
  {
    mood: "tired",
    label: "Tired",
    emoji: "😴",
    description: "Low energy or fatigued",
    color: "hover:border-blue-500",
  },
  {
    mood: "calm",
    label: "Calm",
    emoji: "😌",
    description: "Peaceful and relaxed",
    color: "hover:border-green-500",
  },
  {
    mood: "energetic",
    label: "Energetic",
    emoji: "😄",
    description: "Full of energy",
    color: "hover:border-yellow-500",
  },
  {
    mood: "neutral",
    label: "Neutral",
    emoji: "😐",
    description: "Feeling balanced",
    color: "hover:border-gray-500",
  },
];

interface MoodSelectorProps {
  onSelectMood: (mood: Mood) => void;
  selectedMood?: Mood;
}

export const MoodSelector = ({
  onSelectMood,
  selectedMood,
}: MoodSelectorProps) => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">How are you feeling?</h2>
        <p className="text-muted-foreground">
          Select your current mood to get personalized quests
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {moodOptions.map((option) => (
          <Card
            key={option.mood}
            className={cn(
              "p-6 cursor-pointer transition-all duration-200 hover:scale-105",
              option.color,
              selectedMood === option.mood &&
                "ring-2 ring-primary shadow-lg scale-105"
            )}
            onClick={() => onSelectMood(option.mood)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="text-5xl mb-2">{option.emoji}</div>
              <h3 className="font-semibold text-lg">{option.label}</h3>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
