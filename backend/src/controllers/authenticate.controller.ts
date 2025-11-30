import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { loginSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { loginUserService } from "../services/authenticate.service";

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = loginSchema.parse(req.body);
    const user = await loginUserService(body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Logged in successfully",
      user,
    });
  }
);
