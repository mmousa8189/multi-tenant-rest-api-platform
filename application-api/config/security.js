const crypto = require('crypto');

class SecurityConfig {
  // Generate a secure random API key
  static generateApiKey(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  // Hash sensitive information
  static hashData(data, salt = null) {
    const algorithm = 'sha256';
    
    if (!salt) {
      salt = crypto.randomBytes(16).toString('hex');
    }

    const hash = crypto.pbkdf2Sync(
      data, 
      salt, 
      1000,  // iterations
      64,    // key length
      algorithm
    ).toString('hex');

    return { salt, hash };
  }

  // Validate and sanitize input
  static sanitizeInput(input, type = 'string') {
    if (input === null || input === undefined) {
      return null;
    }

    switch(type) {
      case 'email':
        // Basic email validation and sanitization
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input) ? input.trim().toLowerCase() : null;
      
      case 'string':
        // Remove any potentially harmful characters
        return input.toString().replace(/[<>]/g, '').trim();
      
      case 'number':
        // Ensure it's a valid number
        const num = Number(input);
        return isNaN(num) ? null : num;
      
      default:
        return input;
    }
  }

  // Check password strength
  static isPasswordStrong(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  }

  // Rate limit configuration
  static getRateLimitConfig() {
    return {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: process.env.API_RATE_LIMIT || 100, // limit each IP to 100 requests per windowMs
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    };
  }
}

module.exports = SecurityConfig;
