import { Settings } from "@/components/Settings";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold zen-text-gradient mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Customize your CalmQuest experience
          </p>
        </div>
        <Settings />
      </div>
    </div>
  );
};

export default SettingsPage;
