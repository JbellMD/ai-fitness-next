# AI Fitness Tracker (Next.js Version)

A modern fitness tracking application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌓 Dark/Light mode support
- 📱 Responsive design
- 🏃‍♂️ Activity logging
- 📊 AI-powered insights
- 🥗 Nutrition tracking
- 🔒 User authentication with Firebase

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Firebase Authentication
- Chart.js
- Framer Motion
- React Hook Form

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable components
│   ├── ui/          # UI components
│   └── ...          # Feature components
├── lib/             # Utility functions and configurations
└── types/           # TypeScript type definitions
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
