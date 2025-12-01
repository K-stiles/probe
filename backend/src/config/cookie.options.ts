import { config } from "./app.config";
import { CookieOptions } from "express";

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production", // secure: true required for SameSite=None
  sameSite: "none", // <-- critically REQUIRED for cross-site cookies
  // secure: config.NODE_ENV === "production",
  // sameSite: "none",
};
