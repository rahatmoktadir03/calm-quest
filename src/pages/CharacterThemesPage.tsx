import { CharacterThemes } from "@/components/CharacterThemes";

const CharacterThemesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ✨ Character Meditation Themes
          </h1>
          <p className="text-xl text-gray-600">
            Meditate with guidance from legendary characters
          </p>
        </div>
        <CharacterThemes />
      </div>
    </div>
  );
};

export default CharacterThemesPage;
