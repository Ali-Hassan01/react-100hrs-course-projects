import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import dotnev from "dotenv";

dotnev.config();

//    rate limiting 10 per 20 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export default ratelimit;