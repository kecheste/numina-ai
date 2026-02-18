# Numina Setup Guide

## Environment Variables Required

Configure the following environment variables in your Vercel project:

### Backend API (Authentication)

- `NEXT_PUBLIC_API_URL` - Backend API base URL (e.g. `http://localhost:8000` for local, or your deployed backend URL). The frontend uses this for login, register, and `/api/v1/users/me`.

### MongoDB Database

- `MONGODB_URI` - Your MongoDB connection string (with username and password)

### Stripe Payments

- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY` - Stripe price ID for monthly plan
- `NEXT_PUBLIC_STRIPE_PRICE_ANNUAL` - Stripe price ID for annual plan
- `STRIPE_WEBHOOK_SECRET` - Webhook secret for Stripe events
- `NEXT_PUBLIC_APP_URL` - Your app URL (e.g., https://numina.example.com)

## Setup Steps

### 1. Backend and Authentication

1. Run the Numina backend (see backend README): set `DATABASE_URL`, `JWT_SECRET_KEY`, etc., then `uv run uvicorn app.main:app --reload`.
2. Set `NEXT_PUBLIC_API_URL` in the frontend to your backend URL (e.g. `http://localhost:8000`).

### 2. MongoDB Setup

1. Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Create a database user with appropriate permissions
4. Get connection string and add to MONGODB_URI

### 3. Stripe Setup

1. Create Stripe account at https://stripe.com
2. Go to Products -> Create Product
3. Create two prices:
   - Monthly: $19.99/month
   - Annual: $119/year
4. Copy the price IDs to NEXT_PUBLIC_STRIPE_PRICE_MONTHLY and NEXT_PUBLIC_STRIPE_PRICE_ANNUAL
5. Set up webhook endpoint at `/api/webhooks/stripe` with your Stripe account

## Database Collections

The MongoDB database automatically uses the following collections:

### users (backend / Postgres)

User data is stored in the backend (Postgres). Profile is returned from `GET /api/v1/users/me` (id, email, name, birth_year, birth_month, birth_day, birth_time, birth_place, is_premium, subscription_status, etc.).

### testResults

- userId (string, required)
- testId (number, required)
- testTitle (string, required)
- category (string, required)
- completedAt (date)
- answers (object)
- score (number)
- personalityType (string)
- insights (array)
- recommendations (array)

### userTestRecords

- userId (number, required)
- testId (number, required)
- completed (boolean)
- completedAt (date, optional)

## Features

### Authentication

- Backend JWT authentication (register with name, email, password, date of birth; login with email/password)
- DOB collected on DOB screen and sent on register
- User profiles from backend `GET /api/v1/users/me`

### Tests

- 16 comprehensive tests across 4 categories:
  - Cosmic Identity (astrology-based)
  - Psychological Profile (psychology)
  - Energy & Wellbeing (holistic)
  - Soul Path & Karma (numerology)
- 1-2 free tests per category, rest premium
- Test results with AI-generated personality profiles and insights

### Payments

- Stripe integration for monthly and annual subscriptions
- Webhook handling for subscription updates
- Premium feature access control

### AI Integration

- Mock AI service for generating personality profiles
- Extensible for real AI models (OpenAI, Anthropic, etc.)
- Customizable personality types and insights

## Testing

1. Create account via frontend (DOB → Register with name, email, password)
2. Complete DOB onboarding
3. Take first free test (Birth Chart Reading)
4. View results
5. Try premium test (e.g., Venus Influence) to trigger subscription modal
6. Test Stripe checkout (use test card 4242 4242 4242 4242)
