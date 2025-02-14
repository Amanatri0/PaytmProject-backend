declare global {
  namespace Express {
    interface Request {
      user?: string;
      userAccountId?: number;
    }
  }
}

import { NextFunction, Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

async function userAccountMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization as unknown as string;

    if (!token) {
      res.status(403).send({
        message: "Token not correct, please verify the token",
      });
      return;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (typeof decodedToken == "string") {
      res.status(401).send({
        message: "Token not valid",
      });
      return;
    }

    const user = decodedToken.email;

    const users = user; // users email from the token has been extracted here

    const usersEmail = await client.user.findFirst({
      where: {
        email: users,
      },
    });

    if (!usersEmail) {
      return next(new Error("User email is not present in the database"));
    }

    // find the userId in the Accounts table
    const userAccountDetails = await client.account.findFirst({
      where: {
        userId: usersEmail.id,
      },
    });

    // send the Account Id that is associated with the User Id
    req.userAccountId = userAccountDetails?.id;
    next();
  } catch (error) {
    res.status(403).send({
      message:
        "User account middleware unable to fetch the user accounts details",
      error: (error as Error).message,
    });
  }
}

export { userAccountMiddleware };
