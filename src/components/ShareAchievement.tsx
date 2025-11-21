import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, Check, Copy, Twitter } from "lucide-react";
import { Achievement } from "@/contexts/UserContext";

interface ShareAchievementProps {
  achievement: Achievement;
}

export const ShareAchievement = ({ achievement }: ShareAchievementProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = `I just unlocked "${achievement.name}" on CalmQuest! ${achievement.icon} ${achievement.description} #CalmQuest #Mindfulness`;

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Share2 className="h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold text-sm">Share your achievement!</p>
            <p className="text-xs text-muted-foreground">
              Let others know about your progress
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTwitterShare}
            className="gap-2"
          >
            <Twitter className="h-4 w-4" />
            Tweet
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
