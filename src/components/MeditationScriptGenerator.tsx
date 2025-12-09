import { useState } from "react";
import { aiService, AIResponse } from "@/lib/aiService";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface MeditationScriptGeneratorProps {
  mood: string;
  duration: number;
  character?: {
    name: string;
    personality: string;
    meditationStyle: string;
    quotes: string[];
    avatar: string;
  };
}

export const MeditationScriptGenerator: React.FC<
  MeditationScriptGeneratorProps
> = ({ mood, duration, character }) => {
  const [script, setScript] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateScript = async () => {
    setLoading(true);
    setError("");
    setScript("");

    try {
      let response: AIResponse;

      if (character) {
        // Use character-themed generation
        response = await aiService.generateCharacterMeditationScript(
          character,
          mood,
          duration
        );
      } else {
        // Use standard generation
        response = await aiService.generateMeditationScript(mood, duration);
      }

      if (response.success && response.content) {
        setScript(response.content);
      } else {
        setError(response.error || "Failed to generate meditation script");
      }
    } catch (err) {
      setError("An error occurred while generating the script");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          {character ? (
            <>
              <span className="text-2xl">{character.avatar}</span>
              {character.name}'s Meditation Script
            </>
          ) : (
            "AI-Powered Meditation Script"
          )}
        </CardTitle>
        <CardDescription>
          {character
            ? `Get a personalized ${duration}-minute meditation guided by ${character.name} for your ${mood} mood`
            : `Get a personalized ${duration}-minute meditation script for your ${mood} mood`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!script && !loading && (
          <Button onClick={generateScript} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Personalized Script
          </Button>
        )}

        {loading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            <span className="ml-3 text-muted-foreground">
              Crafting your personalized meditation...
            </span>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {script && (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                {script.split("\n\n").map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="mb-3 last:mb-0 text-gray-700 dark:text-gray-300"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <Button
              onClick={generateScript}
              variant="outline"
              className="w-full"
            >
              Generate New Script
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
