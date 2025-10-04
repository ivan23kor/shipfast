/**
 * Centralized Logging Utility
 *
 * Provides consistent logging across the application
 * - Console logging in development
 * - Error tracking helpers
 * - Event logging
 */

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

/**
 * Base logger function
 */
function log(
  level: LogLevel,
  message: string,
  data?: any
): void {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  if (!isDevelopment && level === LogLevel.DEBUG) {
    return; // Skip debug logs in production
  }

  switch (level) {
    case LogLevel.DEBUG:
      console.debug(prefix, message, data || "");
      break;
    case LogLevel.INFO:
      console.info(prefix, message, data || "");
      break;
    case LogLevel.WARN:
      console.warn(prefix, message, data || "");
      break;
    case LogLevel.ERROR:
      console.error(prefix, message, data || "");
      break;
  }
}

/**
 * Debug level logging (development only)
 */
export function debug(message: string, data?: any): void {
  log(LogLevel.DEBUG, message, data);
}

/**
 * Info level logging
 */
export function info(message: string, data?: any): void {
  log(LogLevel.INFO, message, data);
}

/**
 * Warning level logging
 */
export function warn(message: string, data?: any): void {
  log(LogLevel.WARN, message, data);
}

/**
 * Error level logging
 */
export function error(message: string, errorData?: any): void {
  log(LogLevel.ERROR, message, errorData);

  // In production, you might want to send errors to a service
  // Example: Sentry, LogRocket, etc.
  if (!isDevelopment) {
    // TODO: Send to error tracking service
    // Sentry.captureException(errorData);
  }
}

/**
 * Log API errors with context
 */
export function logApiError(
  endpoint: string,
  statusCode: number,
  errorMessage: string,
  details?: any
): void {
  error(`API Error at ${endpoint}`, {
    statusCode,
    errorMessage,
    details,
  });
}

/**
 * Log authentication events
 */
export function logAuth(
  action: "login" | "logout" | "signup" | "error",
  userId?: string,
  details?: any
): void {
  info(`Auth: ${action}`, {
    userId,
    details,
  });
}

/**
 * Log payment events
 */
export function logPayment(
  action: "started" | "completed" | "failed" | "refunded",
  amount?: number,
  details?: any
): void {
  info(`Payment: ${action}`, {
    amount,
    details,
  });
}

/**
 * Log user events
 */
export function logEvent(
  eventName: string,
  data?: Record<string, any>
): void {
  debug(`Event: ${eventName}`, data);
}

/**
 * Log performance metrics
 */
export function logPerformance(
  metric: string,
  value: number,
  unit: string = "ms"
): void {
  debug(`Performance: ${metric}`, { value, unit });
}

/**
 * Create a scoped logger for a specific module
 */
export function createLogger(scope: string) {
  return {
    debug: (message: string, data?: any) =>
      debug(`[${scope}] ${message}`, data),
    info: (message: string, data?: any) =>
      info(`[${scope}] ${message}`, data),
    warn: (message: string, data?: any) =>
      warn(`[${scope}] ${message}`, data),
    error: (message: string, data?: any) =>
      error(`[${scope}] ${message}`, data),
  };
}

export default {
  debug,
  info,
  warn,
  error,
  logApiError,
  logAuth,
  logPayment,
  logEvent,
  logPerformance,
  createLogger,
};
