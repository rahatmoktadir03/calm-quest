import { BreathingExercises } from "@/components/BreathingExercises";

const BreathingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌬️ Breathing Exercises
          </h1>
          <p className="text-xl text-gray-600">
            Master various breathing techniques for health and wellness
          </p>
        </div>
        <BreathingExercises />
      </div>
    </div>
  );
};

export default BreathingPage;
