import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { BookOpen, Sparkles, Calendar, Heart, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { aiService } from "@/lib/aiService";

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  sessionDuration: number;
  entry: string;
  aiInsight?: string;
}

export const MeditationJournal = () => {
  const { toast } = useToast();
  const [currentEntry, setCurrentEntry] = useState("");
  const [analyzingEntry, setAnalyzingEntry] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const stored = localStorage.getItem("meditation-journal");
    return stored ? JSON.parse(stored) : [];
  });

  const analyzeEntry = async () => {
    if (!currentEntry.trim()) {
      toast({
        title: "Empty Entry",
        description: "Please write something first",
        variant: "destructive",
      });
      return;
    }

    setAnalyzingEntry(true);

    try {
      const prompt = `Analyze this meditation journal entry and provide brief, supportive insights (2-3 sentences):

"${currentEntry}"

Focus on: patterns, progress, emotional state, and gentle encouragement.`;

      const response = await aiService.chatWithCoach(prompt);

      if (response.success) {
        const newEntry: JournalEntry = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          mood: "reflective",
          sessionDuration: 15,
          entry: currentEntry,
          aiInsight: response.content,
        };

        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem(
          "meditation-journal",
          JSON.stringify(updatedEntries)
        );

        toast({
          title: "✨ Entry Saved!",
          description: "AI has analyzed your reflection",
        });

        setCurrentEntry("");
      }
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not analyze entry, but it's been saved",
        variant: "destructive",
      });

      // Save without AI insight
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        mood: "reflective",
        sessionDuration: 15,
        entry: currentEntry,
      };

      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      localStorage.setItem(
        "meditation-journal",
        JSON.stringify(updatedEntries)
      );
      setCurrentEntry("");
    } finally {
      setAnalyzingEntry(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* New Entry */}
      <Card className="zen-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            New Journal Entry
          </CardTitle>
          <CardDescription>Reflect on your meditation practice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              How was your session today?
            </label>
            <Textarea
              placeholder="I felt... I noticed... I realized..."
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {currentEntry.length} characters
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={analyzeEntry}
              disabled={analyzingEntry || !currentEntry.trim()}
              className="flex-1"
            >
              {analyzingEntry ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Save & Get AI Insights
                </>
              )}
            </Button>
            {currentEntry && (
              <Button
                variant="outline"
                onClick={() => {
                  const newEntry: JournalEntry = {
                    id: Date.now().toString(),
                    date: new Date().toISOString(),
                    mood: "reflective",
                    sessionDuration: 15,
                    entry: currentEntry,
                  };

                  const updatedEntries = [newEntry, ...entries];
                  setEntries(updatedEntries);
                  localStorage.setItem(
                    "meditation-journal",
                    JSON.stringify(updatedEntries)
                  );
                  setCurrentEntry("");

                  toast({
                    title: "Entry Saved",
                    description: "Your reflection has been recorded",
                  });
                }}
              >
                Save Only
              </Button>
            )}
          </div>

          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Journaling Tip:</strong> Try to note your mood, any
              insights, or challenges you experienced during meditation.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Past Entries */}
      <Card className="zen-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Past Reflections
          </CardTitle>
          <CardDescription>
            {entries.length} journal{" "}
            {entries.length === 1 ? "entry" : "entries"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No entries yet. Start journaling after your next meditation!
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {entries.map((entry) => (
                  <Card key={entry.id} className="p-4 bg-muted/30">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-primary" />
                          <span className="text-xs text-muted-foreground">
                            {formatDate(entry.date)}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {entry.mood}
                        </Badge>
                      </div>

                      <p className="text-sm">{entry.entry}</p>

                      {entry.aiInsight && (
                        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <div className="flex items-start gap-2">
                            <Brain className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-semibold mb-1">
                                AI Insight
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {entry.aiInsight}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
