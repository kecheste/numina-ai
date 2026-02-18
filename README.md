# Numina - Spiritual Intelligence Platform

A premium spiritual assessment platform combining astrology, psychology, numerology, and wellness guidance. Built with Next.js, backend JWT auth, MongoDB, Stripe, and AI.

## 🌟 Features

### Complete Onboarding Flow

1. **Welcome Screen** - Beautiful landing with "Discover your unique soul map. Powered by AI, psychology & mysticism."
2. **Birth Date Collection** - Stored as metadata for personalization
3. **User Registration** - Date of birth (DOB screen), then full name, email, and password via backend API
4. **Onboarding Info** - Learn about the 5 energy pillars and features
5. **First Test** - Immediate engagement with "Cosmic Alignment" test

### 16 Comprehensive Tests

Organized in 4 mystical categories:

**Cosmic Identity** ✨

- Birth Chart Reading (FREE)
- Moon Sign Decoder (FREE)
- Venus Influence (PREMIUM)
- Planetary Transits (PREMIUM)

**Psychological Profile** 🧠

- MBTI Test (FREE)
- Big Five Personality (FREE)
- Emotional Intelligence (PREMIUM)
- Attachment Style (PREMIUM)

**Energy & Wellbeing** ⚡

- Chakra Assessment (FREE)
- Aura Energy Map (FREE)
- Wellness Profile (PREMIUM)
- Life Force Vitality (PREMIUM)

**Soul Path & Karma** 🌙

- Numerology Profile (FREE)
- Life Path Calculator (FREE)
- Karmic Patterns (PREMIUM)
- Soul Purpose Guide (PREMIUM)

### Intelligent Results

Each test returns AI-generated insights:

- **Personality Type** - Unique archetype (e.g., "The Cosmic Dreamer")
- **Key Insights** - 4 personalized insights specific to the test
- **Recommendations** - 4 actionable next steps
- **Score** - Overall assessment score (1-100)

### Premium Features

- Unlimited test access
- Advanced synthesis analysis
- Deep insights and patterns
- Priority support
- Stripe integration with flexible billing (monthly/annual)

### Dashboard & Navigation

- **My Soul** - View completed tests and personality profile
- **Explore** - Discover and take tests by category
- **Synthesis** - Premium page with unified insights
- **Drawer Menu** - My Tests, My Synthesis, Manage Subscription, Help & FAQ, Contact Support, Terms, Privacy Policy, Logout

## 🏗️ Architecture

### Frontend (Next.js + React)

- **App Router** - Modern file-based routing
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - Beautiful, accessible components
- **Client Components** - Interactive experiences

### Backend (Next.js API Routes)

- **Backend API** - JWT authentication (login/register), user profile
- **MongoDB** - Data persistence
- **Stripe** - Payment processing
- **Mock AI Service** - Personality generation (extensible)

### Security

- Auth context and protected /home routes (redirect to /welcome if not logged in)
- Stripe webhook signature verification
- Environment variables for secrets
- User data isolation
- Type-safe database queries

## 📊 Database Schema

### Users Collection

```typescript
{
  id: number,                 // Backend user ID
  email: string,
  name: string | null,
  birth_year, birth_month, birth_day, birth_time, birth_place
  is_premium: boolean,
  subscription_status: string,
  ...
}
```

### Test Results Collection

```typescript
{
  userId: string,                    // User ID
  testId: number,                    // Test ID (1-16)
  testTitle: string,                 // Test name
  category: string,                  // Category name
  completedAt: Date,                 // Completion timestamp
  answers: Record<string, number | string>, // User answers
  score: number,                     // Overall score
  personalityType: string,           // AI-generated type
  insights: string[],                // Array of insights
  recommendations: string[]          // Array of recommendations
}
```

### User Test Records Collection

```typescript
{
  userId: number,     // Backend user ID
  testId: number,
  completed: boolean,
  completedAt: Date
}
```

## 🔌 Integrations

### Backend Authentication

- Register: `POST /api/v1/auth/register` (email, password, name, birth_year, birth_month, birth_day, birth_time?, birth_place?)
- Login: `POST /api/v1/auth/login` (email, password) → JWT
- Profile: `GET /api/v1/users/me` with `Authorization: Bearer <token>`
- Token stored in localStorage; AuthProvider and protected /home routes

### MongoDB

- Atlas cloud database
- Automatic indexing
- Scalable collections
- Full ACID support

### Stripe Payment

- Monthly ($19.99) and Annual ($119) plans
- Webhook event handling
- Automatic subscription updates
- Test mode support

### Mock AI Service

Extensible personality generation:

```typescript
// Current: Mock with pre-defined responses
// Future: Replace with real AI
const response = await generateTestInsights({
  testId: 1,
  testTitle: 'Birth Chart Reading',
  category: 'Cosmic Identity',
  answers: { 1: 5, 2: 'Logic', ... }
})
// Returns: { personalityType, insights, recommendations, score }
```

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Add to Vercel project settings → Environment Variables
NEXT_PUBLIC_API_URL=https://your-backend-url.com
MONGODB_URI=...
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_STRIPE_PRICE_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_ANNUAL=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://numina.vercel.app
```

### 2. Create Services

1. **Backend**: Run Numina backend, set `NEXT_PUBLIC_API_URL` in frontend to backend URL
2. **MongoDB**: https://atlas.mongodb.com → Create cluster → Copy URI
3. **Stripe**: https://stripe.com → Create products → Copy IDs and webhook secret

### 3. Deploy

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys
# Set environment variables in Vercel dashboard
# Done!
```

### 4. Test the Flow

1. Visit your app
2. Click "Start Your Journey"
3. Enter birth date
4. Sign up with email
5. Complete onboarding
6. Take first test
7. View AI-generated results
8. Try premium test to trigger subscription

## 📁 Project Structure

```
numina/
├── app/
│   ├── layout.tsx              # Root layout with AuthProvider
│   ├── page.tsx                # Auth flow & routing
│   ├── globals.css             # Tailwind + design tokens
│   └── api/
│       ├── users/profile/      # User CRUD
│       ├── tests/submit/       # Test submission
│       ├── tests/results/      # Result fetching
│       ├── checkout/           # Stripe checkout
│       └── webhooks/stripe/    # Stripe events
├── components/
│   ├── app-container.tsx       # Main app wrapper
│   ├── pages/
│   │   ├── my-soul-page.tsx
│   │   ├── explore-page.tsx
│   │   └── synthesis-page.tsx
│   ├── auth/
│   │   ├── welcome-screen.tsx
│   │   ├── dob-screen.tsx
│   │   ├── about-yourself.tsx
│   │   └── onboarding-info-screen.tsx
│   ├── test/
│   │   ├── test-flow.tsx
│   │   ├── test-results.tsx
│   │   └── test-result-view.tsx
│   ├── navigation/
│   │   ├── bottom-navigation.tsx
│   │   └── app-drawer.tsx
│   ├── modals/
│   │   └── subscription-modal.tsx
│   └── ui/                     # Shadcn components
├── lib/
│   ├── mongodb.ts              # DB connection
│   ├── models/user.ts          # Type definitions
│   ├── stripe-service.ts       # Payment logic
│   └── ai-service.ts           # Personality generation
├── contexts/auth-context.tsx    # Auth state and token
├── SETUP.md                    # Setup guide
├── IMPLEMENTATION.md           # Technical details
├── CHECKLIST.md               # Completion checklist
└── README.md                  # This file
```

## 🎨 Design System

### Colors

- **Primary**: #FFD84D (Warm Yellow)
- **Background**: #000000 (Pure Black)
- **Secondary**: #FFFFFF (White)
- **Accent**: #FFD700 (Gold)
- **Borders**: #1F2937 (Dark Gray)

### Typography

- **Headings**: Playfair Display (elegant serif)
- **Body**: Inter (clean sans-serif)
- **Mono**: Geist Mono (code)

### Layout

- **Mobile-first**: 450px fixed width
- **Responsive**: Scales to larger screens
- **Accessible**: WCAG compliant
- **Dark mode**: Enabled by default

## 🔐 Security Features

1. **Authentication**
   - Backend JWT handles auth
   - Secure password hashing
   - Session management
   - Email verification

2. **API Protection**
   - Middleware validates auth
   - User data isolation
   - Role-based access
   - CORS configured

3. **Payment Security**
   - PCI compliance via Stripe
   - Webhook signature verification
   - Encrypted credentials
   - Test mode available

4. **Data Protection**
   - MongoDB encryption
   - Environment variable secrets
   - No hardcoded values
   - Audit logging

## 🧪 Testing

### Test Account

```
Email: test@numina.com
Password: Test123!@#
```

### Test Stripe Card

```
Card: 4242 4242 4242 4242
Exp: 12/25
CVC: 123
```

### Test Scenarios

1. ✅ User registration with DOB
2. ✅ Free test completion
3. ✅ Premium test paywall
4. ✅ Stripe checkout
5. ✅ Premium access after payment
6. ✅ Test result persistence
7. ✅ Logout and re-login

## 🚀 Deployment

### Vercel

```bash
# Automatic on git push
# Set environment variables in dashboard
# Monitor with Vercel Analytics
```

### Custom Domain

```bash
# Point domain to Vercel
# Auto-generates SSL certificate
# Automatic redirects
```

## 📈 Analytics

Monitor with built-in Vercel Analytics:

- User signups
- Test completions
- Subscription conversions
- Performance metrics

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions welcome! Areas for enhancement:

- Real AI integration (OpenAI, Anthropic)
- Additional tests and categories
- Advanced analytics
- Social sharing
- Mobile app
- Analytics dashboard

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

## 📞 Support

For issues or questions:

1. Check SETUP.md for configuration
2. Review IMPLEMENTATION.md for technical details
3. See CHECKLIST.md for feature status
4. Contact: support@numina.app (configure in drawer menu)

---
