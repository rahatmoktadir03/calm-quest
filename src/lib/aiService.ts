const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

if (!GROQ_API_KEY) {
  console.warn(
    "Missing Groq API key. AI features will not work. Please check your .env file."
  );
}

export interface AIResponse {
  content: string;
  success: boolean;
  error?: string;
}

class AIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateMeditationScript(
    mood: string,
    duration: number
  ): Promise<AIResponse> {
    try {
      const prompt = `You are a calming meditation guide. Create a ${duration}-minute meditation script for someone feeling ${mood}. 

The script should:
- Start with a gentle introduction
- Include breathing instructions
- Have calming, supportive language
- End with a peaceful closing
- Be formatted in clear paragraphs

Keep it warm, personal, and helpful. Focus on ${
        mood === "stressed"
          ? "stress relief"
          : mood === "anxious"
          ? "calming anxiety"
          : mood === "tired"
          ? "gentle energy"
          : "maintaining balance"
      }.`;

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are a compassionate meditation instructor with expertise in mindfulness and stress management.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || "";

      return {
        content,
        success: true,
      };
    } catch (error) {
      console.error("AI meditation script generation error:", error);
      return {
        content: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async analyzeMoodPattern(
    moodHistory: Array<{ mood: string; timestamp: string }>
  ): Promise<AIResponse> {
    try {
      const moodSummary = moodHistory
        .slice(-7) // Last 7 entries
        .map((m) => `${m.mood} (${new Date(m.timestamp).toLocaleDateString()})`)
        .join(", ");

      const prompt = `Based on this user's recent mood history: ${moodSummary}

Provide a brief, supportive analysis (2-3 sentences) that:
1. Identifies any patterns
2. Offers gentle encouragement
3. Suggests a focus area for their practice

Be warm and non-judgmental.`;

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are a supportive wellness coach analyzing mood patterns to provide helpful insights.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.6,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || "";

      return {
        content,
        success: true,
      };
    } catch (error) {
      console.error("AI mood analysis error:", error);
      return {
        content: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async chatWithCoach(
    userMessage: string,
    context?: string
  ): Promise<AIResponse> {
    try {
      const systemPrompt = context
        ? `You are a supportive meditation coach. User context: ${context}. Provide brief, encouraging responses (2-3 sentences).`
        : "You are a supportive meditation coach. Provide brief, encouraging responses about mindfulness and wellness (2-3 sentences).";

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Groq API Error Response:", errorData);
        throw new Error(
          `API request failed: ${response.statusText} - ${
            errorData.error?.message || JSON.stringify(errorData)
          }`
        );
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || "";

      return {
        content,
        success: true,
      };
    } catch (error) {
      console.error("AI coach chat error:", error);
      return {
        content: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async generatePersonalizedQuest(
    mood: string,
    userLevel: number,
    recentQuests: string[]
  ): Promise<AIResponse> {
    try {
      const prompt = `Create a unique meditation quest for a level ${userLevel} user feeling ${mood}.

Recent quests they've completed: ${recentQuests.join(", ") || "none yet"}

Generate a NEW quest with:
- Creative title (4-6 words)
- Brief description (1 sentence)
- 3-4 specific instructions
- Appropriate duration (5-15 minutes based on level)

Format as JSON:
{
  "title": "...",
  "description": "...",
  "duration": number,
  "instructions": ["...", "...", "..."]
}`;

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are a creative meditation quest designer. Generate brief, engaging quest ideas.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 400,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || "";

      return {
        content,
        success: true,
      };
    } catch (error) {
      console.error("AI quest generation error:", error);
      return {
        content: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async generateCharacterMeditationScript(
    character: {
      name: string;
      personality: string;
      meditationStyle: string;
      quotes: string[];
    },
    mood: string,
    duration: number
  ): Promise<AIResponse> {
    try {
      const sampleQuote = character.quotes[0];

      const prompt = `You are ${character.name}. Create a ${duration}-minute meditation script in your unique voice for someone feeling ${mood}.

Your personality: ${character.personality}
Your meditation style: ${character.meditationStyle}

Example of how you speak: "${sampleQuote}"

Create a meditation script that:
- Uses YOUR distinctive voice and manner of speaking
- Includes breathing instructions
- Addresses their ${mood} state
- Stays true to your character
- Is formatted in clear paragraphs
- Includes 2-3 of your characteristic phrases or wisdom

Speak as ${character.name} would. Be authentic to the character.`;

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are ${character.name}. Respond exactly as this character would, using their speech patterns, wisdom, and personality. ${character.personality}`,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.9,
          max_tokens: 1200,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Groq API Error Response:", errorData);
        throw new Error(
          `API request failed: ${response.statusText} - ${
            errorData.error?.message || JSON.stringify(errorData)
          }`
        );
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || "";

      return {
        content,
        success: true,
      };
    } catch (error) {
      console.error("AI character meditation script error:", error);
      return {
        content: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const aiService = new AIService(GROQ_API_KEY || "");
