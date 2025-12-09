import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Sparkles, Lock, Play } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  personality: string;
  unlockLevel: number;
  avatar: string;
  quotes: string[];
  meditationStyle: string;
  rarity: "common" | "rare" | "legendary";
}

const characters: Character[] = [
  {
    id: "jon-snow",
    name: "Jon Snow",
    title: "The Watcher on the Wall",
    description: "Find your inner strength through resilience and honor",
    personality:
      "Stoic, honorable, contemplative. Speaks of duty, winter, and the watch.",
    unlockLevel: 1,
    avatar: "❄️",
    quotes: [
      "The night is dark and full of terrors, but your breath is your shield.",
      "I am the watcher of my own mind. I am the light in the darkness.",
      "Winter is coming, but peace dwells within.",
    ],
    meditationStyle:
      "Focused on resilience, honor, and finding calm amidst chaos",
    rarity: "rare",
  },
  {
    id: "arthur-morgan",
    name: "Arthur Morgan",
    title: "The Outlaw Sage",
    description: "Redemption through mindfulness and honest reflection",
    personality:
      "Gruff but wise, reflective, seeking redemption through presence.",
    unlockLevel: 3,
    avatar: "🤠",
    quotes: [
      "We can't always fight nature, partner. Sometimes we just gotta breathe and let go.",
      "I've made mistakes, but in this moment, I choose peace.",
      "Out here, it's just you and the quiet. That's where you find yourself.",
    ],
    meditationStyle:
      "Grounded in nature, self-reflection, and accepting the present",
    rarity: "legendary",
  },
  {
    id: "yoda",
    name: "Master Yoda",
    title: "Jedi Master",
    description: "Ancient wisdom meets mindful awareness",
    personality:
      "Wise, patient, speaks in inverted sentences with deep insight.",
    unlockLevel: 5,
    avatar: "🟢",
    quotes: [
      "Present in this moment, you must be. Hmm.",
      "Fear leads to suffering. Breathe, you must.",
      "The Force flows through you. Feel it, you will.",
    ],
    meditationStyle:
      "Focused on presence, letting go of fear, and connection to the Force",
    rarity: "legendary",
  },
  {
    id: "gandalf",
    name: "Gandalf",
    title: "The Grey Wanderer",
    description: "Timeless wisdom for your journey within",
    personality: "Ancient, wise, encouraging with a touch of mystery.",
    unlockLevel: 7,
    avatar: "🧙",
    quotes: [
      "All we have to decide is what to do with the time that is given to us.",
      "Even the smallest person can change the course of the future... with a single breath.",
      "The journey doesn't end here. Peace is just another path.",
    ],
    meditationStyle:
      "Contemplative, focused on purpose, time, and the journey itself",
    rarity: "legendary",
  },
  {
    id: "zuko",
    name: "Prince Zuko",
    title: "The Redeemed Fire Prince",
    description: "Transform inner conflict into balanced harmony",
    personality:
      "Intense but growing, learning to find balance between fire and peace.",
    unlockLevel: 4,
    avatar: "🔥",
    quotes: [
      "I've struggled with my inner fire for so long. Now I let it guide me, not consume me.",
      "Honor isn't something anyone can give you. You find it in moments like this.",
      "The scar reminds me of my journey. Each breath takes me further toward balance.",
    ],
    meditationStyle:
      "Balancing intensity with calm, transforming anger into purpose",
    rarity: "rare",
  },
  {
    id: "iroh",
    name: "Uncle Iroh",
    title: "Dragon of the West",
    description: "Tea, wisdom, and the art of inner peace",
    personality: "Warm, gentle, loves tea and simple pleasures, deeply wise.",
    unlockLevel: 1,
    avatar: "☕",
    quotes: [
      "Sometimes the best way to solve your problems is to help someone else.",
      "It is important to draw wisdom from many places. Breathe in peace.",
      "Life is like a cup of tea. Drink it slowly and savor each moment.",
    ],
    meditationStyle:
      "Gentle, tea-centered, focused on simple pleasures and balance",
    rarity: "common",
  },
  {
    id: "samwise",
    name: "Samwise Gamgee",
    title: "The Loyal Gardener",
    description: "Simple courage and steadfast hope",
    personality:
      "Humble, loyal, finds beauty in simple things, unwavering hope.",
    unlockLevel: 2,
    avatar: "🌱",
    quotes: [
      "There's some good in this world, and it's worth fighting for.",
      "I can't carry the burden for you, but I can breathe with you.",
      "Even darkness must pass. A new day will come.",
    ],
    meditationStyle:
      "Hopeful, grounded in simple joys, focused on perseverance",
    rarity: "common",
  },
  {
    id: "miyamoto",
    name: "Miyamoto Musashi",
    title: "The Sword Saint",
    description: "The way of the warrior through stillness",
    personality:
      "Disciplined, precise, philosophical about the martial and mental path.",
    unlockLevel: 6,
    avatar: "⚔️",
    quotes: [
      "The way is in training. Stillness sharpens the sword of the mind.",
      "Know your enemy and know yourself. Start by knowing your breath.",
      "The warrior's greatest battle is within. Win it with presence.",
    ],
    meditationStyle: "Disciplined, focused on self-mastery and mental clarity",
    rarity: "rare",
  },
];

export const CharacterThemes = () => {
  const { stats } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case "rare":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      default:
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
    }
  };

  const handleSelectCharacter = (character: Character) => {
    if (stats.level < character.unlockLevel) {
      toast({
        title: "🔒 Character Locked",
        description: `Reach level ${character.unlockLevel} to unlock ${character.name}!`,
        variant: "destructive",
      });
      return;
    }

    setSelectedCharacter(character);

    // Store character preference
    localStorage.setItem("selectedCharacter", character.id);

    toast({
      title: `${character.avatar} Character Selected!`,
      description: `${character.name} will now guide your meditation sessions.`,
    });
  };

  const startThemedMeditation = () => {
    if (selectedCharacter) {
      navigate("/select-mood", { state: { character: selectedCharacter } });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            Character Meditation Themes
          </CardTitle>
          <CardDescription>
            Meditate with guidance from legendary characters - each with their
            unique style and wisdom
          </CardDescription>
        </CardHeader>
      </Card>

      {selectedCharacter && (
        <Card
          className={`${getRarityColor(selectedCharacter.rarity)} text-white`}
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{selectedCharacter.avatar}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{selectedCharacter.name}</h3>
                <p className="text-white/90">{selectedCharacter.title}</p>
                <p className="mt-2 text-sm text-white/80">
                  "{selectedCharacter.quotes[0]}"
                </p>
              </div>
              <Button
                onClick={startThemedMeditation}
                size="lg"
                variant="secondary"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Meditation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => {
          const isLocked = stats.level < character.unlockLevel;
          const isSelected = selectedCharacter?.id === character.id;

          return (
            <Card
              key={character.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? "ring-2 ring-purple-500" : ""
              } ${isLocked ? "opacity-60" : ""}`}
              onClick={() => handleSelectCharacter(character)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Avatar className="h-16 w-16 text-4xl">
                    <AvatarFallback>{character.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getRarityColor(character.rarity)}>
                      {character.rarity.toUpperCase()}
                    </Badge>
                    {isLocked && (
                      <Badge variant="secondary">
                        <Lock className="h-3 w-3 mr-1" />
                        Level {character.unlockLevel}
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="mt-4">{character.name}</CardTitle>
                <CardDescription>{character.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{character.description}</p>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Meditation Style:
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {character.meditationStyle}
                  </p>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs italic text-muted-foreground">
                    "
                    {
                      character.quotes[
                        Math.floor(Math.random() * character.quotes.length)
                      ]
                    }
                    "
                  </p>
                </div>

                {isSelected && (
                  <Badge className="w-full justify-center" variant="default">
                    ✓ Currently Selected
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
