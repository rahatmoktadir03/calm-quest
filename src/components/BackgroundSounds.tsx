import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Droplets,
  Wind,
  Waves,
  Flame,
  Bird,
  CloudRain,
} from "lucide-react";

interface Sound {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  audioUrl: string;
  volume: number;
  playing: boolean;
}

export const BackgroundSounds = () => {
  const [sounds, setSounds] = useState<Sound[]>([
    {
      id: "rain",
      name: "Rain",
      icon: CloudRain,
      color: "text-blue-500",
      audioUrl: "/sounds/rain.mp3",
      volume: 50,
      playing: false,
    },
    {
      id: "ocean",
      name: "Ocean Waves",
      icon: Waves,
      color: "text-cyan-500",
      audioUrl: "/sounds/ocean.mp3",
      volume: 50,
      playing: false,
    },
    {
      id: "forest",
      name: "Forest",
      icon: Wind,
      color: "text-green-500",
      audioUrl: "/sounds/forest.mp3",
      volume: 50,
      playing: false,
    },
    {
      id: "fire",
      name: "Fireplace",
      icon: Flame,
      color: "text-orange-500",
      audioUrl: "/sounds/fire.mp3",
      volume: 50,
      playing: false,
    },
    {
      id: "birds",
      name: "Birds",
      icon: Bird,
      color: "text-yellow-500",
      audioUrl: "/sounds/birds.mp3",
      volume: 50,
      playing: false,
    },
    {
      id: "water",
      name: "Stream",
      icon: Droplets,
      color: "text-blue-400",
      audioUrl: "/sounds/stream.mp3",
      volume: 50,
      playing: false,
    },
  ]);

  const [masterVolume, setMasterVolume] = useState(70);
  const [muted, setMuted] = useState(false);

  const toggleSound = (id: string) => {
    setSounds(
      sounds.map((s) => (s.id === id ? { ...s, playing: !s.playing } : s))
    );
  };

  const updateVolume = (id: string, volume: number) => {
    setSounds(sounds.map((s) => (s.id === id ? { ...s, volume } : s)));
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const stopAll = () => {
    setSounds(sounds.map((s) => ({ ...s, playing: false })));
  };

  const activeSounds = sounds.filter((s) => s.playing).length;

  return (
    <Card className="zen-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" />
              Background Sounds
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Create your perfect meditation atmosphere
            </p>
          </div>
          <Badge variant="secondary">{activeSounds} active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Master Volume */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Master Volume</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground w-12">
                {muted ? 0 : masterVolume}%
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMute}
                className="h-8 w-8"
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Slider
            value={[muted ? 0 : masterVolume]}
            onValueChange={([value]) => {
              setMasterVolume(value);
              if (muted) setMuted(false);
            }}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Individual Sounds */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sounds.map((sound) => {
            const Icon = sound.icon;
            return (
              <Card
                key={sound.id}
                className={`p-4 cursor-pointer transition-all ${
                  sound.playing
                    ? "bg-primary/10 border-primary/30 shadow-md"
                    : "hover:shadow-md"
                }`}
                onClick={() => toggleSound(sound.id)}
              >
                <div className="text-center space-y-3">
                  <div
                    className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                      sound.playing ? "bg-primary/20" : "bg-muted"
                    }`}
                  >
                    {sound.playing ? (
                      <Pause className={`h-6 w-6 ${sound.color}`} />
                    ) : (
                      <Icon className={`h-6 w-6 ${sound.color}`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{sound.name}</p>
                  </div>

                  {sound.playing && (
                    <div
                      className="space-y-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Slider
                        value={[sound.volume]}
                        onValueChange={([value]) =>
                          updateVolume(sound.id, value)
                        }
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <span className="text-xs text-muted-foreground">
                        {sound.volume}%
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        {activeSounds > 0 && (
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={stopAll}>
              Stop All
            </Button>
          </div>
        )}

        {/* Presets */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Quick Presets</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSounds(
                  sounds.map((s) =>
                    s.id === "rain" || s.id === "forest"
                      ? { ...s, playing: true, volume: 60 }
                      : { ...s, playing: false }
                  )
                );
              }}
            >
              🌧️ Rainy Forest
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSounds(
                  sounds.map((s) =>
                    s.id === "ocean" || s.id === "birds"
                      ? { ...s, playing: true, volume: 50 }
                      : { ...s, playing: false }
                  )
                );
              }}
            >
              🏖️ Beach Day
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSounds(
                  sounds.map((s) =>
                    s.id === "fire" || s.id === "rain"
                      ? { ...s, playing: true, volume: 55 }
                      : { ...s, playing: false }
                  )
                );
              }}
            >
              🔥 Cozy Night
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSounds(
                  sounds.map((s) =>
                    s.id === "water" || s.id === "birds" || s.id === "forest"
                      ? { ...s, playing: true, volume: 45 }
                      : { ...s, playing: false }
                  )
                );
              }}
            >
              🌲 Nature Walk
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
