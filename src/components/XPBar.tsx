import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface XPBarProps {
  currentXP: number;
  level: number;
  showLevel?: boolean;
}

export const XPBar = ({ currentXP, level, showLevel = true }: XPBarProps) => {
  const currentLevelXP = Math.pow(level - 1, 2) * 100;
  const nextLevelXP = Math.pow(level, 2) * 100;
  const xpInCurrentLevel = currentXP - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  const progress = (xpInCurrentLevel / xpNeededForLevel) * 100;

  return (
    <div className="w-full">
      {showLevel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Level {level}</span>
          <span className="text-xs text-muted-foreground">
            {Math.floor(xpInCurrentLevel)} / {xpNeededForLevel} XP
          </span>
        </div>
      )}
      <Progress value={progress} className="h-2" />
      {showLevel && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-muted-foreground">
            {Math.floor(xpNeededForLevel - xpInCurrentLevel)} XP to Level{" "}
            {level + 1}
          </span>
        </div>
      )}
    </div>
  );
};
