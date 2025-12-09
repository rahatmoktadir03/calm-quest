import { PersonalizedPlanCreator } from "@/components/PersonalizedPlanCreator";

const PlanCreatorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Meditation Plan
          </h1>
          <p className="text-xl text-gray-600">
            Design a personalized meditation journey with AI assistance
          </p>
        </div>
        <PersonalizedPlanCreator />
      </div>
    </div>
  );
};

export default PlanCreatorPage;
