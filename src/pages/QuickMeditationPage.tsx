import { QuickMeditationMode } from "@/components/QuickMeditationMode";

const QuickMeditationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-6xl mx-auto">
        <QuickMeditationMode />
      </div>
    </div>
  );
};

export default QuickMeditationPage;
