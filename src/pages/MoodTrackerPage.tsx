import { MoodTracker } from "@/components/MoodTracker";

const MoodTrackerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold zen-text-gradient mb-2">
            Mood Tracker
          </h1>
          <p className="text-muted-foreground">
            Track your emotional wellbeing
          </p>
        </div>
        <MoodTracker />
      </div>
    </div>
  );
};

export default MoodTrackerPage;
