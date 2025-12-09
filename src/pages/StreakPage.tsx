import { StreakRewards } from "@/components/StreakRewards";

const StreakPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔥 Streak & Rewards
          </h1>
          <p className="text-xl text-gray-600">
            Keep your daily practice going to unlock amazing rewards
          </p>
        </div>
        <StreakRewards />
      </div>
    </div>
  );
};

export default StreakPage;
