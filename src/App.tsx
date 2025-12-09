import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import SelectMood from "./pages/SelectMood";
import QuestList from "./pages/QuestList";
import QuestDetail from "./pages/QuestDetail";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AICoachPage from "./pages/AICoachPage";
import PlanCreatorPage from "./pages/PlanCreatorPage";
import CharacterThemesPage from "./pages/CharacterThemesPage";
import CommunityPage from "./pages/CommunityPage";
import BreathingPage from "./pages/BreathingPage";
import StreakPage from "./pages/StreakPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import JournalPage from "./pages/JournalPage";
import SoundsPage from "./pages/SoundsPage";
import SettingsPage from "./pages/SettingsPage";
import QuickMeditationPage from "./pages/QuickMeditationPage";
import AchievementsPage from "./pages/AchievementsPage";
import MoodTrackerPage from "./pages/MoodTrackerPage";
import ProgramsPage from "./pages/ProgramsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Index />} />
                <Route path="/select-mood" element={<SelectMood />} />
                <Route path="/quests" element={<QuestList />} />
                <Route path="/quest/:id" element={<QuestDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ai-coach" element={<AICoachPage />} />
                <Route path="/create-plan" element={<PlanCreatorPage />} />
                <Route path="/characters" element={<CharacterThemesPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/breathing" element={<BreathingPage />} />
                <Route path="/streak" element={<StreakPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/sounds" element={<SoundsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route
                  path="/quick-meditation"
                  element={<QuickMeditationPage />}
                />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/mood-tracker" element={<MoodTrackerPage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
