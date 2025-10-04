import { NextRequest, NextResponse } from 'next/server';
import {
  sanitizeInput,
  sanitizeEmail,
  isValidEmail,
  isValidUrl,
  checkRateLimit,
  getClientIP,
  securityErrorResponse,
  rateLimitErrorResponse,
  authRateLimiter,
} from '@/libs/security';

// Schema validation types
interface CreateUserSchema {
  email: string;
  name: string;
  website?: string;
}

interface ContactFormSchema {
  email: string;
  message: string;
  subject: string;
}

// Validation functions
function validateCreateUser(data: any): { valid: boolean; errors: string[]; sanitized?: CreateUserSchema } {
  const errors: string[] = [];

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Invalid email address');
  }

  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (data.website && !isValidUrl(data.website)) {
    errors.push('Invalid website URL');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    sanitized: {
      email: sanitizeEmail(data.email),
      name: sanitizeInput(data.name),
      website: data.website ? sanitizeInput(data.website) : undefined,
    },
  };
}

function validateContactForm(data: any): { valid: boolean; errors: string[]; sanitized?: ContactFormSchema } {
  const errors: string[] = [];

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Invalid email address');
  }

  if (!data.subject || data.subject.length < 3) {
    errors.push('Subject must be at least 3 characters');
  }

  if (!data.message || data.message.length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  if (data.message && data.message.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    sanitized: {
      email: sanitizeEmail(data.email),
      subject: sanitizeInput(data.subject),
      message: sanitizeInput(data.message),
    },
  };
}

// Example endpoint: Create user with validation
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request.headers);
    const rateLimit = await checkRateLimit(ip, authRateLimiter);

    if (!rateLimit.success) {
      return rateLimitErrorResponse();
    }

    // Parse request body
    const body = await request.json();

    // Determine validation based on endpoint or body type
    const validationType = body.type || 'user';

    let validation;
    if (validationType === 'contact') {
      validation = validateContactForm(body);
    } else {
      validation = validateCreateUser(body);
    }

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.errors,
        },
        {
          status: 400,
          headers: rateLimit.headers,
        }
      );
    }

    // Process sanitized data
    const sanitizedData = validation.sanitized;

    // Your business logic here
    // Example: Save to database, send email, etc.

    return NextResponse.json(
      {
        success: true,
        message: 'Data validated and processed successfully',
        data: sanitizedData,
      },
      {
        status: 200,
        headers: rateLimit.headers,
      }
    );

  } catch (error) {
    console.error('Validation endpoint error:', error);
    return securityErrorResponse('Internal server error', 500);
  }
}

// Example: GET endpoint with different rate limit
export async function GET(request: NextRequest) {
  try {
    // Less strict rate limiting for GET requests
    const ip = getClientIP(request.headers);
    const rateLimit = await checkRateLimit(ip);

    if (!rateLimit.success) {
      return rateLimitErrorResponse();
    }

    // Example validation schema documentation
    const schemas = {
      createUser: {
        required: ['email', 'name'],
        optional: ['website'],
        rules: {
          email: 'Valid email format',
          name: 'Minimum 2 characters',
          website: 'Valid URL format (if provided)',
        },
      },
      contactForm: {
        required: ['email', 'subject', 'message'],
        rules: {
          email: 'Valid email format',
          subject: 'Minimum 3 characters',
          message: '10-1000 characters',
        },
      },
    };

    return NextResponse.json(
      {
        schemas,
        examples: {
          createUser: {
            email: 'user@example.com',
            name: 'John Doe',
            website: 'https://example.com',
          },
          contactForm: {
            email: 'contact@example.com',
            subject: 'Question about service',
            message: 'I would like to know more about...',
          },
        },
      },
      {
        headers: rateLimit.headers,
      }
    );

  } catch (error) {
    console.error('Validation endpoint error:', error);
    return securityErrorResponse('Internal server error', 500);
  }
}
