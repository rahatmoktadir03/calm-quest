import { Mood } from "@/contexts/UserContext";

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: "meditation" | "breathing" | "mindfulness" | "movement";
  duration: number; // in minutes
  difficulty: "easy" | "medium" | "hard";
  xpReward: number;
  mood: Mood[];
  instructions: string[];
  icon: string;
}

const questTemplates: Omit<Quest, "id">[] = [
  // Stressed quests
  {
    title: "Stress Relief Meditation",
    description: "A calming meditation to release tension and anxiety.",
    type: "meditation",
    duration: 10,
    difficulty: "easy",
    xpReward: 70,
    mood: ["stressed", "anxious"],
    instructions: [
      "Find a comfortable seated position",
      "Close your eyes and take 3 deep breaths",
      "Focus on releasing tension with each exhale",
      "Visualize stress leaving your body",
      "Continue for the full duration",
    ],
    icon: "🧘",
  },
  {
    title: "Box Breathing Challenge",
    description:
      "Use the 4-4-4-4 breathing technique to calm your nervous system.",
    type: "breathing",
    duration: 5,
    difficulty: "easy",
    xpReward: 60,
    mood: ["stressed", "anxious"],
    instructions: [
      "Breathe in for 4 counts",
      "Hold for 4 counts",
      "Breathe out for 4 counts",
      "Hold for 4 counts",
      "Repeat for 5 minutes",
    ],
    icon: "💨",
  },
  // Anxious quests
  {
    title: "Grounding Exercise",
    description:
      "Use the 5-4-3-2-1 technique to anchor yourself in the present.",
    type: "mindfulness",
    duration: 7,
    difficulty: "easy",
    xpReward: 65,
    mood: ["anxious", "stressed"],
    instructions: [
      "Name 5 things you can see",
      "Name 4 things you can touch",
      "Name 3 things you can hear",
      "Name 2 things you can smell",
      "Name 1 thing you can taste",
      "Take deep breaths throughout",
    ],
    icon: "🌿",
  },
  {
    title: "Anxiety Release Meditation",
    description: "Release anxious thoughts and find your center.",
    type: "meditation",
    duration: 15,
    difficulty: "medium",
    xpReward: 100,
    mood: ["anxious"],
    instructions: [
      "Sit comfortably with your spine straight",
      "Notice anxious thoughts without judgment",
      "Imagine each thought as a cloud passing by",
      "Return focus to your breath",
      "Continue observing and releasing",
    ],
    icon: "☁️",
  },
  // Tired quests
  {
    title: "Energizing Breath",
    description: "Quick breathing exercise to boost your energy.",
    type: "breathing",
    duration: 3,
    difficulty: "easy",
    xpReward: 50,
    mood: ["tired"],
    instructions: [
      "Stand or sit up straight",
      "Take quick, sharp inhales through your nose",
      "Exhale forcefully through your mouth",
      "Repeat 10 times",
      "Take 3 normal breaths between sets",
    ],
    icon: "⚡",
  },
  {
    title: "Body Scan Relaxation",
    description: "Gentle body scan to restore energy and release fatigue.",
    type: "meditation",
    duration: 12,
    difficulty: "medium",
    xpReward: 85,
    mood: ["tired"],
    instructions: [
      "Lie down or sit comfortably",
      "Close your eyes",
      "Scan from your toes to your head",
      "Notice areas of tension",
      "Breathe energy into tired areas",
    ],
    icon: "🌙",
  },
  // Calm quests
  {
    title: "Gratitude Meditation",
    description: "Deepen your sense of peace with gratitude practice.",
    type: "meditation",
    duration: 10,
    difficulty: "easy",
    xpReward: 75,
    mood: ["calm", "neutral"],
    instructions: [
      "Settle into a comfortable position",
      "Think of 3 things you're grateful for",
      "Feel the warmth of gratitude in your chest",
      "Expand this feeling throughout your body",
      "Rest in this peaceful state",
    ],
    icon: "🙏",
  },
  {
    title: "Mindful Walking",
    description: "A gentle walking meditation to maintain your calm state.",
    type: "movement",
    duration: 8,
    difficulty: "easy",
    xpReward: 70,
    mood: ["calm", "neutral"],
    instructions: [
      "Find a quiet space to walk",
      "Walk slowly and deliberately",
      "Notice each footstep",
      "Feel the ground beneath you",
      "Breathe naturally as you walk",
    ],
    icon: "🚶",
  },
  // Energetic quests
  {
    title: "Dynamic Movement Flow",
    description: "Channel your energy into mindful movement.",
    type: "movement",
    duration: 10,
    difficulty: "medium",
    xpReward: 90,
    mood: ["energetic"],
    instructions: [
      "Stand with feet hip-width apart",
      "Flow through gentle stretches",
      "Match movement to your breath",
      "Move with intention and awareness",
      "End with 3 deep breaths",
    ],
    icon: "🏃",
  },
  {
    title: "Focused Concentration",
    description: "Harness your energy for a deep focus meditation.",
    type: "meditation",
    duration: 15,
    difficulty: "hard",
    xpReward: 120,
    mood: ["energetic", "calm"],
    instructions: [
      "Sit in an alert, upright position",
      "Choose a single point of focus",
      "Could be your breath, a mantra, or a visual point",
      "When your mind wanders, gently return",
      "Maintain focus for the full duration",
    ],
    icon: "🎯",
  },
  // Neutral/versatile quests
  {
    title: "Beginner's Breath",
    description: "Simple breathing practice for any mood.",
    type: "breathing",
    duration: 5,
    difficulty: "easy",
    xpReward: 55,
    mood: ["neutral", "calm", "stressed"],
    instructions: [
      "Sit comfortably",
      "Breathe naturally",
      "Simply observe your breath",
      "Count each exhale up to 10",
      "Start over when you reach 10",
    ],
    icon: "🌬️",
  },
  {
    title: "Present Moment Awareness",
    description: "Basic mindfulness practice to center yourself.",
    type: "mindfulness",
    duration: 10,
    difficulty: "medium",
    xpReward: 80,
    mood: ["neutral", "calm", "anxious"],
    instructions: [
      "Settle into a comfortable position",
      "Notice what's happening right now",
      "Observe thoughts, feelings, and sensations",
      "Don't try to change anything",
      "Simply be present",
    ],
    icon: "✨",
  },
];

export const generateQuestsForMood = (
  mood: Mood,
  count: number = 3
): Quest[] => {
  const relevantQuests = questTemplates.filter((q) => q.mood.includes(mood));

  // If we don't have enough mood-specific quests, add some neutral ones
  const neutralQuests = questTemplates.filter((q) =>
    q.mood.includes("neutral")
  );
  const allAvailableQuests = [...relevantQuests, ...neutralQuests];

  // Shuffle and pick quests
  const shuffled = allAvailableQuests.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // Add unique IDs
  return selected.map((quest, index) => ({
    ...quest,
    id: `quest-${mood}-${Date.now()}-${index}`,
  }));
};

export const getAllQuests = (): Quest[] => {
  return questTemplates.map((quest, index) => ({
    ...quest,
    id: `quest-all-${index}`,
  }));
};

export const getQuestById = (id: string): Quest | undefined => {
  const allQuests = getAllQuests();
  return allQuests.find((q) => q.id === id);
};

export const getDifficultyColor = (difficulty: Quest["difficulty"]): string => {
  switch (difficulty) {
    case "easy":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "hard":
      return "text-red-500";
  }
};

export const getTypeIcon = (type: Quest["type"]): string => {
  switch (type) {
    case "meditation":
      return "🧘";
    case "breathing":
      return "💨";
    case "mindfulness":
      return "🌿";
    case "movement":
      return "🏃";
  }
};
