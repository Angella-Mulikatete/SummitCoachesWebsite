'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface TripCardData {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  destination: string;
  duration: string;
  departureDate: string;
  availableSeats: number;
}

interface TripCardProps {
  trip: TripCardData;
  index: number;
}

export default function TripCard({ trip, index }: TripCardProps) {
  const isLowAvailability = trip.availableSeats <= 5;
  const isSoldOut = trip.availableSeats === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
        <div className="relative h-64 overflow-hidden">
          <img
            src={trip.imageUrl}
            alt={trip.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-[#0ea5e9] font-bold text-lg">${trip.price}</span>
          </div>

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isSoldOut && (
              <Badge variant="destructive" className="font-semibold">
                Sold Out
              </Badge>
            )}
            {!isSoldOut && isLowAvailability && (
              <Badge variant="destructive" className="font-semibold">
                Only {trip.availableSeats} seats left!
              </Badge>
            )}
          </div>
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-2xl font-bold text-[#1e293b] group-hover:text-[#0ea5e9] transition-colors">
            {trip.title}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 space-y-4 pb-4">
          <p className="text-[#475569] line-clamp-2">
            {trip.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center text-[#475569]">
              <MapPin className="h-4 w-4 mr-2 text-[#0ea5e9] flex-shrink-0" />
              <span className="text-sm">{trip.destination}</span>
            </div>
            <div className="flex items-center text-[#475569]">
              <Clock className="h-4 w-4 mr-2 text-[#0ea5e9] flex-shrink-0" />
              <span className="text-sm">{trip.duration}</span>
            </div>
            <div className="flex items-center text-[#475569]">
              <Calendar className="h-4 w-4 mr-2 text-[#0ea5e9] flex-shrink-0" />
              <span className="text-sm">
                {new Date(trip.departureDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center text-[#475569]">
              <Users className="h-4 w-4 mr-2 text-[#0ea5e9] flex-shrink-0" />
              <span className="text-sm">{trip.availableSeats} seats available</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Link href={`/trips/${trip.id}`} className="w-full">
            <Button
              className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
              disabled={isSoldOut}
            >
              {isSoldOut ? 'Sold Out' : (
                <>
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
