import cors from "cors";
import env from "./env.js";

const allowedOrigins = [
  env.clientUrl,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const isAllowed =
      allowedOrigins.includes(origin) ||
      /^https:\/\/ats-resume-analyzer-gg6v-[a-z0-9]+\.vercel\.app$/i.test(
        origin
      );

    if (isAllowed) {
      return callback(null, true);
    }

    console.error("CORS blocked origin:", origin);
    return callback(new Error("CORS policy: Origin not allowed"));
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