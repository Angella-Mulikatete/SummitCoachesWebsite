# Summit Coaches - Bus Booking System

A modern, high-performance bus booking system built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- 🎨 Beautiful, responsive UI with light blue theme
- 🚀 Fast performance with optimized loading
- 📱 Mobile-first design
- 🔐 Secure authentication system
- 🎫 Complete booking flow with seat selection
- 📄 QR code receipt generation
- 💳 No online payment (office payment only)
- 🌐 Dynamic content management
- ♿ Accessibility compliant
- 🎭 Smooth animations with Framer Motion

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **State Management:** Zustand
- **Data Fetching:** SWR
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **QR Codes:** qrcode library
- **Date Handling:** date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/summit-coaches.git
cd summit-coaches
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and add your backend API URL:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000/api
\`\`\`

4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
summit-coaches/
├── app/                    # Next.js app directory
│   ├── (routes)/          # Page routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── home/             # Home page components
│   ├── search/           # Search components
│   ├── trip/             # Trip details components
│   ├── booking/          # Booking components
│   ├── dashboard/        # Dashboard components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions
│   ├── api.ts            # API client
│   ├── types.ts          # TypeScript types
│   ├── stores/           # Zustand stores
│   └── utils/            # Helper functions
└── public/               # Static assets
\`\`\`

## API Integration

The system is designed to work with a Laravel backend. Update the API endpoints in `lib/api.ts` to match your backend URLs.

### Required API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/trips` - Get available trips
- `GET /api/trips/:id` - Get trip details
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `GET /api/user/bookings` - Get user bookings
- `GET /api/content/about` - Get about page content
- `GET /api/content/contact` - Get contact info
- `GET /api/content/terms` - Get terms and conditions

## Performance Optimizations

- Server-side rendering for initial page load
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- SWR for efficient data fetching and caching
- Debounced search inputs
- Optimized animations with Framer Motion
- Middleware for security headers and caching

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the production version:
\`\`\`bash
npm run build
npm start
\`\`\`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software developed for Summit Coaches.

## Support

For support, email info@summitcoaches.com or contact our development team.
