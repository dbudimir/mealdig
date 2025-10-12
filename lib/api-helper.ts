/**
 * Helper function to get the base URL for API calls in getServerSideProps
 * In development, uses localhost. In production, uses the actual domain.
 */
export function getBaseUrl(): string {
  // Check if we're on the server
  if (typeof window === 'undefined') {
    // Server-side
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.NODE_ENV === 'production') {
      return 'https://mealdig.com';
    }
    return 'http://localhost:4000';
  }
  // Client-side - use relative URL
  return '';
}
