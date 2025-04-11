# DApp Dashboard

A full-stack dashboard for a fictional decentralized application (DApp) that displays and interacts with mock blockchain data.

## Features

- Dashboard with overview metrics and charts
- Transaction management
- Token tracking
- Asset management
- Wallet integration
- Analytics
- Admin panel
- User settings

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Charts**: Recharts
- **Blockchain Simulation**: Ethers.js

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Environment Setup

1. Clone the repository
2. Copy `.env.local.example` to `.env.local` and update the values:

\`\`\`
MONGODB_URI=mongodb://localhost:27017/dapp-dashboard
MONGODB_DB=dapp-dashboard
PORT=3000
HOST=localhost
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run the development server
npm run dev
\`\`\`

### Seeding the Database

\`\`\`bash
# Seed the database with mock data
npm run seed
\`\`\`

Or visit `/api/seed-mongoose` in your browser to seed the database.

## Project Structure

- `/app` - Next.js App Router pages and API routes
- `/components` - React components
- `/lib` - Utility functions, data models, and mock data
- `/public` - Static assets

## API Routes

- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Create a new transaction
- `GET /api/tokens` - Get all tokens
- `GET /api/wallets` - Get all wallets
- `GET /api/assets` - Get all assets
- `GET /api/dashboard` - Get dashboard metrics
- `GET /api/seed-mongoose` - Seed the database with mock data

## Deployment

This project can be easily deployed to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set up the environment variables
4. Deploy

## What I Learned

- Building a full-stack application with Next.js App Router
- Integrating MongoDB with Mongoose in a Next.js application
- Creating responsive UI components with Tailwind CSS and shadcn/ui
- Implementing data visualization with Recharts
- Simulating blockchain interactions

## Future Improvements

- Add authentication with NextAuth.js
- Implement real blockchain integration with Ethers.js
- Add more advanced analytics
- Improve error handling and loading states
- Add unit and integration tests
#   d a p p - d a s h b o a r d  
 