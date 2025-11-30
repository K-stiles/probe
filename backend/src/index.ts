import express, { Request, Response } from "express";
import cors from "cors";
import session from "cookie-session";
import passport from "passport";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./config/passport.config";

import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import workspaceRoutes from "./routes/workspace.route";
import memberRoutes from "./routes/member.route";
import projectRoutes from "./routes/project.route";
import taskRoutes from "./routes/task.route";
import { logger } from "./lib/winston";
import limiter from "./utils/express-rate-limit";
// import { BadRequestException } from "./utils/appError";
// import { ErrorCodeEnum } from "./enums/error-code.enum";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({ threshold: 1024 }));
app.use(cookieParser());
app.use(helmet());
app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(limiter);
app.get(
  `/`,
  asyncHandler(async (_req: Request, res: Response) => {
    return res.status(HTTPSTATUS.OK).json({
      message: "👽 Probe API is running...",
      status: HTTPSTATUS.OK,
      version: "1.0.0",
      documentation: "https://github.com/Probe-AI/probe-api",
      timestamp: new Date().toISOString(),
    });
  })
);
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes);
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes);
app.use(`${BASE_PATH}/project`, isAuthenticated, projectRoutes);
app.use(`${BASE_PATH}/task`, isAuthenticated, taskRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  logger.info(`http://localhost:${config.PORT}${BASE_PATH}`);
  logger.info(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
