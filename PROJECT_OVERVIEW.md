# Summit Coaches - Trip Booking Website

A beautiful, responsive Next.js 14 booking website for coach travel with TypeScript, Framer Motion animations, and a light blue theme.

## Features

- **Beautiful UI**: Clean, modern design with light blue (#0ea5e9) theme
- **Framer Motion Animations**: Smooth, professional animations throughout
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **TypeScript**: Full type safety
- **No Authentication Required**: Customer-facing booking flow without login

## Project Structure

```
app/
├── layout.tsx              # Root layout with Header & Footer
├── page.tsx                # Home page
├── trips/
│   ├── page.tsx           # All trips listing
│   └── [id]/page.tsx      # Individual trip details & booking
├── booking/
│   └── [id]/success/      # Booking confirmation page
├── about/page.tsx         # About page
├── contact/page.tsx       # Contact page
├── terms/page.tsx         # Terms & Conditions
└── privacy/page.tsx       # Privacy Policy

components/
├── layout/
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Footer with links
├── home/
│   ├── Hero.tsx           # Hero section
│   ├── FeaturedTrips.tsx  # Featured trips carousel
│   └── Features.tsx       # Features grid
├── trips/
│   └── TripCard.tsx       # Trip card component
└── booking/
    └── BookingForm.tsx    # Booking form component

lib/
└── api.ts                 # API client & TypeScript interfaces
```

## API Integration

The website expects your backend API at: `http://localhost:3001/api` (configurable via `.env`)

### Required API Endpoints

#### 1. GET /api/trips
Returns list of available trips

```typescript
Response: Trip[]

interface Trip {
  id: string;
  title: string;
  description: string;
  destination: string;
  duration: string;
  price: number;
  departureDate: string;
  returnDate: string;
  availableSeats: number;
  imageUrl: string;
  highlights: string[];
  included: string[];
}
```

#### 2. GET /api/trips/:id
Returns specific trip details

```typescript
Response: Trip
```

#### 3. POST /api/bookings
Creates a new booking

```typescript
Request Body:
{
  tripId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfPassengers: number;
  passengerDetails?: PassengerDetail[];
}

Response: Booking

interface Booking {
  id: string;
  tripId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfPassengers: number;
  totalPrice: number;
  status: string;
  bookingDate: string;
}
```

#### 4. GET /api/bookings/:id
Returns booking details

```typescript
Response: Booking
```

## Environment Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update the API URL if needed:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The website will be available at http://localhost:3000

## Key Pages

- **Home** (`/`) - Hero section, featured trips, and features
- **Trips** (`/trips`) - Browse all available trips with search
- **Trip Details** (`/trips/:id`) - View trip details and book
- **Booking Success** (`/booking/:id/success`) - Confirmation page
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form and information

## Design Theme

- **Primary Color**: #0ea5e9 (Sky Blue)
- **Secondary Color**: #1e293b (Deep Navy)
- **Accent Color**: #f59e0b (Amber)
- **Success**: #10b981 (Green)
- **Error**: #ef4444 (Red)

## Animations

All animations are implemented with Framer Motion for smooth, professional interactions:
- Page transitions
- Card hover effects
- Button interactions
- Scroll animations
- Loading states

## Notes

- No authentication/login required - customers can book directly
- All booking data is sent to your backend API
- Images are loaded from Pexels (placeholder URLs provided)
- Forms include validation and error handling
- Responsive design works on all device sizes
