// TEMPORARY MOCK DB FOR LOCAL TESTING

// Commented out real imports
// import { Pool } from 'pg';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import * as schema from "@shared/schema";

// Use mock values to avoid crash
const fakeDb = {
  query: async () => {
    console.warn("⚠️ Fake DB query used.");
    return [];
  },
  // Add other mocks if needed
};

console.warn("🚫 Skipping real DB connection. Using mock DB for local dev.");

// Export fake DB
export const pool = null;
export const db = fakeDb;
