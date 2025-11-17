import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 60, // limit each IP to 60 requests per windowMs(1 minute)
  standardHeaders: "draft-8", // use latest standard for rate limit headers
  legacyHeaders: false, // Disable the depricated  `X-RateLimit-*` headers
  message: {
    error:
      "You have sent too many requests in a short period of time. Please try again later.",
  },
});

export default limiter;
