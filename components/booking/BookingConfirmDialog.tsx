'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Trip } from '@/lib/api';
import type { BookingFormData } from '@/lib/booking-schema';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';

interface BookingConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    trip: Trip;
    formData: BookingFormData;
    isLoading?: boolean;
}

export default function BookingConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    trip,
    formData,
    isLoading = false,
}: BookingConfirmDialogProps) {
    const totalPrice = trip.price * formData.numberOfPassengers;

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl">Confirm Your Booking</AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                        Please review your booking details before confirming.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-6 py-4">
                    {/* Trip Details */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            Trip Details
                        </h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-muted-foreground">Destination:</span>
                                <p className="font-medium">{trip.destination}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Duration:</span>
                                <p className="font-medium">{trip.duration}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-muted-foreground">Departure:</span>
                                <p className="font-medium">
                                    {new Date(trip.departureDate).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            Customer Details
                        </h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-muted-foreground">Name:</span>
                                <p className="font-medium">{formData.customerName}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Passengers:</span>
                                <p className="font-medium">
                                    {formData.numberOfPassengers} {formData.numberOfPassengers === 1 ? 'person' : 'people'}
                                </p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Email:</span>
                                <p className="font-medium truncate">{formData.customerEmail}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Phone:</span>
                                <p className="font-medium">{formData.customerPhone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-primary/10 rounded-lg p-4 space-y-2">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            Payment Summary
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Price per person:</span>
                                <span className="font-medium">${trip.price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Number of passengers:</span>
                                <span className="font-medium">{formData.numberOfPassengers}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between text-lg">
                                <span className="font-bold">Total Amount:</span>
                                <span className="font-bold text-primary">${totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Confirm Booking'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
