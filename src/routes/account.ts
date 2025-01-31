import { Router } from "express";
import { Request, Response } from "express";
import { userMiddleware } from "../middleware/user";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const accountRouter = Router();

accountRouter.get(
  "/user",
  userMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;

    console.log(user);

    if (!user) {
      res.status(402).send({
        message: "User not correct", // check if the token is correct or now
      });
    }

    try {
      // fetch the user details from the database and check if the user exists
      const userEmail = await client.user.findFirst({
        where: {
          email: user,
        },
      });

      if (!userEmail) throw new Error("User not present");

      // if the user exists check the userid in the accounts table and fetch the account balance and user details
      const accountsUserId = await client.account.findFirst({
        where: {
          userId: userEmail.id,
        },
        select: {
          user: {
            select: {
              email: true,
              username: true,
              account: true,
            },
          },
        },
      });

      res.json({
        accountDetails: accountsUserId,
      });
    } catch (error) {
      res.status(500).send({
        message: "Cannot Get user account details",
        error: (error as Error).message,
      });
    }
  }
);

export { accountRouter };
