# 🔐 Security & Environment Setup

## Environment Variables

This project uses environment variables to protect sensitive credentials. **Never commit `.env` files to version control.**

### Setup Instructions

1. **Copy the example file:**

   ```bash
   cp .env.example .env
   ```

2. **Fill in your credentials** in `.env`:

   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Groq AI Configuration
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

3. **Get your credentials:**

   **Supabase:**

   - Go to https://supabase.com/dashboard
   - Select your project
   - Go to Settings → API
   - Copy "Project URL" and "anon public" key

   **Groq:**

   - Go to https://console.groq.com
   - Navigate to API Keys
   - Create a new API key

4. **Restart dev server** after updating `.env`:
   ```bash
   npm run dev
   ```

## Security Best Practices

### ✅ What We Do

- **Environment Variables**: All sensitive data in `.env` (not committed)
- **`.gitignore`**: `.env` files are ignored by git
- **Row Level Security**: Database policies protect user data
- **Client-Side Keys Only**: Using public/anon keys (not service keys)
- **Validation**: Code checks for missing environment variables

### ⚠️ Important Notes

1. **Anon Key is Safe**: The Supabase anon key is designed for client-side use. Row Level Security (RLS) policies protect your data.

2. **Never Commit**:

   - ❌ Don't commit `.env` files
   - ✅ Do commit `.env.example` (template without real values)

3. **Production Deployment**:

   - Set environment variables in your hosting platform (Vercel, Netlify, etc.)
   - Never hardcode credentials in source code

4. **Regenerate Keys**: If keys are accidentally exposed:
   - Supabase: Generate new anon key in dashboard
   - Groq: Revoke old key and create new one

## File Structure

```
.env                 → Your actual credentials (gitignored)
.env.example         → Template for other developers
.gitignore           → Ensures .env is never committed
src/lib/supabase.ts  → Uses import.meta.env.VITE_SUPABASE_*
src/lib/aiService.ts → Uses import.meta.env.VITE_GROQ_API_KEY
```

## Environment Variable Format

**Vite requires the `VITE_` prefix** for environment variables to be exposed to the client:

```env
VITE_VARIABLE_NAME=value   ✅ Accessible in code
VARIABLE_NAME=value        ❌ Not accessible (server-only)
```

Access in code:

```typescript
const value = import.meta.env.VITE_VARIABLE_NAME;
```

## Troubleshooting

**"Missing environment variables" error?**

- Check `.env` file exists in project root
- Verify variable names start with `VITE_`
- Restart dev server after creating/editing `.env`

**API not working?**

- Verify keys are correct (no extra spaces)
- Check keys haven't expired or been revoked
- Look for typos in variable names

**Still having issues?**

- Check browser console for error messages
- Verify `.env` is in the same directory as `package.json`
- Try `npm run dev` with `--force` flag

## For Team Members

When cloning this project:

1. Copy `.env.example` to `.env`
2. Ask team lead for credentials (don't share in public channels)
3. Add your credentials to `.env`
4. Never commit your `.env` file
5. If you need different credentials for testing, use `.env.local`

## Production Deployment

### Vercel

```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_GROQ_API_KEY
```

### Netlify

Add in: Site Settings → Build & Deploy → Environment Variables

### Other Platforms

Check your platform's documentation for setting environment variables.

---

**Remember: Security is everyone's responsibility!** 🔒
