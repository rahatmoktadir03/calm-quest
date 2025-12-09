# ⚡ Quick Start - CalmQuest Backend & AI

## 🚀 Get Started in 4 Steps

### Step 0: Setup Environment Variables (2 minutes)

1. **Copy the example file:**

   ```bash
   copy .env.example .env
   ```

2. **Add your credentials to `.env`:**
   - Get Supabase URL and key from https://supabase.com/dashboard
   - Get Groq API key from https://console.groq.com
   - See `documentation/SECURITY.md` for detailed instructions

### Step 1: Run Database Migration (5 minutes)

1. Open https://supabase.com/dashboard
2. Select your "calm-quest" project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy all contents from `database-schema.sql`
6. Paste and click **Run**
7. Verify success ✅

### Step 2: Start the App (30 seconds)

```bash
npm run dev
```

Open http://localhost:5173

### Step 3: Test Everything (3 minutes)

1. **Sign Up**: Create account at `/signup`
2. **Complete Quest**: Select mood → choose quest → complete
3. **Try AI Coach**: Click "AI Coach" button → chat with AI
4. **Generate Script**: In quest detail → click "Generate Personalized Script"
5. **Check Profile**: View your stats and achievements
6. **Test Persistence**: Sign out → sign back in → data still there!

---

## 🎯 What's New?

### Backend

- ✅ Supabase database (PostgreSQL)
- ✅ User authentication (email/password)
- ✅ Cloud data sync
- ✅ Cross-device support

### AI Features

- ✅ AI Meditation Coach (`/ai-coach`)
- ✅ Personalized meditation scripts
- ✅ Natural language chat
- ✅ Context-aware responses

### New Routes

- `/login` - Sign in
- `/signup` - Create account
- `/ai-coach` - AI coach dashboard

---

## 📋 Demo Checklist

Before presenting:

- [ ] Run database migration
- [ ] Test signup/login flow
- [ ] Complete 2-3 quests
- [ ] Try AI coach chat
- [ ] Generate AI meditation script
- [ ] Check profile stats
- [ ] Verify data persists after logout

---

## 🆘 Quick Fixes

**Can't login?**

- Check database migration ran successfully
- Verify tables exist in Supabase dashboard
- Clear browser cache and cookies

**AI not working?**

- Check internet connection
- Verify Groq API key in `src/lib/aiService.ts`
- Check browser console for errors

**Data not saving?**

- Check Supabase RLS policies created
- Verify you're logged in
- Check browser console for errors

---

## 📚 Documentation

**Full Details:**

- `IMPLEMENTATION_SUMMARY.md` - Complete overview
- `PHASE2_COMPLETE.md` - All new features
- `documentation/DEMO_NIGHT_GUIDE.md` - Presentation script
- `documentation/DATABASE_SETUP.md` - Database details

**Database:**

- `database-schema.sql` - Run this in Supabase!

---

## 🎉 You're Ready!

The app now has:

- 🔐 Authentication system
- 💾 Cloud database
- 🤖 AI-powered features
- 🎮 Complete gamification
- 📱 Cross-device sync

**Perfect for Demo Night!** 🚀
