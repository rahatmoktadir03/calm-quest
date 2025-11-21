import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const ONBOARDING_STEPS = [
  {
    title: "Welcome to CalmQuest! 🧘",
    description:
      "Transform meditation into an adventure. Earn XP, level up, and unlock achievements as you build your mindfulness practice.",
    emoji: "✨",
  },
  {
    title: "Choose Your Mood 😌",
    description:
      "Tell us how you're feeling and we'll recommend personalized quests tailored to your current emotional state.",
    emoji: "🎯",
  },
  {
    title: "Complete Quests & Grow 🌱",
    description:
      "Each quest rewards you with XP and helps build your daily streak. Level up, unlock achievements, and become a mindfulness master!",
    emoji: "🏆",
  },
];

export const OnboardingFlow = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem(
      "calmquest_onboarding_complete"
    );
    if (hasSeenOnboarding) {
      setIsVisible(false);
      onComplete();
    }
  }, [onComplete]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem("calmquest_onboarding_complete", "true");
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible) return null;

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-300">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={handleSkip}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center space-y-6">
          <div className="text-7xl mb-4">{step.emoji}</div>
          <h2 className="text-3xl font-bold">{step.title}</h2>
          <p className="text-lg text-muted-foreground">{step.description}</p>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 pt-4">
            {ONBOARDING_STEPS.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep ? "bg-primary w-8" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button onClick={handleSkip} variant="ghost">
              Skip
            </Button>

            <Button onClick={handleNext} className="gap-2">
              {currentStep === ONBOARDING_STEPS.length - 1
                ? "Let's Go!"
                : "Next"}
              {currentStep < ONBOARDING_STEPS.length - 1 && (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
