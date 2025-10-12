# API Migration to Next.js

## Overview

The backend API has been successfully migrated from the standalone Express.js server (`qsr-order-api`) to Next.js API routes within the `mealdig` codebase.

## What Was Changed

### 1. Database Infrastructure

- **Created**: `lib/db/connection.ts` - MongoDB connection with Next.js-optimized caching
- **Created**: `lib/db/models/` - All Mongoose models converted to TypeScript:
  - `User.ts`
  - `Order.ts`
  - `Chain.ts`
  - `ChipotleOrder.ts`
  - `AndPizzaOrder.ts`

### 2. API Routes Created

All API routes are now in `pages/api/`:

**Chains** (`/api/chains/`)

- `GET /api/chains` - Get all chains
- `GET /api/chains/[chainName]` - Get chain by name with orders

**Orders** (`/api/orders/`)

- `GET /api/orders` - Get all orders
- `POST /api/orders/favorite` - Add favorite
- `POST /api/orders/unfavorite` - Remove favorite
- `DELETE /api/orders/delete/[id]` - Delete order
- `GET /api/orders/chain/[name]` - Get orders by chain
- `GET /api/orders/id/[id]` - Get order by ID
- `GET /api/orders/tag/[tag]` - Get orders by tag
- `GET /api/orders/chain/[chain]/[tag]` - Get orders by chain and tag

**Users** (`/api/users/`)

- `GET /api/users` - Get all users
- `GET /api/users/all` - Get users with orders
- `GET /api/users/[userName]` - Get user by username
- `GET /api/users/id/[id]` - Get user by ID
- `POST /api/users/signup` - Create new user
- `POST /api/users/login` - Authenticate user
- `POST /api/users/update-user` - Update user
- `DELETE /api/users/delete/[email]` - Delete user

**User-Order** (`/api/user-order/create/`)

- `POST /api/user-order/create/order` - Create anonymous order
- `POST /api/user-order/create/existing-user` - Create order for existing user
- `POST /api/user-order/create/new-user` - Create user with order

**Email** (`/api/email/`)

- `POST /api/email/` - Check if email exists
- `POST /api/email/send` - Send password reset email
- `POST /api/email/confirm-token` - Confirm password reset token
- `POST /api/email/send-confirm` - Send confirmation email
- `POST /api/email/send-feedback` - Send feedback email

### 3. Frontend Updates

Updated all API calls in the following components to use local API routes:

- `pages/index.tsx`
- `pages/orders/[id].tsx`
- `pages/orders/all.tsx`
- `pages/user/[user].tsx`
- `pages/user/[user]/account-settings.tsx`
- `pages/tags/[tag].tsx`
- `pages/chains/[name].tsx`
- `pages/chains/[name]/[tag].tsx`
- `components/forms/LoginForm.tsx`
- `components/forms/SignupForm.tsx`
- `components/forms/ForgotPassword.tsx`
- `components/forms/ResetPassword.tsx`
- `components/forms/order-forms/SubmitConfirmation.tsx`
- `components/sitewide/Feedback.tsx`
- `components/order-content/all-orders/ActionBar.tsx`

### 4. Configuration Changes

- **Updated**: `next.config.js` - Removed `api_key` environment variable
- **Moved**: `key.json` - Email service credentials now in mealdig directory
- **Added**: New dependencies to `package.json`:
  - `mongoose` (^7.6.3)
  - `mongoose-deep-populate` (^3.2.0)
  - `mongoose-unique-validator` (^4.0.0)
  - `bcryptjs` (^2.4.3)
  - `nodemailer` (^6.9.7)
  - `@types/bcryptjs` (^2.4.6)
  - `@types/nodemailer` (^6.4.14)

## Running the Application

### Prerequisites

1. MongoDB running locally on default port (27017), or set `DB_URL` environment variable
2. Node.js v18.18.0 or higher
3. pnpm v8.0.0 or higher

### Setup

```bash
cd /Users/david.budimir/code/mealdig/mealdig
pnpm install
```

### Development

```bash
pnpm run dev
```

The application will run on `http://localhost:4000`

### Environment Variables

For production, set:

- `DB_URL` - MongoDB connection string
- `NODE_ENV=production`

### Testing the Migration

1. Start the application: `pnpm run dev`
2. Test authentication: Navigate to `/login` and `/signup`
3. Test order creation: Navigate to `/create-order`
4. Test order viewing: Navigate to `/orders/all`
5. Test chain pages: Navigate to `/chains/chipotle`
6. Test user pages: Navigate to a user profile

## Next Steps

### Required Before Deploying

1. Ensure MongoDB is accessible in production environment
2. Update any hardcoded `localhost:4000` URLs to use environment variables or Next.js built-in URL detection
3. Test all API endpoints thoroughly
4. Set up proper environment variables in production hosting

### Optional Improvements

1. Add API rate limiting
2. Implement better error handling and logging
3. Add API authentication/authorization middleware
4. Implement request validation
5. Add API testing suite

## Deprecating qsr-order-api

Once the migration is verified to be working correctly:

1. Archive the `qsr-order-api` directory
2. Update any deployment scripts
3. Remove the old API from any hosting services
4. Update documentation to reflect the new architecture
