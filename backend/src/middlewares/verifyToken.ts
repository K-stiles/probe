import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/appError";
import { config } from "../config/app.config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) {
    throw new UnauthorizedException("Unauthorized. Please log in.");
  }

  jwt.verify(token, config.JWT_SECRET, (err: unknown, decoded: any) => {
    if (err)
      throw new UnauthorizedException(
        "Invalid or expired token. Please log in again."
      );
    req.user = decoded;
    next();
  });
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user && req.user._id) {
      next();
    } else {
      throw new UnauthorizedException("You are not authorized!");
    }
  });
};

// export const verifyAdmin = (req: Request, res:Response, next:NextFunction)  => {
//   verifyToken(req, res, next, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized!"));
//     }
//   });
// };
