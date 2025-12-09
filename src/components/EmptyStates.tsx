import { CloudOff, Search, FileQuestion, Wifi } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  type: "no-data" | "no-results" | "error" | "offline";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const emptyStateConfig = {
  "no-data": {
    icon: FileQuestion,
    defaultTitle: "No Data Yet",
    defaultDescription:
      "Start your meditation journey to see your progress here.",
    color: "text-muted-foreground",
  },
  "no-results": {
    icon: Search,
    defaultTitle: "No Results Found",
    defaultDescription: "Try adjusting your search or filters.",
    color: "text-muted-foreground",
  },
  error: {
    icon: CloudOff,
    defaultTitle: "Something Went Wrong",
    defaultDescription: "We encountered an error. Please try again.",
    color: "text-destructive",
  },
  offline: {
    icon: Wifi,
    defaultTitle: "You're Offline",
    defaultDescription: "Check your internet connection and try again.",
    color: "text-orange-500",
  },
};

export const EmptyState = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className={`${config.color} mb-4`}>
        <Icon className="h-16 w-16" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold mb-2">
        {title || config.defaultTitle}
      </h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        {description || config.defaultDescription}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
};

// Specialized empty states for specific components
export const EmptyJournal = () => (
  <EmptyState
    type="no-data"
    title="Your Journal Awaits"
    description="Complete a meditation session and share your thoughts to begin your mindfulness journal."
    actionLabel="Start Meditating"
    onAction={() => (window.location.href = "/quest-list")}
  />
);

export const EmptyAchievements = () => (
  <EmptyState
    type="no-data"
    title="No Achievements Yet"
    description="Complete meditation sessions, maintain streaks, and explore features to unlock achievements."
  />
);

export const EmptyLeaderboard = () => (
  <EmptyState
    type="no-data"
    title="Leaderboard Loading"
    description="Connect with friends and compete to see who appears on the leaderboard."
  />
);

export const EmptyMoodHistory = () => (
  <EmptyState
    type="no-data"
    title="Start Tracking Your Mood"
    description="Log how you feel each day to identify patterns and improve your wellbeing."
    actionLabel="Log Mood"
  />
);
