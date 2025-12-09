import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  BookOpen,
  Calendar,
  Target,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

interface Program {
  id: string;
  name: string;
  description: string;
  duration: number; // days
  difficulty: "beginner" | "intermediate" | "advanced";
  sessions: ProgramSession[];
  benefits: string[];
  unlockLevel: number;
}

interface ProgramSession {
  day: number;
  title: string;
  duration: number; // minutes
  focus: string;
  completed: boolean;
}

const programs: Program[] = [
  {
    id: "mindfulness-basics",
    name: "Mindfulness Basics",
    description: "Learn the fundamentals of mindfulness meditation in 7 days",
    duration: 7,
    difficulty: "beginner",
    unlockLevel: 1,
    benefits: [
      "Build a strong meditation foundation",
      "Learn essential breathing techniques",
      "Develop daily meditation habit",
    ],
    sessions: [
      {
        day: 1,
        title: "Welcome to Mindfulness",
        duration: 5,
        focus: "Introduction to mindful breathing",
        completed: false,
      },
      {
        day: 2,
        title: "Body Awareness",
        duration: 7,
        focus: "Body scan meditation",
        completed: false,
      },
      {
        day: 3,
        title: "Breath Anchoring",
        duration: 10,
        focus: "Using breath as an anchor",
        completed: false,
      },
      {
        day: 4,
        title: "Observing Thoughts",
        duration: 10,
        focus: "Watching thoughts without judgment",
        completed: false,
      },
      {
        day: 5,
        title: "Loving-Kindness",
        duration: 12,
        focus: "Cultivating compassion",
        completed: false,
      },
      {
        day: 6,
        title: "Sound Meditation",
        duration: 15,
        focus: "Awareness of sounds",
        completed: false,
      },
      {
        day: 7,
        title: "Integration",
        duration: 15,
        focus: "Bringing mindfulness to daily life",
        completed: false,
      },
    ],
  },
  {
    id: "stress-relief",
    name: "Stress Relief Program",
    description: "30 days to master stress management and inner peace",
    duration: 30,
    difficulty: "intermediate",
    unlockLevel: 5,
    benefits: [
      "Reduce stress and anxiety",
      "Improve emotional resilience",
      "Better sleep quality",
    ],
    sessions: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1}: Stress Relief`,
      duration: 15 + Math.floor(i / 10) * 5,
      focus:
        i < 10 ? "Breathing" : i < 20 ? "Body relaxation" : "Mental clarity",
      completed: false,
    })),
  },
  {
    id: "deep-focus",
    name: "Deep Focus Mastery",
    description: "14 days to enhance concentration and productivity",
    duration: 14,
    difficulty: "intermediate",
    unlockLevel: 3,
    benefits: [
      "Sharpen mental clarity",
      "Increase productivity",
      "Reduce distractions",
    ],
    sessions: Array.from({ length: 14 }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1}: Focus Training`,
      duration: 20,
      focus: "Concentration meditation",
      completed: false,
    })),
  },
  {
    id: "zen-master",
    name: "Path to Zen Mastery",
    description: "30 days of advanced meditation for experienced practitioners",
    duration: 30,
    difficulty: "advanced",
    unlockLevel: 10,
    benefits: [
      "Deepen meditation practice",
      "Access advanced techniques",
      "Spiritual growth",
    ],
    sessions: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1}: Advanced Practice`,
      duration: 30,
      focus: "Deep meditation",
      completed: false,
    })),
  },
];

const difficultyColors = {
  beginner: "bg-green-500",
  intermediate: "bg-blue-500",
  advanced: "bg-purple-500",
};

export const GuidedPrograms = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [enrolledPrograms, setEnrolledPrograms] = useState<string[]>([]);
  const { toast } = useToast();
  const { stats } = useUser();
  const level = stats?.level || 1;

  const enrollProgram = (program: Program) => {
    if (level < program.unlockLevel) {
      toast({
        title: "Level Required",
        description: `Reach level ${program.unlockLevel} to unlock this program.`,
        variant: "destructive",
      });
      return;
    }

    setEnrolledPrograms([...enrolledPrograms, program.id]);
    setSelectedProgram(program);

    toast({
      title: "Enrolled! 🎉",
      description: `You've joined ${program.name}. Start your first session!`,
    });
  };

  const startSession = (programId: string, sessionDay: number) => {
    toast({
      title: "Session Started",
      description: `Beginning Day ${sessionDay} meditation...`,
    });
    // This would navigate to meditation timer with the specific session
  };

  if (selectedProgram) {
    const completedSessions = selectedProgram.sessions.filter(
      (s) => s.completed
    ).length;
    const progress =
      (completedSessions / selectedProgram.sessions.length) * 100;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedProgram(null)}>
            ← Back to Programs
          </Button>
        </div>

        <Card className="zen-card">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl zen-text-gradient mb-2">
                  {selectedProgram.name}
                </CardTitle>
                <p className="text-muted-foreground">
                  {selectedProgram.description}
                </p>
              </div>
              <Badge className={difficultyColors[selectedProgram.difficulty]}>
                {selectedProgram.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">
                  {completedSessions} / {selectedProgram.sessions.length}{" "}
                  sessions
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="text-lg font-bold">
                  {selectedProgram.duration}
                </div>
                <div className="text-xs text-muted-foreground">Days</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <Target className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="text-lg font-bold">
                  {selectedProgram.sessions.reduce(
                    (sum, s) => sum + s.duration,
                    0
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Minutes
                </div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <CheckCircle2 className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="text-lg font-bold">{Math.round(progress)}%</div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Benefits
              </h3>
              <ul className="space-y-2">
                {selectedProgram.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Sessions</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {selectedProgram.sessions.map((session) => (
                  <Card
                    key={session.day}
                    className={`${
                      session.completed
                        ? "bg-primary/5 border-primary/20"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              session.completed
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {session.completed ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <span className="font-semibold text-sm">
                                {session.day}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">
                              {session.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {session.focus} • {session.duration} min
                            </p>
                          </div>
                        </div>
                        {!session.completed && (
                          <Button
                            size="sm"
                            onClick={() =>
                              startSession(selectedProgram.id, session.day)
                            }
                          >
                            Start
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold zen-text-gradient mb-2">
          Guided Programs
        </h2>
        <p className="text-muted-foreground">
          Structured meditation journeys for every level
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program) => {
          const isEnrolled = enrolledPrograms.includes(program.id);
          const isLocked = level < program.unlockLevel;

          return (
            <Card
              key={program.id}
              className={`zen-card ${
                isLocked ? "opacity-60" : "hover:scale-105"
              } transition-all`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <Badge className={difficultyColors[program.difficulty]}>
                    {program.difficulty}
                  </Badge>
                </div>
                <CardTitle className="flex items-center gap-2">
                  {program.name}
                  {isLocked && (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {program.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{program.duration} days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4 text-primary" />
                    <span>{program.sessions.length} sessions</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {program.benefits.slice(0, 2).map((benefit, index) => (
                      <li
                        key={index}
                        className="text-xs text-muted-foreground flex items-center gap-1"
                      >
                        <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {isLocked ? (
                  <Button variant="outline" disabled className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Unlock at Level {program.unlockLevel}
                  </Button>
                ) : isEnrolled ? (
                  <Button
                    onClick={() => setSelectedProgram(program)}
                    className="w-full"
                  >
                    Continue Program
                  </Button>
                ) : (
                  <Button
                    onClick={() => enrollProgram(program)}
                    variant="outline"
                    className="w-full"
                  >
                    Enroll Now
                  </Button>
                )}
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
                Complete programs to unlock advanced meditation techniques and
                earn exclusive rewards. Consistency is key to transformation!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
