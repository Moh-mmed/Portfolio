// Simple in-memory rate limiter using Map.
// Stores an array of timestamps for each IP.
// Limits to 3 requests per hour.

const rateLimitStore = new Map<string, number[]>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfterMs?: number;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  
  // Cleanup old timestamps and get current
  const windowStart = now - WINDOW_MS;
  const timestamps = (rateLimitStore.get(ip) || []).filter(time => time > windowStart);
  
  if (timestamps.length >= MAX_REQUESTS) {
    const oldestTimestamp = timestamps[0];
    const retryAfterMs = oldestTimestamp + WINDOW_MS - now;
    
    // Update store with cleaned up timestamps
    rateLimitStore.set(ip, timestamps);
    
    return {
      success: false,
      remaining: 0,
      retryAfterMs
    };
  }
  
  // Allow request and update store
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  
  return {
    success: true,
    remaining: MAX_REQUESTS - timestamps.length
  };
}

// Optional cleanup interval to prevent memory leak
// Runs every 1 hour to clear IPs with no recent activity
// Safe check for Next.js server environment
if (typeof setInterval !== 'undefined' && typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const windowStart = now - WINDOW_MS;
    
    for (const [ip, timestamps] of rateLimitStore.entries()) {
      const activeTimestamps = timestamps.filter(time => time > windowStart);
      if (activeTimestamps.length === 0) {
        rateLimitStore.delete(ip);
      } else {
        rateLimitStore.set(ip, activeTimestamps);
      }
    }
  }, WINDOW_MS);
}
