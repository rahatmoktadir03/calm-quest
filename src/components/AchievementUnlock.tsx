import { Achievement } from "@/contexts/UserContext";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface AchievementUnlockProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementUnlock = ({
  achievement,
  onClose,
}: AchievementUnlockProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 100);

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-4">
      <Card
        className={`p-4 w-80 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50 transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="text-3xl">{achievement.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">
                Achievement Unlocked!
              </span>
            </div>
            <h4 className="font-bold">{achievement.name}</h4>
            <p className="text-sm text-muted-foreground">
              {achievement.description}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
