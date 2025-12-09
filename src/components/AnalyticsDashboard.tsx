import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useUser } from "@/contexts/UserContext";
import {
  BarChart3,
  TrendingUp,
  Brain,
  Clock,
  Calendar,
  Zap,
  Heart,
  Target,
} from "lucide-react";
import { Progress } from "./ui/progress";

export const AnalyticsDashboard = () => {
  const { stats } = useUser();

  // Mock data - would come from actual user sessions
  const weeklyData = [
    { day: "Mon", minutes: 15, sessions: 1, mood: "calm" },
    { day: "Tue", minutes: 20, sessions: 2, mood: "happy" },
    { day: "Wed", minutes: 10, sessions: 1, mood: "stressed" },
    { day: "Thu", minutes: 25, sessions: 2, mood: "calm" },
    { day: "Fri", minutes: 15, sessions: 1, mood: "happy" },
    { day: "Sat", minutes: 30, sessions: 3, mood: "calm" },
    { day: "Sun", minutes: 20, sessions: 2, mood: "peaceful" },
  ];

  const moodDistribution = [
    { mood: "Calm", count: 12, color: "bg-green-500", percentage: 40 },
    { mood: "Stressed", count: 8, color: "bg-red-500", percentage: 27 },
    { mood: "Happy", count: 6, color: "bg-yellow-500", percentage: 20 },
    { mood: "Peaceful", count: 4, color: "bg-blue-500", percentage: 13 },
  ];

  const totalMinutes = weeklyData.reduce((sum, d) => sum + d.minutes, 0);
  const avgSessionLength = Math.round(
    totalMinutes / weeklyData.reduce((sum, d) => sum + d.sessions, 0)
  );
  const mostProductiveDay = weeklyData.reduce((max, d) =>
    d.minutes > max.minutes ? d : max
  );

  const insights = [
    {
      icon: TrendingUp,
      title: "Meditation Trend",
      value: "+15%",
      description: "vs last week",
      color: "text-green-500",
    },
    {
      icon: Clock,
      title: "Avg Session",
      value: `${avgSessionLength} min`,
      description: "typical duration",
      color: "text-blue-500",
    },
    {
      icon: Calendar,
      title: "Best Day",
      value: mostProductiveDay.day,
      description: `${mostProductiveDay.minutes} minutes`,
      color: "text-purple-500",
    },
    {
      icon: Zap,
      title: "Consistency",
      value: "85%",
      description: "weekly completion",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <Card key={insight.title} className="zen-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {insight.title}
                    </p>
                    <p className={`text-2xl font-bold ${insight.color}`}>
                      {insight.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {insight.description}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${insight.color} opacity-50`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="moods">Moods</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Weekly Activity */}
        <TabsContent value="weekly">
          <Card className="zen-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Weekly Activity
              </CardTitle>
              <CardDescription>
                Your meditation patterns this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day) => {
                  const maxMinutes = Math.max(
                    ...weeklyData.map((d) => d.minutes)
                  );
                  const percentage = (day.minutes / maxMinutes) * 100;

                  return (
                    <div key={day.day} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium w-12">{day.day}</span>
                        <span className="text-muted-foreground">
                          {day.sessions} session{day.sessions > 1 ? "s" : ""}
                        </span>
                        <span className="font-semibold w-16 text-right">
                          {day.minutes} min
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={percentage} className="h-2" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {totalMinutes}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Total Minutes
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {weeklyData.reduce((sum, d) => sum + d.sessions, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Total Sessions
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {avgSessionLength}
                    </p>
                    <p className="text-xs text-muted-foreground">Avg Length</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mood Analysis */}
        <TabsContent value="moods">
          <Card className="zen-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Mood Patterns
              </CardTitle>
              <CardDescription>
                How you've been feeling during meditation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {moodDistribution.map((mood) => (
                <div key={mood.mood} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${mood.color}`} />
                      <span className="font-medium">{mood.mood}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {mood.count} times ({mood.percentage}%)
                    </div>
                  </div>
                  <Progress value={mood.percentage} className="h-2" />
                </div>
              ))}

              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Mood Insight</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      You tend to meditate most when feeling calm. Consider
                      meditating during stressful moments to build resilience.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="insights">
          <Card className="zen-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on your practice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold">Optimal Practice Time</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your most consistent meditation sessions happen in the
                      evening around 7-8 PM. Try scheduling your practice then
                      for better adherence.
                    </p>
                    <Badge className="mt-2" variant="secondary">
                      Evening Meditator
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500 shrink-0" />
                  <div>
                    <p className="font-semibold">Progress Streak</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your {stats.currentStreak}-day streak is impressive! Users
                      with similar streaks report 40% better stress management.
                      Keep going!
                    </p>
                    <Badge className="mt-2 bg-green-500/20 text-green-700 dark:text-green-300">
                      On Track
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-purple-500 shrink-0" />
                  <div>
                    <p className="font-semibold">Suggested Focus</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on your mood patterns, try incorporating more
                      breathing exercises. This can help balance your stress
                      response.
                    </p>
                    <Badge className="mt-2 bg-purple-500/20 text-purple-700 dark:text-purple-300">
                      Recommendation
                    </Badge>
                  </div>
                </div>
              </Card>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">📊 By the Numbers</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Sessions</p>
                    <p className="text-lg font-bold">
                      {stats.totalQuestsCompleted}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Level</p>
                    <p className="text-lg font-bold">{stats.level}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Achievements</p>
                    <p className="text-lg font-bold">
                      {stats.achievements.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Best Streak</p>
                    <p className="text-lg font-bold">
                      {stats.longestStreak} days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
