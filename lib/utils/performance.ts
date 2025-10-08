// Performance optimization utilities

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Lazy load images
export function lazyLoadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = reject
    img.src = src
  })
}

// Format currency for Uganda
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    minimumFractionDigits: 0,
  }).format(amount)
}

// Optimize images for web
export function getOptimizedImageUrl(url: string, width?: number, quality?: number): string {
  if (!url) return ""

  // If using Next.js Image Optimization
  const params = new URLSearchParams()
  if (width) params.append("w", width.toString())
  if (quality) params.append("q", quality.toString())

  return `${url}?${params.toString()}`
}

// Cache management
export class CacheManager {
  private cache: Map<string, { data: any; timestamp: number }>

  constructor() {
    this.cache = new Map()
  }

  set(key: string, data: any, ttl = 300000) {
    // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.timestamp) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear() {
    this.cache.clear()
  }
}

export const cache = new CacheManager()
