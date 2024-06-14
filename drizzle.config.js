/*/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:GVcrfy0mjN3Q@ep-round-bread-a5hv9l3v.us-east-2.aws.neon.tech/ai-mock-interviewer?sslmode=require',
  }
};
