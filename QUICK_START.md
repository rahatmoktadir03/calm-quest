# 🚀 Quick Start Guide

## Getting Started in 30 Seconds

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Open Your Browser

Navigate to: `http://localhost:5173`

### 3. Start Exploring!

- Click **"Begin Your Journey"**
- Select your current mood
- Pick a quest and complete it
- Watch your XP and level grow!

---

## 🎮 What You Can Do

### ✅ Core Features (Ready Now!)

1. **Select Your Mood**

   - 6 moods: Stressed, Anxious, Tired, Calm, Energetic, Neutral
   - Get personalized quest recommendations

2. **Complete Quests**

   - 12+ unique quests across 4 types
   - Meditation, breathing, mindfulness, movement
   - 3-15 minute durations

3. **Track Progress**

   - Earn XP and level up
   - Build daily streaks
   - Unlock achievements (15 total)

4. **View Your Stats**
   - Profile page with full dashboard
   - Quest history
   - Achievement showcase

---

## 📁 Important Files

### Pages

- `src/pages/Index.tsx` - Home page
- `src/pages/SelectMood.tsx` - Mood picker
- `src/pages/QuestList.tsx` - Available quests
- `src/pages/QuestDetail.tsx` - Quest execution
- `src/pages/Profile.tsx` - User stats

### Core Logic

- `src/contexts/UserContext.tsx` - User state management
- `src/lib/questGenerator.ts` - Quest templates
- `src/lib/achievements.ts` - Achievement system

### Components

- `src/components/MoodSelector.tsx` - Mood cards
- `src/components/MeditationTimer.tsx` - Timer UI
- `src/components/AchievementUnlock.tsx` - Unlock toast

---

## 🎯 Demo Flow (5 Minutes)

### Quick Demo Path

1. **Home** → Click "Begin Your Journey"
2. **Mood** → Select "Stressed"
3. **Quests** → Pick "Box Breathing Challenge" (5 min)
4. **Timer** → Start, let run for 10 seconds, complete
5. **Completion** → See XP, confetti, achievements
6. **Profile** → View stats and achievements

### Pro Tips

- Use shorter quests (3-5 min) for demos
- Complete 2-3 quests to show streak system
- Reset progress: Profile → Reset Progress button

---

## 🛠️ Development Tips

### Hot Reload

- Save any file to see changes instantly
- No need to refresh browser

### Clear Data

```javascript
// In browser console:
localStorage.clear();
location.reload();
```

### Add Test Data

```javascript
// In browser console:
const stats = {
  xp: 5000,
  level: 8,
  currentStreak: 10,
  longestStreak: 15,
  totalQuestsCompleted: 30,
  totalMeditationMinutes: 300,
  lastCheckIn: new Date().toISOString(),
  currentMood: "calm",
  achievements: [], // Will auto-initialize
  completedQuests: [],
};
localStorage.setItem("calmquest_user_stats", JSON.stringify(stats));
location.reload();
```

---

## 📱 Test on Mobile

### Using Local Network

1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Start dev server: `npm run dev`
3. On mobile, visit: `http://YOUR_IP:5173`
4. Example: `http://192.168.1.100:5173`

---

## 🐛 Troubleshooting

### "npm run dev" fails

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Port 5173 already in use

```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### Changes not showing

- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Clear cache and reload

### Timer not working

- Check browser console for errors
- Make sure you clicked "Start"
- Refresh page and try again

---

## 📚 Learn More

- **Full Technical Docs**: See `TECHNICAL_DOCS.md`
- **Demo Guide**: See `DEMO_GUIDE.md`
- **Project Vision**: See `README.md`

---

## 🎨 Customize

### Change Colors

Edit `tailwind.config.ts` for theme colors

### Add New Quests

Edit `src/lib/questGenerator.ts`:

```typescript
{
  title: 'Your Quest Name',
  description: 'Quest description',
  type: 'meditation',
  duration: 10,
  difficulty: 'easy',
  xpReward: 70,
  mood: ['calm', 'neutral'],
  instructions: [
    'Step 1',
    'Step 2',
    // ...
  ],
  icon: '🧘',
}
```

### Add New Achievements

Edit `src/lib/achievements.ts`:

```typescript
{
  id: 'my_achievement',
  name: 'Achievement Name',
  description: 'How to unlock',
  icon: '🏆',
}
```

Then add unlock condition in `checkAchievements()`.

---

## 🚀 Deploy (Optional)

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on Vercel
3. Deploy! (auto-detects Vite)

### Build Locally

```bash
npm run build
npm run preview
```

---

## ✨ You're All Set!

Your CalmQuest app is ready to demo. Have fun and good luck with your presentation! 🎉

Questions? Check the docs or dive into the code - it's all well-commented!
