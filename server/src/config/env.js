import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
  "OPENROUTER_API_KEY",
  "OPENROUTER_MODEL",
];

const missingEnv = requiredEnv.filter(
  (key) => !process.env[key]
);

if (missingEnv.length > 0) {
  console.error("❌ Missing Environment Variables:");

  missingEnv.forEach((key) =>
    console.error(`- ${key}`)
  );

  process.exit(1);
}

const env = Object.freeze({
  // Server
  port: Number(process.env.PORT),

  // Database
  mongoUri: process.env.MONGO_URI,

  // Authentication
  jwtSecret: process.env.JWT_SECRET,

  // OpenRouter AI
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterModel: process.env.OPENROUTER_MODEL,


  // Environment
  nodeEnv:
    process.env.NODE_ENV || "development",

  // Frontend URL
  clientUrl:
    process.env.CLIENT_URL ||
    "http://localhost:5173",
});

export default env;