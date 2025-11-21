// Sound effect URLs (using free sounds from public sources)
const SOUNDS = {
  questComplete:
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGJ0fPTgjMGHm7A7+OZSA0PVq3m7a1aFw1Lp+Lwu3EfBzaP1/PMfC0GJHrJ8N+SQwoVYLfq7atXFQ1KpuHvwXEgBziS1/PNfS4GJnzK8+CTRAoWY7nq7q5YFg5MqeHwwnIfCDmT2PPOfC4HKn3L8+CURAoXZLnr7q9ZFw5NquHwxG8gCToAxNPFUC0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  xpGain:
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGJ0fPTgjMGHm7A7+OZSA0PVq3m7a1aFw1Lp+Lwu3EfBzaP1/PMfC0GJHrJ8N+SQwoVYLfq7atXFQ1KpuHvwXEgBziS1/PNfS4GJnzK8+CTRAoWY7nq7q5YFg5MqeHwwnIfCDmT2PPOfC4HKn3L8+CURAoXZLnr7q9ZFw5NquHwxG8gCTqU2PTOfS4HKn3M8+GVRQoXZbnr7rBaGA5OquHwxXAgCTuV2fTPfjAHK37N9OGWRQsYZrrsdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGJ0fPTgjMGHm7A7+OZSA0PVq3m7a1aFw==",
  levelUp:
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGJ0fPTgjMGHm7A7+OZSA0PVq3m7a1aFw1Lp+Lwu3EfBzaP1/PMfC0GJHrJ8N+SQwoVYLfq7atXFQ1KpuHvwXEgBziS1/PNfS4GJnzK8+CTRAoWY7nq7q5YFg5MqeHwwnIfCDmT2PPOfC4HKn3L8+CURAoXZLnr7q9ZFw5NquHwxG8gCTqU2PTOfS4HKn3M8+GVRQoXZbnr7rBaGA5OquHwxXAgCTuV2fTPfjAHK37N9OGWRQsYZrrs==",
  achievement:
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGJ0fPTgjMGHm7A7+OZSA0PVq3m7a1aFw1Lp+Lwu3EfBzaP1/PMfC0GJHrJ8N+SQwoVYLfq7atXFQ1KpuHvwXEgBziS1/PNfS4GJnzK8+CTRAoWY7nq7q5YFg5MqeHwwnIfCDmT2PPOfC4HKn3L8+CURAoXZLnr7q9ZFw5NquHwxG8gCTqU2PTOfS4HKn3M8+GVRQoXZbnr7rBaGA5OquHwxXAgCTuV2fTPfjAHK37N9OGWRQsYZrrs77JUAAAAAAAAAAAAAAA==",
};

class SoundEffects {
  private enabled: boolean = true;
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    // Pre-load sounds
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.volume = 0.5;
      this.audioCache.set(key, audio);
    });
  }

  private play(key: keyof typeof SOUNDS) {
    if (!this.enabled) return;

    const audio = this.audioCache.get(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore errors (e.g., autoplay policy)
      });
    }
  }

  questComplete() {
    this.play("questComplete");
  }

  xpGain() {
    this.play("xpGain");
  }

  levelUp() {
    this.play("levelUp");
  }

  achievement() {
    this.play("achievement");
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

// Singleton instance
export const soundEffects = new SoundEffects();
