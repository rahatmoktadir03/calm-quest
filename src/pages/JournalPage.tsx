import { MeditationJournal } from "@/components/MeditationJournal";

const JournalPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 zen-text-gradient">
            📖 Meditation Journal
          </h1>
          <p className="text-xl text-muted-foreground">
            Reflect on your journey with AI-powered insights
          </p>
        </div>
        <MeditationJournal />
      </div>
    </div>
  );
};

export default JournalPage;
