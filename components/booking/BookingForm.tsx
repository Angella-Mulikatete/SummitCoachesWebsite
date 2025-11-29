'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { Trip, CreateBookingData } from '@/lib/api';
import { bookingFormSchema, type BookingFormData } from '@/lib/booking-schema';
import BookingConfirmDialog from './BookingConfirmDialog';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BookingFormProps {
  trip: Trip;
  onSubmit: (data: CreateBookingData) => Promise<void>;
}

export default function BookingForm({ trip, onSubmit }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      numberOfPassengers: 1,
    },
  });

  const numberOfPassengers = form.watch('numberOfPassengers');
  const totalPrice = trip.price * numberOfPassengers;

  const handleFormSubmit = (data: BookingFormData) => {
    setShowConfirmDialog(true);
  };

  const handleConfirmBooking = async () => {
    const formData = form.getValues();
    setLoading(true);
    setShowConfirmDialog(false);

    try {
      await onSubmit({
        tripId: trip.id,
        ...formData,
      });
      toast.success('Booking confirmed!', {
        description: 'You will be redirected to the confirmation page.',
      });
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('Booking failed', {
        description: 'Please try again or contact support.',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Complete Your Booking</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfPassengers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Passengers</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select passengers" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: Math.min(trip.availableSeats, 10) }, (_, i) => i + 1).map(
                        (num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Passenger' : 'Passengers'}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-[#e0f2fe] p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#475569]">Price per person:</span>
                <span className="font-semibold text-[#1e293b]">${trip.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#475569]">Number of passengers:</span>
                <span className="font-semibold text-[#1e293b]">{numberOfPassengers}</span>
              </div>
              <div className="border-t border-[#0ea5e9] pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#1e293b]">Total:</span>
                  <span className="text-2xl font-bold text-[#0ea5e9]">${totalPrice}</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] py-6 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Review Booking'
              )}
            </Button>

            <p className="text-xs text-[#475569] text-center">
              By booking, you agree to our terms and conditions
            </p>
          </form>
        </Form>
      </motion.div>

      <BookingConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmBooking}
        trip={trip}
        formData={form.getValues()}
        isLoading={loading}
      />
    </>
  );
}
