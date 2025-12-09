import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Badge } from "./ui/badge";
import {
  Smile,
  Meh,
  Frown,
  Angry,
  Heart,
  Sparkles,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MoodEntry {
  date: string;
  mood: "great" | "good" | "okay" | "bad" | "terrible";
  note?: string;
  activities?: string[];
}

const moods = [
  {
    value: "great",
    label: "Great",
    icon: Smile,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    value: "good",
    label: "Good",
    icon: Heart,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    value: "okay",
    label: "Okay",
    icon: Meh,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    value: "bad",
    label: "Bad",
    icon: Frown,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    value: "terrible",
    label: "Terrible",
    icon: Angry,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

export const MoodTracker = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMood, setCurrentMood] = useState<string>("");
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("mood-history");
    if (stored) {
      setMoodHistory(JSON.parse(stored));
    }
  }, []);

  const saveMood = () => {
    if (!currentMood) {
      toast({
        title: "Select a mood",
        description: "Please choose how you're feeling today.",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const newEntry: MoodEntry = {
      date: today,
      mood: currentMood as "great" | "good" | "okay" | "bad" | "terrible",
      note: note || undefined,
    };

    const updated = [
      ...moodHistory.filter((entry) => entry.date !== today),
      newEntry,
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setMoodHistory(updated);
    localStorage.setItem("mood-history", JSON.stringify(updated));

    toast({
      title: "Mood Logged! 📝",
      description: "Your mood has been saved to your journal.",
    });

    setCurrentMood("");
    setNote("");
  };

  const getMoodForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return moodHistory.find((entry) => entry.date === dateStr);
  };

  const calculateStreak = () => {
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split("T")[0];

      if (moodHistory.some((entry) => entry.date === dateStr)) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getMoodTrend = () => {
    const recent = moodHistory.slice(0, 7);
    if (recent.length < 2) return "neutral";

    const moodScores: Record<string, number> = {
      great: 5,
      good: 4,
      okay: 3,
      bad: 2,
      terrible: 1,
    };

    const avgRecent =
      recent
        .slice(0, 3)
        .reduce((sum, entry) => sum + (moodScores[entry.mood] || 3), 0) / 3;
    const avgPrevious =
      recent
        .slice(3, 7)
        .reduce((sum, entry) => sum + (moodScores[entry.mood] || 3), 0) /
      Math.max(recent.length - 3, 1);

    if (avgRecent > avgPrevious + 0.5) return "improving";
    if (avgRecent < avgPrevious - 0.5) return "declining";
    return "stable";
  };

  const streak = calculateStreak();
  const trend = getMoodTrend();
  const recentMoods = moodHistory.slice(0, 7);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quick Mood Check-in */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="zen-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              How are you feeling today?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-5 gap-3">
              {moods.map((mood) => {
                const Icon = mood.icon;
                const isSelected = currentMood === mood.value;

                return (
                  <button
                    key={mood.value}
                    onClick={() => setCurrentMood(mood.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? `${mood.bg} border-current ${mood.color} scale-110`
                        : "border-transparent hover:bg-muted/50"
                    }`}
                  >
                    <Icon className={`h-8 w-8 mx-auto mb-2 ${mood.color}`} />
                    <span className="text-xs font-medium">{mood.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Optional Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind? (optional)"
                className="w-full p-3 rounded-lg border bg-background resize-none"
                rows={3}
              />
            </div>

            <Button
              onClick={saveMood}
              className="w-full"
              disabled={!currentMood}
            >
              Save Mood
            </Button>
          </CardContent>
        </Card>

        {/* Mood Calendar */}
        <Card className="zen-card">
          <CardHeader>
            <CardTitle>Mood Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              modifiers={{
                logged: (date) => !!getMoodForDate(date),
              }}
              modifiersStyles={{
                logged: {
                  fontWeight: "bold",
                  textDecoration: "underline",
                },
              }}
            />

            {getMoodForDate(selectedDate) && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {moods.map((mood) => {
                    const entry = getMoodForDate(selectedDate);
                    if (entry?.mood === mood.value) {
                      const Icon = mood.icon;
                      return (
                        <div
                          key={mood.value}
                          className="flex items-center gap-2"
                        >
                          <Icon className={`h-5 w-5 ${mood.color}`} />
                          <span className="font-semibold">{mood.label}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                {getMoodForDate(selectedDate)?.note && (
                  <p className="text-sm text-muted-foreground">
                    {getMoodForDate(selectedDate)?.note}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats & History */}
      <div className="space-y-6">
        <Card className="zen-card">
          <CardHeader>
            <CardTitle>Mood Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="text-3xl font-bold text-primary">{streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Mood Trend</span>
                {trend === "improving" && (
                  <Badge className="bg-green-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Improving
                  </Badge>
                )}
                {trend === "declining" && (
                  <Badge className="bg-orange-500">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    Declining
                  </Badge>
                )}
                {trend === "stable" && <Badge variant="outline">Stable</Badge>}
              </div>

              <div className="text-xs text-muted-foreground">
                Based on your last 7 entries
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm font-semibold mb-2">Entries</div>
              <div className="text-2xl font-bold">{moodHistory.length}</div>
              <div className="text-xs text-muted-foreground">Total logged</div>
            </div>
          </CardContent>
        </Card>

        <Card className="zen-card">
          <CardHeader>
            <CardTitle className="text-base">Recent Moods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentMoods.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No mood entries yet. Start tracking today!
                </p>
              ) : (
                recentMoods.map((entry) => {
                  const mood = moods.find((m) => m.value === entry.mood);
                  if (!mood) return null;
                  const Icon = mood.icon;

                  return (
                    <div
                      key={entry.date}
                      className="flex items-center gap-3 p-2 rounded hover:bg-muted/50"
                    >
                      <Icon className={`h-4 w-4 ${mood.color}`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{mood.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
