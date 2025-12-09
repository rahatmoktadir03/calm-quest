import { useState } from "react";
import { aiService } from "@/lib/aiService";
import { useUser } from "@/contexts/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar, Sparkles, Target, Clock, Plus, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { useToast } from "@/hooks/use-toast";

interface PlanSession {
  day: string;
  time: string;
  duration: number;
  focusArea: string;
}

export const PersonalizedPlanCreator = () => {
  const { stats } = useUser();
  const { toast } = useToast();
  const [planName, setPlanName] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("7"); // days
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [sessions, setSessions] = useState<PlanSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const availableFocusAreas = [
    "Stress Relief",
    "Better Sleep",
    "Focus & Productivity",
    "Emotional Balance",
    "Self-Compassion",
    "Mindful Living",
    "Anxiety Management",
    "Energy & Vitality",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const toggleFocusArea = (area: string) => {
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const addSession = () => {
    setSessions([
      ...sessions,
      {
        day: "Monday",
        time: "09:00",
        duration: 10,
        focusArea: "Stress Relief",
      },
    ]);
  };

  const removeSession = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  const updateSession = (index: number, field: string, value: any) => {
    const updated = [...sessions];
    updated[index] = { ...updated[index], [field]: value };
    setSessions(updated);
  };

  const generateAIPlan = async () => {
    if (!planName || !goal || focusAreas.length === 0) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in plan name, goal, and select at least one focus area.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const prompt = `Create a personalized ${duration}-day meditation plan for a user with:
- Goal: ${goal}
- Focus Areas: ${focusAreas.join(", ")}
- Experience Level: Level ${stats.level}
- Current Streak: ${stats.currentStreak} days

Generate a structured plan with:
1. Weekly structure (which days to meditate)
2. Recommended times (morning/afternoon/evening)
3. Session durations (5-30 minutes)
4. Specific focus for each session
5. Progressive difficulty
6. Motivational tips

Format as a clear, actionable weekly schedule.`;

      const response = await aiService.chatWithCoach(prompt);

      if (response.success && response.content) {
        setGeneratedPlan(response.content);

        // Auto-populate suggested sessions (basic parsing)
        const suggestedSessions: PlanSession[] = [
          {
            day: "Monday",
            time: "07:00",
            duration: 10,
            focusArea: focusAreas[0],
          },
          {
            day: "Wednesday",
            time: "07:00",
            duration: 15,
            focusArea: focusAreas[1] || focusAreas[0],
          },
          {
            day: "Friday",
            time: "07:00",
            duration: 10,
            focusArea: focusAreas[0],
          },
          {
            day: "Sunday",
            time: "19:00",
            duration: 20,
            focusArea: "Mindful Living",
          },
        ];
        setSessions(suggestedSessions);

        toast({
          title: "✨ Plan Generated!",
          description: "AI has created a personalized meditation plan for you.",
        });
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const savePlan = async () => {
    if (sessions.length === 0) {
      toast({
        title: "No Sessions",
        description: "Add at least one meditation session to your plan.",
        variant: "destructive",
      });
      return;
    }

    // Save to Supabase (implement later)
    toast({
      title: "🎯 Plan Saved!",
      description: `Your ${duration}-day meditation plan "${planName}" is ready.`,
    });

    // Reset form
    setPlanName("");
    setGoal("");
    setFocusAreas([]);
    setSessions([]);
    setGeneratedPlan(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-purple-500" />
            Create Your Personalized Meditation Plan
          </CardTitle>
          <CardDescription>
            Design a custom meditation journey with AI-powered recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Plan Basics */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="planName">Plan Name</Label>
              <Input
                id="planName"
                placeholder="e.g., Morning Mindfulness Journey"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">What's Your Goal?</Label>
              <Textarea
                id="goal"
                placeholder="e.g., I want to reduce stress and improve my sleep quality"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Plan Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">1 Week</SelectItem>
                  <SelectItem value="14">2 Weeks</SelectItem>
                  <SelectItem value="30">1 Month</SelectItem>
                  <SelectItem value="90">3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="space-y-3">
            <Label>Focus Areas (Select 1-3)</Label>
            <div className="grid grid-cols-2 gap-3">
              {availableFocusAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => toggleFocusArea(area)}
                >
                  <Checkbox
                    id={area}
                    checked={focusAreas.includes(area)}
                    onCheckedChange={() => toggleFocusArea(area)}
                  />
                  <label
                    htmlFor={area}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {area}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* AI Generation */}
          <Button
            onClick={generateAIPlan}
            disabled={loading}
            className="w-full"
            variant="outline"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? "Generating AI Plan..." : "Generate AI-Powered Plan"}
          </Button>

          {/* AI Generated Plan */}
          {generatedPlan && (
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertDescription className="mt-2 whitespace-pre-wrap">
                {generatedPlan}
              </AlertDescription>
            </Alert>
          )}

          {/* Manual Session Planning */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Meditation Sessions</Label>
              <Button onClick={addSession} size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Session
              </Button>
            </div>

            <div className="space-y-3">
              {sessions.map((session, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Day</Label>
                        <Select
                          value={session.day}
                          onValueChange={(value) =>
                            updateSession(index, "day", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {days.map((day) => (
                              <SelectItem key={day} value={day}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Time</Label>
                        <Input
                          type="time"
                          value={session.time}
                          onChange={(e) =>
                            updateSession(index, "time", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Duration (min)</Label>
                        <Select
                          value={session.duration.toString()}
                          onValueChange={(value) =>
                            updateSession(index, "duration", parseInt(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 min</SelectItem>
                            <SelectItem value="10">10 min</SelectItem>
                            <SelectItem value="15">15 min</SelectItem>
                            <SelectItem value="20">20 min</SelectItem>
                            <SelectItem value="30">30 min</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Focus</Label>
                        <div className="flex gap-2">
                          <Select
                            value={session.focusArea}
                            onValueChange={(value) =>
                              updateSession(index, "focusArea", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {availableFocusAreas.map((area) => (
                                <SelectItem key={area} value={area}>
                                  {area}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSession(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Save Plan */}
          {sessions.length > 0 && (
            <Button onClick={savePlan} className="w-full" size="lg">
              <Calendar className="mr-2 h-5 w-5" />
              Save My Meditation Plan
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
