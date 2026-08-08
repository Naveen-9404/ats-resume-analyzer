import cors from "cors";
import env from "./env.js";

const allowedOrigins = [
  env.clientUrl,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header
    // (Postman, curl, server-to-server requests, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // Exact allowed origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow Vercel deployments belonging to this project
    if (
      /^https:\/\/ats-resume-analyzer(?:-[a-z0-9]+)*\.vercel\.app$/i.test(
        origin
      )
    ) {
      return callback(null, true);
    }

    console.error("CORS blocked origin:", origin);

    return callback(
      new Error(`CORS policy: Origin not allowed - ${origin}`)
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  optionsSuccessStatus: 204,
};

export default cors(corsOptions);