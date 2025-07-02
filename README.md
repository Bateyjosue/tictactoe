# Emoji Tic Tac Toe

A fun, emoji-based Tic Tac Toe game built with React 19, Next.js 14 (App Router), and TailwindCSS. Play as your favorite animal and fruit combo on a dynamic grid. Supports light/dark mode, mobile-first design, and is ready for Vercel deployment.

## Features
- 🐒🍌 🐰🥕 ... Play as animals and their favorite fruits!
- Choose your emoji combo and grid size (3x3 to 6x6)
- Responsive, mobile-first UI with large tap targets
- Light/dark mode toggle (class strategy)
- Win/draw detection, winning line highlight, and reset button
- Clean, intuitive design with emoji previews and instructions

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### 3. Build for production
```bash
npm run build
npm start
```

## Deploying to Vercel
1. Push your code to a GitHub/GitLab/Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repo.
3. Vercel will auto-detect Next.js and deploy your app.

## Customization
- Edit emoji combos in `src/app/components/EmojiSelector.tsx`.
- Adjust grid size limits in `src/app/components/GridSizeSelector.tsx`.
- Tweak styles in `globals.css` or Tailwind config.

## License
MIT
