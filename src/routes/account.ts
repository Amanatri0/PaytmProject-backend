import { Router } from "express";
import { Request, Response } from "express";
import { userMiddleware } from "../middleware/user";

const accountRouter = Router();

accountRouter.get("/user", userMiddleware, (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    res.status(402).send({
      message: "User not correct",
    });
  }
});

export { accountRouter };
