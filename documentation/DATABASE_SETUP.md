# Database Setup Guide

## Prerequisites

- Supabase account (already created)
- Project URL: `https://ktadsjlbukigcxwmolyn.supabase.co`
- Anon Key: Already configured in `src/lib/supabase.ts`

## Setup Steps

### 1. Run Database Migration

Go to your Supabase Dashboard:

1. Navigate to https://supabase.com/dashboard
2. Select your project "calm-quest"
3. Go to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the entire contents of `database-schema.sql`
6. Click **Run** to execute the migration

This will create:

- `user_profiles` table
- `completed_quests` table
- `achievements` table
- `mood_entries` table
- Row Level Security (RLS) policies
- Indexes for performance
- Automatic timestamp updates

### 2. Verify Tables

After running the migration:

1. Go to **Table Editor** in the left sidebar
2. You should see all 4 tables listed
3. Each table should have RLS enabled (shown by a lock icon)

### 3. Enable Email Authentication

1. Go to **Authentication** → **Settings**
2. Under **Auth Providers**, ensure **Email** is enabled
3. Configure email templates (optional):
   - Welcome email
   - Password reset
   - Email confirmation

### 4. Test Authentication

The app will automatically:

- Create user profiles when users sign up
- Store data in the database instead of localStorage
- Sync data across devices when users log in

## Database Schema Overview

### user_profiles

Stores core user information and stats:

- User ID (linked to auth.users)
- Email and username
- XP, level, streaks
- Total quests and meditation time

### completed_quests

Quest completion history:

- Quest details (ID, title, duration)
- XP earned
- Completion timestamp

### achievements

Achievement unlock tracking:

- Achievement ID
- Unlock timestamp

### mood_entries

User mood tracking:

- Mood selection
- Timestamp
- Whether a quest was completed

## Security

All tables have **Row Level Security (RLS)** enabled:

- Users can only access their own data
- Policies ensure data isolation
- Prevents unauthorized access

## Next Steps

1. Run the migration in Supabase SQL Editor
2. Test signup/login flow
3. Verify data is being stored in the database
4. Check RLS policies are working correctly

## Troubleshooting

### Migration Errors

- Ensure you're logged into the correct Supabase project
- Check for syntax errors in the SQL
- Verify you have admin permissions

### Authentication Issues

- Check that email auth is enabled
- Verify API keys are correct in `src/lib/supabase.ts`
- Check browser console for error messages

### Data Not Saving

- Verify RLS policies are created
- Check that user ID matches between auth and profiles
- Look for errors in browser console
