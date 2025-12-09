import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { AICoach } from "@/components/AICoach";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AICoachPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { stats } = useUser();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-5xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Features
            </div>
            <h1 className="text-4xl font-bold">
              Your Personal AI Meditation Coach
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get personalized guidance, custom meditation scripts, and insights
              tailored to your journey
            </p>
          </div>

          {/* User Stats Quick View */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>
                The AI coach knows your journey and can provide personalized
                guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.level}
                  </p>
                  <p className="text-sm text-muted-foreground">Level</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.totalQuestsCompleted}
                  </p>
                  <p className="text-sm text-muted-foreground">Quests</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.currentStreak}
                  </p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {stats.totalMeditationMinutes}
                  </p>
                  <p className="text-sm text-muted-foreground">Minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Coach Chat */}
          <AICoach />

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Personalized Scripts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate custom meditation scripts based on your mood and
                  desired duration during quests.
                </p>
                <Button
                  onClick={() => navigate("/select-mood")}
                  variant="outline"
                  className="w-full"
                >
                  Start a Quest to Try
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  Mood Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get insights about your emotional patterns and suggestions for
                  your practice.
                </p>
                <Button disabled variant="outline" className="w-full">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
