import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Sparkles, Target, Heart, Zap, Check, ArrowRight } from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
}

export const OnboardingFlow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("onboarding-completed");
    if (!hasCompletedOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const steps: OnboardingStep[] = [
    {
      id: 0,
      title: "Welcome to CalmQuest",
      description: "Your journey to mindfulness begins here",
      icon: Sparkles,
      content: (
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">
            Transform your life through meditation, mindfulness, and
            self-discovery. CalmQuest combines gamification with proven
            meditation techniques to help you build a lasting practice.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-sm font-semibold">Set Goals</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-sm font-semibold">Earn XP</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-sm font-semibold">Find Peace</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "Choose Your Path",
      description: "Explore different meditation styles",
      icon: Target,
      content: (
        <div className="space-y-3">
          <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
            <h4 className="font-semibold mb-1">Breathing Exercises</h4>
            <p className="text-sm text-muted-foreground">
              Quick techniques to calm your mind in minutes
            </p>
          </Card>
          <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
            <h4 className="font-semibold mb-1">Guided Meditations</h4>
            <p className="text-sm text-muted-foreground">
              AI-generated sessions tailored to your needs
            </p>
          </Card>
          <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
            <h4 className="font-semibold mb-1">Themed Adventures</h4>
            <p className="text-sm text-muted-foreground">
              Meditate with legendary characters as your guide
            </p>
          </Card>
        </div>
      ),
    },
    {
      id: 2,
      title: "Level Up & Earn Rewards",
      description: "Track progress and unlock achievements",
      icon: Zap,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Your Progress</span>
              <span className="text-sm text-muted-foreground">Level 1</span>
            </div>
            <Progress value={30} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">
              Complete sessions to earn XP and level up
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>Unlock new meditation themes</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>Earn exclusive achievements</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>Build daily streaks</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>Compete on leaderboards</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Daily Challenges",
      description: "Stay engaged with fresh activities",
      icon: Heart,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Every day brings new challenges to keep your practice fresh and
            exciting. Complete challenges to earn bonus XP and rewards!
          </p>
          <div className="space-y-2">
            <Card className="p-3 bg-blue-500/10 border-blue-500/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-sm font-semibold">
                  Morning Mindfulness
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Complete a meditation before 10 AM
              </p>
            </Card>
            <Card className="p-3 bg-purple-500/10 border-purple-500/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-sm font-semibold">Breathing Master</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Practice 3 different breathing exercises
              </p>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "You're All Set!",
      description: "Begin your mindfulness journey",
      icon: Sparkles,
      content: (
        <div className="space-y-4 text-center">
          <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <p className="text-muted-foreground">
            You're ready to start your CalmQuest adventure. Remember: even 5
            minutes of daily meditation can transform your life.
          </p>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-semibold mb-1">Quick Start Tip</p>
            <p className="text-xs text-muted-foreground">
              Start with the "Quick Calm" session from the homepage for a gentle
              1-minute introduction.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    localStorage.setItem("onboarding-completed", "true");
    setIsOpen(false);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">
                  {currentStepData.title}
                </DialogTitle>
                <DialogDescription>
                  {currentStepData.description}
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip
            </Button>
          </div>
          <Progress value={progress} className="h-1" />
        </DialogHeader>

        <div className="py-6">{currentStepData.content}</div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-1">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep
                    ? "bg-primary/50"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? (
              "Get Started"
            ) : (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
