import { SocialFeatures } from "@/components/SocialFeatures";

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤝 Community & Leaderboard
          </h1>
          <p className="text-xl text-gray-600">
            Connect with fellow meditators and share your journey
          </p>
        </div>
        <SocialFeatures />
      </div>
    </div>
  );
};

export default CommunityPage;
