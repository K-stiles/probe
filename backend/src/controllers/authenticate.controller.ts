import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { loginSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { loginUserService } from "../services/authenticate.service";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";

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
        httpOnly: true,
        secure: config.NODE_ENV !== "development",
        sameSite: "lax",
      })
      .status(HTTPSTATUS.OK)
      .json({
        message: "Logged in successfully",
        user,
      });
  }
);
