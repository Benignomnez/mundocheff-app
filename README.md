# MundoChef

MundoChef is a modern web application for meal planning and recipe discovery, built with Next.js and tailored to users' dietary preferences.

![MundoChef Screenshot](public/mundochef-preview.png)

## Features

- **Personalized Meal Planning**: Generate weekly meal plans based on dietary restrictions and preferences
- **Recipe Discovery**: Browse a curated collection of recipes from around the world
- **User Preferences**: Set your dietary restrictions, cuisine preferences, and calorie targets
- **Responsive Design**: Fully responsive interface works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS and shadcn/ui components
- **User Authentication**: Sign up and log in to save your preferences
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Framework**: Next.js 15.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication & Database**: Firebase
- **Development**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mundochef.git
   cd mundochef
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Configure Firebase:
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Register your web application in Firebase
   - Enable Email/Password authentication
   - Create a Firestore database
   - Copy `src/lib/firebase.example.ts` to `src/lib/firebase.ts`
   - Update `src/lib/firebase.ts` with your Firebase configuration
   - For detailed instructions, visit `/firebase-setup` in the running application

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun run dev
   ```

5. Open your browser and visit `http://localhost:3000`

## Firebase Setup

This application uses Firebase for authentication and storing user preferences. To set up Firebase:

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Register your web application in Firebase
3. Enable Email/Password authentication in the Authentication section
4. Create a Firestore database in test mode
5. Copy the Firebase configuration to `src/lib/firebase.ts`

For detailed step-by-step instructions, run the application and visit `/firebase-setup`.

## Project Structure

- `src/app/`: Application pages and routes
- `src/components/`: Reusable UI components
- `src/lib/`: Utility functions and shared logic
- `public/`: Static assets

## Key Features Explained

### Onboarding & Preferences

Users can set their dietary preferences, cuisine preferences, and calorie targets through an intuitive onboarding process. These preferences are saved to Firebase if the user is logged in, or to localStorage if not.

### Authentication

Users can create accounts and log in to save their preferences across devices. The application uses Firebase Authentication for secure user management.

### Meal Planning

The application generates customized weekly meal plans with breakfast, lunch, and dinner options based on user preferences.

### Recipe Browsing

Users can browse recipes by category, cuisine type, or dietary restrictions.

## Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
# or
bun run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Recipe images from [Unsplash](https://unsplash.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Authentication and database by [Firebase](https://firebase.google.com)
