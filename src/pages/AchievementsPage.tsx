import { AchievementsGallery } from "@/components/AchievementsGallery";

const AchievementsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold zen-text-gradient mb-2">
            Achievements
          </h1>
          <p className="text-muted-foreground">
            Your meditation milestones and rewards
          </p>
        </div>
        <AchievementsGallery />
      </div>
    </div>
  );
};

export default AchievementsPage;
