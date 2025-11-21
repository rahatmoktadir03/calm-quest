import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";

interface MeditationTimerProps {
  duration: number; // in minutes
  onComplete: () => void;
  questTitle: string;
}

export const MeditationTimer = ({
  duration,
  onComplete,
  questTitle,
}: MeditationTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSeconds = duration * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            onComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, onComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(duration * 60);
  };

  return (
    <Card className="p-8 max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">{questTitle}</h3>
          <p className="text-muted-foreground">Stay present and focused</p>
        </div>

        {/* Circular Progress Visualization */}
        <div className="relative w-64 h-64 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              className="text-primary transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold">{formatTime(timeLeft)}</div>
              <div className="text-sm text-muted-foreground mt-2">
                {isActive
                  ? isPaused
                    ? "Paused"
                    : "In Progress"
                  : "Ready to begin"}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-2" />

        {/* Control Buttons */}
        <div className="flex gap-3 justify-center">
          {!isActive ? (
            <Button onClick={handleStart} size="lg" className="w-32">
              <Play className="mr-2 h-4 w-4" />
              Start
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              size="lg"
              variant="secondary"
              className="w-32"
            >
              <Pause className="mr-2 h-4 w-4" />
              {isPaused ? "Resume" : "Pause"}
            </Button>
          )}
          <Button
            onClick={handleReset}
            size="lg"
            variant="outline"
            className="w-32"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Helpful Tips */}
        {!isActive && (
          <div className="text-center text-sm text-muted-foreground">
            <p>
              💡 Tip: Find a quiet space, sit comfortably, and focus on your
              breath
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
