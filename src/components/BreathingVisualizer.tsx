import { useEffect, useState } from "react";

interface BreathingVisualizerProps {
  isActive: boolean;
  onCycleComplete?: () => void;
}

type BreathPhase = "inhale" | "hold-in" | "exhale" | "hold-out";

const PHASE_DURATIONS = {
  inhale: 4000,
  "hold-in": 4000,
  exhale: 4000,
  "hold-out": 4000,
};

const PHASE_LABELS = {
  inhale: "Breathe In",
  "hold-in": "Hold",
  exhale: "Breathe Out",
  "hold-out": "Hold",
};

export const BreathingVisualizer = ({
  isActive,
  onCycleComplete,
}: BreathingVisualizerProps) => {
  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (!isActive) {
      setPhase("inhale");
      setCountdown(4);
      return;
    }

    const phaseInterval = setInterval(() => {
      setPhase((current) => {
        const phases: BreathPhase[] = [
          "inhale",
          "hold-in",
          "exhale",
          "hold-out",
        ];
        const currentIndex = phases.indexOf(current);
        const nextIndex = (currentIndex + 1) % phases.length;

        if (nextIndex === 0 && onCycleComplete) {
          onCycleComplete();
        }

        return phases[nextIndex];
      });
    }, 4000);

    return () => clearInterval(phaseInterval);
  }, [isActive, onCycleComplete]);

  useEffect(() => {
    if (!isActive) return;

    setCountdown(4);
    const countInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) return 4;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countInterval);
  }, [isActive, phase]);

  const getCircleScale = () => {
    switch (phase) {
      case "inhale":
        return "scale-150";
      case "exhale":
        return "scale-75";
      default:
        return phase === "hold-in" ? "scale-150" : "scale-75";
    }
  };

  const getCircleColor = () => {
    switch (phase) {
      case "inhale":
        return "bg-blue-400";
      case "hold-in":
        return "bg-blue-500";
      case "exhale":
        return "bg-green-400";
      case "hold-out":
        return "bg-green-500";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Breathing Circle */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />

        {/* Animated circle */}
        <div
          className={`w-32 h-32 rounded-full transition-all duration-[4000ms] ease-in-out ${getCircleScale()} ${getCircleColor()}`}
          style={{
            boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)",
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-4xl">
            {countdown}
          </div>
        </div>
      </div>

      {/* Phase label */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">{PHASE_LABELS[phase]}</h3>
        <p className="text-muted-foreground">
          {phase === "inhale" && "Fill your lungs slowly and deeply"}
          {phase === "hold-in" && "Hold the breath, stay calm"}
          {phase === "exhale" && "Release slowly and completely"}
          {phase === "hold-out" && "Pause before the next breath"}
        </p>
      </div>

      {/* Visual indicator dots */}
      <div className="flex gap-3 mt-8">
        {(["inhale", "hold-in", "exhale", "hold-out"] as BreathPhase[]).map(
          (p) => (
            <div
              key={p}
              className={`w-3 h-3 rounded-full transition-all ${
                phase === p ? "bg-primary scale-125" : "bg-muted"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
};
