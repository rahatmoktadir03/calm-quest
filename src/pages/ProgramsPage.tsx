import { GuidedPrograms } from "@/components/GuidedPrograms";

const ProgramsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto">
        <GuidedPrograms />
      </div>
    </div>
  );
};

export default ProgramsPage;
