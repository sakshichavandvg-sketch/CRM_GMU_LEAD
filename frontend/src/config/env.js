/**
 * Centralized environment configuration module.
 * Instead of reading process.env scattered throughout the application,
 * import from this module.
 */

export const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  
  // Frontend Development Mode configuration
  FRONTEND_ONLY: process.env.NEXT_PUBLIC_FRONTEND_ONLY === "true",
  
  // Supported scenarios: success, unauthorized, forbidden, validation, server-error
  MOCK_SCENARIO: process.env.NEXT_PUBLIC_MOCK_SCENARIO || "success",
};
