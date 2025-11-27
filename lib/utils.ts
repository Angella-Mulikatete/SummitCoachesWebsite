// import { clsx, type ClassValue } from 'clsx'
// import { twMerge } from 'tailwind-merge'

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


// src/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency (UGX)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date
 */
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'long') {
    return new Intl.DateTimeFormat('en-UG', {
      dateStyle: 'full',
    }).format(d);
  }
  
  return new Intl.DateTimeFormat('en-UG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

/**
 * Format time (12-hour format)
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Calculate duration between two times
 */
export function calculateDuration(startTime: string, endTime: string): string {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;
  
  const durationMinutes = endTotalMinutes - startTotalMinutes;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
}

/**
 * Generate booking reference
 */
export function generateBookingReference(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `SUM-${timestamp}-${random}`.toUpperCase();
}

/**
 * Validate phone number (Uganda format)
 */
export function validatePhoneNumber(phone: string): boolean {
  // Uganda phone numbers: 07XX XXX XXX or +256 7XX XXX XXX
  const regex = /^(\+256|0)?7\d{8}$/;
  return regex.test(phone.replace(/\s/g, ''));
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('256')) {
    return `+${cleaned}`;
  }
  
  if (cleaned.startsWith('0')) {
    return `+256${cleaned.substring(1)}`;
  }
  
  return `+256${cleaned}`;
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Get seat status color
 */
export function getSeatStatusColor(isAvailable: boolean, isSelected: boolean): string {
  if (isSelected) return 'bg-primary text-white shadow-lg shadow-primary/30';
  if (!isAvailable) return 'bg-slate-200 text-slate-400 cursor-not-allowed';
  return 'bg-white border border-slate-300 text-secondary hover:border-primary';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Sleep/delay function
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if date is today
 */
export function isToday(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}

/**
 * Get minimum booking date (today)
 */
export function getMinBookingDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get maximum booking date (3 months from today)
 */
export function getMaxBookingDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  return date.toISOString().split('T')[0];
}

/**
 * Parse API date to local date
 */
export function parseApiDate(apiDate: string): Date {
  return new Date(apiDate);
}

/**
 * Format date for API
 */
export function formatDateForApi(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Calculate seat price with modifier
 */
export function calculateSeatPrice(baseFare: number, priceModifier?: number): number {
  if (!priceModifier) return baseFare;
  return baseFare + (baseFare * priceModifier / 100);
}

/**
 * Get trip status badge color
 */
export function getTripStatusColor(status: string): string {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'in_progress':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-slate-100 text-slate-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
}

/**
 * Get booking status badge color
 */
export function getBookingStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}