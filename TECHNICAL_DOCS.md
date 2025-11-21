# CalmQuest - Technical Documentation

## 🏗️ Architecture Overview

### Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Context API
- **Storage**: Browser LocalStorage
- **Build Tool**: Vite
- **Package Manager**: npm

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── MoodSelector.tsx
│   ├── MeditationTimer.tsx
│   ├── QuestCard.tsx
│   ├── AchievementUnlock.tsx
│   ├── XPBar.tsx
│   └── LoadingSpinner.tsx
├── contexts/           # React contexts
│   └── UserContext.tsx # Global user state & progress
├── pages/             # Route pages
│   ├── Index.tsx      # Home/landing
│   ├── SelectMood.tsx # Mood selection
│   ├── QuestList.tsx  # Available quests
│   ├── QuestDetail.tsx# Quest execution
│   ├── Profile.tsx    # User stats & achievements
│   └── NotFound.tsx   # 404 page
├── lib/               # Utilities & logic
│   ├── questGenerator.ts  # Quest templates & generation
│   ├── achievements.ts    # Achievement definitions & checking
│   └── utils.ts          # Helper functions
└── App.tsx            # Root component with providers
```

## 📦 Core Systems

### 1. User Context (`UserContext.tsx`)

**Purpose**: Centralized state management for user progress

**State Interface**:

```typescript
interface UserStats {
  xp: number; // Total experience points
  level: number; // Current level
  currentStreak: number; // Consecutive days
  longestStreak: number; // All-time best streak
  totalQuestsCompleted: number; // Total quests done
  totalMeditationMinutes: number; // Total time meditated
  lastCheckIn?: Date; // Last activity timestamp
  currentMood?: Mood; // Current user mood
  achievements: Achievement[]; // All achievements (locked/unlocked)
  completedQuests: CompletedQuest[]; // Quest history
}
```

**Key Functions**:

- `addXP(amount)`: Add XP and recalculate level
- `completeQuest(questId, duration)`: Mark quest complete, add XP
- `updateMood(mood)`: Set current mood
- `checkStreak()`: Update streak based on last check-in
- `unlockAchievement(id)`: Unlock specific achievement
- `resetProgress()`: Clear all data (for testing)

**Level Progression Formula**:

```typescript
level = floor(sqrt(xp / 100)) + 1;
nextLevelXP = (level ^ 2) * 100;
```

Example: Level 5 requires 2,500 XP, Level 10 requires 10,000 XP

### 2. Quest System (`questGenerator.ts`)

**Quest Types**:

- `meditation`: Guided meditation sessions
- `breathing`: Breathing exercises
- `mindfulness`: Awareness practices
- `movement`: Physical mindful activities

**Quest Structure**:

```typescript
interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  duration: number; // minutes
  difficulty: "easy" | "medium" | "hard";
  xpReward: number;
  mood: Mood[]; // Compatible moods
  instructions: string[]; // Step-by-step guide
  icon: string; // Emoji
}
```

**Quest Generation**:

- `generateQuestsForMood(mood, count)`: Returns personalized quests
- Filters by mood compatibility
- Shuffles and selects requested number
- Falls back to neutral quests if needed

**XP Rewards**:

- Base XP: 50
- Duration bonus: 2 XP per minute
- Example: 10-minute quest = 50 + (10 \* 2) = 70 XP

### 3. Achievement System (`achievements.ts`)

**15 Achievements**:

| Achievement      | Unlock Condition   |
| ---------------- | ------------------ |
| First Steps      | Complete 1 quest   |
| 3-Day Warrior    | 3-day streak       |
| Week Champion    | 7-day streak       |
| Month Master     | 30-day streak      |
| Rising Star      | Reach level 5      |
| Zen Seeker       | Reach level 10     |
| Mindful Master   | Reach level 20     |
| Quest Explorer   | Complete 10 quests |
| Quest Veteran    | Complete 25 quests |
| Quest Legend     | Complete 50 quests |
| Hour of Peace    | 60 minutes total   |
| Five Hour Focus  | 300 minutes total  |
| Thousand Minutes | 1000 minutes total |
| Early Bird       | Quest before 8 AM  |
| Night Owl        | Quest after 10 PM  |

**Achievement Checking**:

- `checkAchievements(stats)`: Returns array of newly unlocked achievement IDs
- Called after quest completion
- Checks all conditions automatically

### 4. Meditation Timer (`MeditationTimer.tsx`)

**Features**:

- Countdown timer with seconds precision
- Circular progress visualization using SVG
- Play/Pause/Reset controls
- Auto-completion callback
- Visual feedback (color-coded progress)

**Implementation**:

```typescript
- Uses setInterval for countdown
- Updates every 1000ms (1 second)
- SVG circle strokeDashoffset for visual progress
- Cleanup on unmount prevents memory leaks
```

## 🔄 User Flow

### Complete User Journey

```
1. Home → 2. Select Mood → 3. Quest List → 4. Quest Detail → 5. Complete → 6. Profile
   ↑                                                                              ↓
   ←←←←←←←←←←←←←←←←←←←←←← Start New Quest ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
```

### Data Flow

```
User Action → Component → Context → LocalStorage
                ↓           ↓
            UI Update ← State Update
```

## 💾 Data Persistence

### LocalStorage Schema

**Key**: `calmquest_user_stats`

**Stored Data**:

```json
{
  "xp": 150,
  "level": 2,
  "currentStreak": 3,
  "longestStreak": 5,
  "totalQuestsCompleted": 5,
  "totalMeditationMinutes": 45,
  "lastCheckIn": "2025-11-21T10:30:00.000Z",
  "currentMood": "calm",
  "achievements": [...],
  "completedQuests": [...]
}
```

**Serialization**:

- Date objects → ISO strings
- Parsed back to Date objects on load
- Automatic save on every state change

## 🎨 UI Components

### Key Components

**shadcn/ui** (Pre-built):

- Button, Card, Progress, Badge, Toast
- Dialog, Sheet, Tabs, Select
- All fully customizable with Tailwind

**Custom Components**:

- `MoodSelector`: 6 mood cards with emoji + descriptions
- `MeditationTimer`: Circular countdown with controls
- `QuestCard`: Landing page feature cards
- `AchievementUnlock`: Toast notification for achievements
- `XPBar`: Progress bar with level display
- `LoadingSpinner`: Loading state indicator

### Animations

- **Confetti**: canvas-confetti library
- **Transitions**: Tailwind CSS transitions
- **Fade-ins**: Custom CSS animations
- **Scale effects**: Hover states with transform

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📱 Responsive Design

- **Mobile-first**: Base styles for mobile
- **Breakpoints**:
  - `sm`: 640px (tablet)
  - `md`: 768px (desktop)
  - `lg`: 1024px (large desktop)
- All pages fully responsive
- Touch-friendly button sizes

## 🔒 Data Privacy

- **100% client-side**: No data sent to servers
- **LocalStorage only**: Data stays on device
- **No tracking**: No analytics or third-party scripts
- **No accounts**: No registration required
- **Easy to clear**: Standard browser storage clearing

## 🚀 Performance

### Optimizations

- **Lazy loading**: Route-based code splitting
- **No API calls**: Instant load times
- **Minimal dependencies**: Small bundle size
- **React.memo**: Prevent unnecessary re-renders (where needed)
- **Vite HMR**: Fast development experience

### Bundle Size

- Main bundle: ~150-200 KB (gzipped)
- Vendor bundle: ~140 KB (React + deps)
- Total initial load: <350 KB

## 🐛 Known Issues & Limitations

### Current Limitations

1. **No backend**: Data doesn't sync across devices
2. **No audio**: Text-only instructions (planned)
3. **Limited quests**: 12 templates (easy to expand)
4. **No offline first**: Requires one initial load
5. **No push notifications**: No reminder system

### Edge Cases Handled

- ✅ Streak calculation across days
- ✅ Quest completion before timer ends
- ✅ Browser refresh during quest (timer resets - by design)
- ✅ Multiple achievement unlocks at once
- ✅ Level up during quest completion
- ✅ Reset progress confirmation

### Not Handled (Future Work)

- ❌ Quest pause/resume across sessions
- ❌ Quest history filtering/search
- ❌ Achievement share to social media
- ❌ Quest custom duration
- ❌ Multiple user profiles

## 📈 Future Enhancements

### Phase 2 (Next Sprint)

- [ ] Backend integration (Supabase)
- [ ] User authentication
- [ ] Cloud sync
- [ ] Audio guidance for quests
- [ ] More quest templates (50+)
- [ ] Quest categories/filters

### Phase 3 (Future)

- [ ] Social features (friends, leaderboards)
- [ ] Custom quest creator
- [ ] Progress analytics dashboard
- [ ] Mobile apps (React Native)
- [ ] Wearable integration
- [ ] Premium content

## 🧪 Testing

### Manual Testing Checklist

- [ ] Complete full user flow
- [ ] Test streak calculation (change system date)
- [ ] Test achievement unlocks
- [ ] Test level progression
- [ ] Test localStorage persistence
- [ ] Test responsive design (mobile/tablet/desktop)
- [ ] Test all quest types
- [ ] Test profile reset
- [ ] Test navigation (back button, etc.)

### Test Data Generation

```typescript
// In browser console:
localStorage.setItem('calmquest_user_stats', JSON.stringify({
  xp: 5000,
  level: 8,
  currentStreak: 10,
  longestStreak: 15,
  totalQuestsCompleted: 30,
  totalMeditationMinutes: 300,
  achievements: [...], // Copy from app
  completedQuests: []
}));
location.reload();
```

## 📝 Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Standard React rules
- **Formatting**: Prettier (2 spaces, single quotes)
- **Naming**:
  - Components: PascalCase
  - Functions: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Types/Interfaces: PascalCase

## 🤝 Contributing (Future)

When ready for open source:

1. Fork repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Maintain code style

---

## 📞 Support

For demo or technical questions, contact the team!

Built with ❤️ for your mental wellness journey.
