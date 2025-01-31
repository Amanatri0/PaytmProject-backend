import { Router } from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { userMiddleware } from "../middleware/user";
import { z } from "zod";

const client = new PrismaClient();
const userRouter = Router();

const userSignupValidation = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

userRouter.post("/signup", async (req: Request, res: Response) => {
  const success = userSignupValidation.safeParse(req.body);

  if (!success) {
    res.status(401).send({
      message: "User credentials incorrect",
    });
  }

  const { username, email, password } = req.body;

  const hashPassword = (await bcrypt.hash(password, 5)) as unknown as string;

  if (!hashPassword) {
    res.json({
      message: "User password not correct",
    });
  }
  try {
    const existingUser = await client.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      res.json({
        message: "User already exists",
      });
    }

    const user = await client.user.create({
      data: {
        email: email,
        username: username,
        password: hashPassword,
      },
    });

    await client.account.create({
      data: {
        balance: 1 + Math.random() * 10000,
        userId: user.id,
      },
    });

    res.json({
      message: "User signup successfull",
    });
  } catch (error) {
    res.status(404).send({
      message: "Unable to signup user, wrong credentials",
      error: (error as Error).message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await client.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.json({
        message: "User is not registered",
      });
    }

    const decodedPassword = await bcrypt.compare(
      password,
      user?.password as string
    );

    if (!decodedPassword) {
      res.json({
        message: "User password not correct",
      });
    }

    const token = jwt.sign({ email: user?.email }, JWT_SECRET);

    res.json({
      token: token,
    });
  } catch (error) {
    res.status(404).send({
      message: "Unable to signup user, wrong credentials",
      error: (error as Error).message,
    });
  }
});

userRouter.get(
  "/user/details",
  userMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;

    const userDetails = await client.user.findFirst({
      where: {
        email: user,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!userDetails) {
      throw new Error(" User not found ");
    }

    res.json({
      userDetails,
    });
  }
);

userRouter.put(
  "/update",
  userMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;
    const { email, username, password } = req.body;

    const userEmail = await client.user.findFirst({
      where: {
        email: user,
      },
    });

    console.log(userEmail);

    if (!userEmail) {
      throw new Error();
    }

    await client.user.update({
      where: {
        email: userEmail.email,
      },
      data: {
        email: email,
        username: username,
        password: password,
      },
    });

    res.json({
      message: "User updated",
    });
  }
);

userRouter.delete(
  "/delete",
  userMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;

    try {
      const userDetails = await client.user.findFirst({
        where: {
          email: user,
        },
      });

      if (!userDetails) throw new Error();

      const deletedUser = await client.user.delete({
        where: {
          email: userDetails.email,
        },
      });

      res.json({
        message: "User deleted successfull",
        details: deletedUser,
      });
    } catch (error) {
      res.status(403).send({
        message: "User deletion not successfull",
        error: (error as Error).message,
      });
    }
  }
);

export { userRouter };
