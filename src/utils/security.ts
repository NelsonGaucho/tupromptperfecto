
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML string to prevent XSS attacks
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
};

/**
 * Sanitize user input to prevent XSS and injection attacks
 */
export const sanitizeInput = (input: string): string => {
  // Trim and sanitize the input
  return DOMPurify.sanitize(input.trim());
};

/**
 * Enforce HTTPS by redirecting HTTP requests
 * Call this function early in your application startup
 */
export const enforceHttps = (): void => {
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'http:' &&
    window.location.hostname !== 'localhost' &&
    !window.location.hostname.includes('127.0.0.1')
  ) {
    window.location.href = window.location.href.replace('http:', 'https:');
  }
};

/**
 * Set secure HTTP headers for protection
 */
export const setSecurityHeaders = (): void => {
  // These would normally be set on the server side, but for client-side
  // we can use meta tags to achieve some of the same effects
  const metaTags = [
    {
      httpEquiv: 'Content-Security-Policy',
      content: "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';"
    },
    {
      httpEquiv: 'X-Content-Type-Options',
      content: 'nosniff'
    },
    {
      httpEquiv: 'X-Frame-Options',
      content: 'DENY'
    },
    {
      name: 'referrer',
      content: 'strict-origin-when-cross-origin'
    }
  ];

  metaTags.forEach(tag => {
    const meta = document.createElement('meta');
    Object.entries(tag).forEach(([key, value]) => {
      meta.setAttribute(key, value);
    });
    document.head.appendChild(meta);
  });
};

/**
 * Generate a random string for use as a nonce
 */
export const generateNonce = (length: number = 16): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  randomValues.forEach(val => {
    result += chars.charAt(val % chars.length);
  });
  return result;
};

/**
 * Setup all security measures
 * Call this function early in your application startup
 */
export const setupSecurity = (): void => {
  // Enforce HTTPS
  enforceHttps();
  
  // Set security headers
  setSecurityHeaders();
};
