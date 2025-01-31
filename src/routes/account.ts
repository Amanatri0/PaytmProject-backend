import { Router } from "express";
import { Request, Response } from "express";
import { userMiddleware } from "../middleware/user";
import { PrismaClient } from "@prisma/client";
import { userAccountMiddleware } from "../middleware/accountOfUser";

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
            },
          },
          balance: true,
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

accountRouter.post(
  "/transfer",
  userAccountMiddleware,
  async (req: Request, res: Response) => {
    const userAccountId = req.userAccountId;
    const amount = parseInt(req.body.amount);
    const to = parseInt(req.body.to);

    const account = await client.account.findFirst({
      where: {
        id: userAccountId,
      },
    });

    if (!account || (account?.balance as number) < amount) {
      res.status(401).send({
        message: "Account Balance mot suffecient",
      });
    }

    const toAccount = await client.account.findFirst({
      where: {
        userId: to,
      },
    });

    if (!toAccount) {
      res.status(403).send({
        message: "Invalid account, account doesn't exists",
      });
    }

    try {
      await client.$transaction(async (txclient) => {
        await txclient.account.update({
          where: {
            id: userAccountId,
          },
          data: {
            balance: {
              decrement: amount,
            },
          },
        });

        await txclient.account.update({
          where: {
            userId: to,
          },
          data: {
            balance: {
              increment: amount,
            },
          },
        });
      });

      res.json({
        message: "Transaction successfull",
      });
    } catch (error) {
      res.status(500).send({
        message: "Unable to process the transaction",
        error: (error as Error).message,
      });
    }
  }
);

export { accountRouter };
