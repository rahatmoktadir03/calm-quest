import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Wind, Circle, Zap, Clock } from "lucide-react";
import { BreathingVisualizer } from "./BreathingVisualizer";

interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  pattern: {
    inhale: number;
    hold1?: number;
    exhale: number;
    hold2?: number;
  };
  duration: number;
  benefits: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
}

const techniques: BreathingTechnique[] = [
  {
    id: "4-7-8",
    name: "4-7-8 Breathing",
    description:
      "Developed by Dr. Andrew Weil, this technique helps calm the nervous system",
    pattern: { inhale: 4, hold1: 7, exhale: 8 },
    duration: 8,
    benefits: ["Reduces anxiety", "Improves sleep", "Calms nervous system"],
    difficulty: "Beginner",
    icon: "😌",
  },
  {
    id: "box",
    name: "Box Breathing",
    description: "Used by Navy SEALs for focus and stress management",
    pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    duration: 10,
    benefits: ["Increases focus", "Reduces stress", "Improves performance"],
    difficulty: "Beginner",
    icon: "📦",
  },
  {
    id: "coherent",
    name: "Coherent Breathing",
    description: "Simple 5-5 breathing for heart-brain coherence",
    pattern: { inhale: 5, exhale: 5 },
    duration: 10,
    benefits: ["Heart health", "Emotional balance", "HRV improvement"],
    difficulty: "Beginner",
    icon: "💗",
  },
  {
    id: "wim-hof",
    name: "Wim Hof Method",
    description: "Powerful breathing for energy and cold exposure preparation",
    pattern: { inhale: 2, exhale: 1, hold1: 15 },
    duration: 5,
    benefits: ["Boosts energy", "Strengthens immune system", "Mental clarity"],
    difficulty: "Advanced",
    icon: "❄️",
  },
  {
    id: "alternate-nostril",
    name: "Alternate Nostril",
    description: "Ancient pranayama technique for balance and calm",
    pattern: { inhale: 4, hold1: 4, exhale: 4 },
    duration: 10,
    benefits: ["Balances energy", "Reduces stress", "Improves concentration"],
    difficulty: "Intermediate",
    icon: "🕉️",
  },
  {
    id: "bellows",
    name: "Bellows Breath",
    description: "Rapid energizing breath (Bhastrika Pranayama)",
    pattern: { inhale: 1, exhale: 1 },
    duration: 3,
    benefits: ["Increases energy", "Clears mind", "Warms body"],
    difficulty: "Advanced",
    icon: "🔥",
  },
];

export const BreathingExercises = () => {
  const [selectedTechnique, setSelectedTechnique] =
    useState<BreathingTechnique | null>(null);
  const [isActive, setIsActive] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500";
      case "Intermediate":
        return "bg-yellow-500";
      case "Advanced":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const startExercise = (technique: BreathingTechnique) => {
    setSelectedTechnique(technique);
    setIsActive(true);
  };

  const stopExercise = () => {
    setIsActive(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Active Exercise */}
      {isActive && selectedTechnique && (
        <Card className="border-2 border-purple-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-3xl">{selectedTechnique.icon}</span>
                  {selectedTechnique.name}
                </CardTitle>
                <CardDescription>
                  {selectedTechnique.description}
                </CardDescription>
              </div>
              <Button onClick={stopExercise} variant="outline">
                Stop Exercise
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <BreathingVisualizer isActive={true} onCycleComplete={() => {}} />
              <div className="mt-8 text-center space-y-2">
                <p className="text-lg font-semibold">
                  Follow the breathing pattern:
                </p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span>Inhale: {selectedTechnique.pattern.inhale}s</span>
                  </div>
                  {selectedTechnique.pattern.hold1 && (
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-purple-500" />
                      <span>Hold: {selectedTechnique.pattern.hold1}s</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-green-500 rotate-180" />
                    <span>Exhale: {selectedTechnique.pattern.exhale}s</span>
                  </div>
                  {selectedTechnique.pattern.hold2 && (
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-orange-500" />
                      <span>Hold: {selectedTechnique.pattern.hold2}s</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Techniques Grid */}
      {!isActive && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-6 w-6 text-blue-500" />
                Guided Breathing Exercises
              </CardTitle>
              <CardDescription>
                Master different breathing techniques for various benefits
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techniques.map((technique) => (
              <Card
                key={technique.id}
                className="cursor-pointer hover:shadow-lg transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-2">{technique.icon}</div>
                    <Badge className={getDifficultyColor(technique.difficulty)}>
                      {technique.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{technique.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {technique.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Pattern */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Breathing Pattern:
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">
                        ↑ {technique.pattern.inhale}s
                      </Badge>
                      {technique.pattern.hold1 && (
                        <Badge variant="outline">
                          ○ {technique.pattern.hold1}s
                        </Badge>
                      )}
                      <Badge variant="outline">
                        ↓ {technique.pattern.exhale}s
                      </Badge>
                      {technique.pattern.hold2 && (
                        <Badge variant="outline">
                          ○ {technique.pattern.hold2}s
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{technique.duration} minute session</span>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Benefits:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {technique.benefits.map((benefit, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          ✓ {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Start Button */}
                  <Button
                    onClick={() => startExercise(technique)}
                    className="w-full"
                    variant="default"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Start Exercise
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
