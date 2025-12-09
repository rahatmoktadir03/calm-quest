import { useState, useEffect } from "react";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Zap, Wind, Heart, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { BreathingVisualizer } from "./BreathingVisualizer";

interface QuickSession {
  id: string;
  name: string;
  duration: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

const quickSessions: QuickSession[] = [
  {
    id: "quick-calm",
    name: "Quick Calm",
    duration: 60,
    icon: Sparkles,
    description: "1-minute breathing exercise",
    color: "bg-blue-500",
  },
  {
    id: "energy-boost",
    name: "Energy Boost",
    duration: 120,
    icon: Zap,
    description: "2-minute energizer",
    color: "bg-yellow-500",
  },
  {
    id: "stress-relief",
    name: "Stress Relief",
    duration: 180,
    icon: Wind,
    description: "3-minute relaxation",
    color: "bg-green-500",
  },
  {
    id: "focus-mode",
    name: "Focus Mode",
    duration: 300,
    icon: Heart,
    description: "5-minute concentration",
    color: "bg-purple-500",
  },
];

export const QuickMeditationMode = () => {
  const [selectedSession, setSelectedSession] = useState<QuickSession | null>(
    null
  );
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const { toast } = useToast();
  const { addXP } = useUser();

  const completeSession = React.useCallback(async () => {
    if (selectedSession) {
      const xpGained = Math.floor(selectedSession.duration / 10);
      await addXP(xpGained);

      toast({
        title: "Session Complete! 🎉",
        description: `You earned ${xpGained} XP for your quick meditation.`,
      });

      // Play completion sound
      const audio = new Audio("/sounds/achievement.mp3");
      audio.play().catch(() => {});
    }

    setIsActive(false);
    setSelectedSession(null);
  }, [selectedSession, toast, addXP]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      completeSession();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, completeSession]);

  const startSession = (session: QuickSession) => {
    setSelectedSession(session);
    setTimeLeft(session.duration);
    setIsActive(true);

    toast({
      title: `${session.name} Started!`,
      description: `Take ${session.duration} seconds for yourself.`,
    });
  };

  const cancelSession = () => {
    setIsActive(false);
    setTimeLeft(0);
    setSelectedSession(null);

    toast({
      title: "Session Cancelled",
      description: "You can try again anytime!",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isActive && selectedSession) {
    const progress =
      ((selectedSession.duration - timeLeft) / selectedSession.duration) * 100;
    const Icon = selectedSession.icon;

    return (
      <div className="min-h-[600px] flex items-center justify-center p-4">
        <Card className="zen-card max-w-md w-full">
          <CardHeader className="text-center">
            <div
              className={`${selectedSession.color} h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <Icon className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl zen-text-gradient">
              {selectedSession.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2 text-primary">
                {formatTime(timeLeft)}
              </div>
              <p className="text-muted-foreground">
                {timeLeft <= 10 ? "Almost there..." : "Breathe deeply..."}
              </p>
            </div>

            <Progress value={progress} className="h-3" />

            {selectedSession.id === "quick-calm" ||
            selectedSession.id === "stress-relief" ? (
              <div className="flex justify-center py-4">
                <BreathingVisualizer isActive={true} />
              </div>
            ) : (
              <div className="text-center p-8 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {selectedSession.id === "energy-boost"
                    ? "Take deep breaths and feel energized!"
                    : "Clear your mind and focus on the present moment."}
                </p>
              </div>
            )}

            <Button
              onClick={cancelSession}
              variant="outline"
              className="w-full"
            >
              End Session
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold zen-text-gradient mb-2">
          Quick Meditation
        </h2>
        <p className="text-muted-foreground">Short sessions for busy moments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickSessions.map((session) => {
          const Icon = session.icon;
          return (
            <Card
              key={session.id}
              className="zen-card hover:scale-105 transition-transform cursor-pointer"
              onClick={() => startSession(session)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`${session.color} h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {session.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {session.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {session.duration}s
                      </span>
                      <span className="text-muted-foreground">
                        +{Math.floor(session.duration / 10)} XP
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="zen-card bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-1">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">
                Even a 1-minute break can help reset your mind and reduce
                stress. Use these quick sessions throughout your day for instant
                calm.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
