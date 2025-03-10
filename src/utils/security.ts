
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML string to prevent XSS attacks
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
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
      content: "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://pagead2.googlesyndication.com 'unsafe-inline'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://www.google-analytics.com https://www.googletagmanager.com data:; connect-src 'self' https://api.openai.com https://www.google-analytics.com; frame-src 'self' https://pagead2.googlesyndication.com;"
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
    },
    {
      httpEquiv: 'Strict-Transport-Security',
      content: 'max-age=31536000; includeSubDomains'
    },
    {
      httpEquiv: 'Permissions-Policy',
      content: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
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
 * Apply Cross-Origin Resource Sharing protections
 */
export const applyCorsProtection = (): void => {
  const corsMetaTag = document.createElement('meta');
  corsMetaTag.setAttribute('name', 'Access-Control-Allow-Origin');
  corsMetaTag.setAttribute('content', window.location.origin);
  document.head.appendChild(corsMetaTag);
};

/**
 * Enhance link security by adding noopener and noreferrer attributes to external links
 */
export const secureExternalLinks = (): void => {
  setTimeout(() => {
    const links = document.querySelectorAll('a[href^="http"]:not([rel])');
    links.forEach(link => {
      if (link instanceof HTMLAnchorElement) {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      }
    });
  }, 500);
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
  
  // Apply CORS protection
  applyCorsProtection();
  
  // Secure external links when DOM is ready
  document.addEventListener('DOMContentLoaded', secureExternalLinks);
  
  // Also run secureExternalLinks after a short delay to catch dynamically added links
  setTimeout(secureExternalLinks, 1000);
};
