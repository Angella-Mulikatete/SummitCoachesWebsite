'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import TripCard from '@/components/trips/TripCard';
import RouteSearch from '@/components/trips/RouteSearch';
import { useTripsViaRoutes } from '@/hooks/use-api';
import { Loader2, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type SortOption = 'default' | 'price-low' | 'price-high' | 'date-soon' | 'date-later';

export default function TripsPage() {
  const [searchFilters, setSearchFilters] = useState<{
    origin?: string;
    destination?: string;
    date?: Date;
  }>({});
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Use route-based search hook
  const { data: tripsResponse, isLoading, error, isError } = useTripsViaRoutes({
    origin: searchFilters.origin,
    destination: searchFilters.destination,
    tripDate: searchFilters.date ? format(searchFilters.date, 'yyyy-MM-dd') : undefined,
  });

  // Extract trips from response with better error handling
  // const trips = useMemo(() => {
  //   if (!tripsResponse) return [];

  //   // Handle different response structures
  //   if (tripsResponse.data?.trips) {
  //     return tripsResponse.data.trips.map((trip: any) => ({
  //       id: trip.id,
  //       title: `${trip.route?.origin || trip.origin || 'Unknown'} to ${trip.route?.destination || trip.destination || 'Unknown'}`,
  //       description: `Journey from ${trip.route?.origin || trip.origin || 'Unknown'} to ${trip.route?.destination || trip.destination || 'Unknown'}`,
  //       price: parseFloat(trip.fare || '0'),
  //       image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
  //       destination: trip.route?.destination || trip.destination || 'Unknown',
  //       duration: 'N/A',
  //       departureDate: trip.trip_date,
  //       departureTime: trip.departure_time,
  //       availableSeats: trip.available_seats || 0,
  //       busType: trip.bus_type || 'Standard',
  //       amenities: ['WiFi', 'AC', 'USB Charging'],
  //       rating: 4.8,
  //       reviews: 124
  //     }));
  //   }

  //   return [];
  // }, [tripsResponse]);

  const trips = useMemo(() => {
    if (!tripsResponse?.data?.trips) return [];

    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tripsResponse.data.trips
        .filter((trip: any) => {
            // Only include trips scheduled for today or future dates
            const tripDate = new Date(trip.trip_date);
            return tripDate >= today;
        })
        .map((trip: any) => ({
            id: trip.id,
            title: `${trip.route?.origin || 'Unknown'} to ${trip.route?.destination || 'Unknown'}`,
            description: `Journey from ${trip.route?.origin || ''} to ${trip.route?.destination || ''}`,
            price: parseFloat(trip.fare || '0'),
            image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
            destination: trip.route?.destination || 'Unknown',
            duration: trip.route?.duration_minutes 
                ? `${Math.floor(trip.route.duration_minutes / 60)}h ${trip.route.duration_minutes % 60}m` 
                : 'N/A',
            departureDate: trip.trip_date,
            departureTime: trip.departure_time,
            availableSeats: trip.available_seats || 0,
            busType: trip.bus?.bus_type?.name || 'Standard',
            amenities: ['WiFi', 'AC', 'USB Charging'],
            rating: 4.8,
            reviews: 124
        }));
  }, [tripsResponse]);

console.log("trips",trips);


  const filteredAndSortedTrips = useMemo(() => {
    let result = [...trips];

    // Sort trips
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'date-soon':
        result.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());
        break;
      case 'date-later':
        result.sort((a, b) => new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime());
        break;
      default:
        break;
    }

    return result;
  }, [trips, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0f2fe]">
      <div className="relative py-20 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Explore Our Trips</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover amazing destinations and create unforgettable memories
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          {/* Route Search Component */}
          <RouteSearch
            onSearch={setSearchFilters}
            className="mb-8"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Found {filteredAndSortedTrips.length} {filteredAndSortedTrips.length === 1 ? 'trip' : 'trips'}
              </p>
              {(searchFilters.origin || searchFilters.destination || searchFilters.date) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchFilters({})}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  Clear filters
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[200px] h-12 bg-white">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Order</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="date-soon">Date: Soonest First</SelectItem>
                  <SelectItem value="date-later">Date: Latest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Error State */}
        {isError && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load trips. Please try again later.
              {error instanceof Error && (
                <p className="mt-2 text-sm">{error.message}</p>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : filteredAndSortedTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedTrips.map((trip, index) => (
              <TripCard key={trip.id} trip={trip} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-[#475569]">
              {(searchFilters.origin || searchFilters.destination || searchFilters.date)
                ? 'No trips found matching your search criteria.'
                : 'No trips available at the moment.'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}