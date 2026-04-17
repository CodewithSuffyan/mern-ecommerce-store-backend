import Redis from "ioredis";
import dotenv from "dotenv";

// .env file se data load karne ke liye
dotenv.config();

/**
 * Redis Connection Setup
 * Hum process.env.UPSTASH_REDIS_URL use kar rahe hain jo humne .env mein dala hai.
 * Agar ye URL nahi milega toh error aayega, isliye humne check bhi rakha hai.
 */
const redisUrl = process.env.UPSTASH_REDIS_URL;

if (!redisUrl) {
    console.error("REDIS_ERROR: UPSTASH_REDIS_URL is not defined in .env file");
}

export const redis = new Redis(redisUrl);

// Connection check karne ke liye console log (optional)
redis.on("connect", () => {
    console.log("Redis connected successfully to Upstash!");
});

redis.on("error", (err) => {
    console.error("Redis connection error:", err);
});