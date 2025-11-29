import { z } from 'zod';

// Phone number regex - supports various formats
const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

export const bookingFormSchema = z.object({
    customerName: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

    customerEmail: z
        .string()
        .email('Please enter a valid email address')
        .min(5, 'Email is required')
        .max(100, 'Email must be less than 100 characters'),

    customerPhone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(20, 'Phone number is too long')
        .regex(phoneRegex, 'Please enter a valid phone number'),

    numberOfPassengers: z
        .number()
        .int('Number of passengers must be a whole number')
        .positive('At least 1 passenger required')
        .min(1, 'At least 1 passenger required')
        .max(50, 'Maximum 50 passengers allowed'),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
