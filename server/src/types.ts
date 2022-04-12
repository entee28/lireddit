import { Request, Response } from "express";
import Redis from "ioredis";
import DataLoader from "dataloader";
import { User } from "./entities/User";
import { createUpdootLoader } from "./utils/createUpdootLoader";

export type MyContext = {
  req: Request;
  res: Response;
  redis: Redis.Redis;
  userLoader: DataLoader<number, User, number>;
  updootLoader: ReturnType<typeof createUpdootLoader>;
};
