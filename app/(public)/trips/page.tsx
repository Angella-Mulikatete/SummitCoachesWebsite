'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import TripCard from '@/components/trips/TripCard';
import { tripApi, type Trip } from '@/lib/api';
import { Search, Loader2, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

type SortOption = 'default' | 'price-low' | 'price-high' | 'date-soon' | 'date-later';

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const data = await tripApi.getTrips();
      setTrips(data);
    } catch (error) {
      console.error('Failed to load trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedTrips = useMemo(() => {
    let result = [...trips];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (trip) =>
          trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trip.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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
        // Keep default order
        break;
    }

    return result;
  }, [trips, searchTerm, sortBy]);

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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search trips by title, destination, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[200px] h-12">
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

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Found {filteredAndSortedTrips.length} {filteredAndSortedTrips.length === 1 ? 'trip' : 'trips'}
            </p>
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </Button>
            )}
          </div>
        </motion.div>

        {loading ? (
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
              {searchTerm ? 'No trips found matching your search.' : 'No trips available at the moment.'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
