import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { loginSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { loginUserService } from "../services/authenticate.service";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";
import { COOKIE_OPTIONS } from "../config/cookie.options";

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = loginSchema.parse(req.body);
    const user = await loginUserService(body);

    const access_token = jwt.sign(
      { _id: user._id, email: user.email },
      config.JWT_SECRET
    );

    return res
      .cookie("access_token", access_token, {
        ...COOKIE_OPTIONS
        // httpOnly: true,
        // secure: config.NODE_ENV === "production", // secure: true required for SameSite=None
        // sameSite: "none", // <-- critically REQUIRED for cross-site cookies
      })
      .status(HTTPSTATUS.OK)
      .json({
        message: "Logged in successfully",
        user,
      });
  }
);
