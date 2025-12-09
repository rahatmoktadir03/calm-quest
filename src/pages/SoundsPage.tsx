import { BackgroundSounds } from "@/components/BackgroundSounds";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Volume2 } from "lucide-react";

const SoundsPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 zen-text-gradient">
            🎵 Ambient Sounds
          </h1>
          <p className="text-xl text-muted-foreground">
            Create the perfect atmosphere for your meditation
          </p>
        </div>

        <div className="space-y-6">
          <BackgroundSounds />

          <Card className="zen-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                Sound Therapy Benefits
              </CardTitle>
              <CardDescription>
                How background sounds enhance meditation
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">🌧️ Rain & Water</h4>
                <p className="text-sm text-muted-foreground">
                  Helps mask distracting noises and creates a cocoon of calm
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">🌊 Ocean Waves</h4>
                <p className="text-sm text-muted-foreground">
                  Rhythmic patterns promote deeper relaxation and focus
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">🌲 Forest Sounds</h4>
                <p className="text-sm text-muted-foreground">
                  Connects you to nature, reducing stress hormones
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">🔥 Crackling Fire</h4>
                <p className="text-sm text-muted-foreground">
                  Creates warmth and comfort, ideal for evening practice
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SoundsPage;
