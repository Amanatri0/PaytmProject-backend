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
    return;
  }

  const { username, email, password } = req.body;

  const hashPassword = (await bcrypt.hash(password, 5)) as unknown as string;

  if (!hashPassword) {
    res.json({
      message: "User password not correct",
    });
    return;
  }
  try {
    const existingUser = await client.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      res.status(303).send({
        message: "User already exists",
      });
      return;
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
        balance: 10 + Math.random() * 10000,
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
      res.status(403).send({
        message: "User is not registered",
      });
      return;
    }

    const decodedPassword = await bcrypt.compare(
      password,
      user?.password as string
    );

    if (!decodedPassword) {
      res.status(403).send({
        message: "User password not correct",
      });
      return;
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

userRouter.put(
  "/update",
  userMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;
    const { email, username, oldPassword, newPassword } = req.body;

    try {
      const userEmail = await client.user.findFirst({
        where: {
          email: user,
        },
      });

      if (!userEmail) {
        res.status(403).send({
          message: "User is not registered",
        });
        return;
      }

      const verifiedPassword = await bcrypt.compare(
        oldPassword,
        userEmail?.password as string
      );

      if (!verifiedPassword) {
        res.status(500).send({
          message: "Password didn't match, please provide the correct password",
        });
        return;
      }
      const hashPassword = await bcrypt.hash(newPassword, 5);

      await client.user.update({
        where: {
          email: userEmail.email,
        },
        data: {
          email: email,
          username: username,
          password: hashPassword,
        },
      });

      res.json({
        message: "User updated",
      });
    } catch (error) {
      res.status(404).send({
        message: "User details was unable to update",
        error: (error as Error).message,
      });
    }
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

      if (!userDetails) {
        res.status(403).send({
          message: "User cannot be found in the database",
        });
        return;
      }

      const accountDetails = await client.account.delete({
        where: {
          userId: userDetails.id,
        },
      });

      if (!accountDetails) {
        res.status(403).send({
          message: "Account cannot be found in the database",
        });
        return;
      }

      const deletedUser = await client.user.delete({
        where: {
          email: userDetails.email,
        },
        omit: {
          password: true,
        },
      });
      console.log("Reached here");
      console.log(deletedUser);

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

userRouter.get(
  "/details",
  userMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;

    try {
      if (!user) {
        res.status(403).send({
          message: "User not found",
        });
        return;
      }

      const userDetails = await client.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          account: {
            select: {
              balance: true,
            },
          },
        },
        where: {
          email: { not: user },
        },
      });

      res.json({
        userDetails,
      });
    } catch (error) {
      res.status(403).send({
        message: "Cannot find User details",
        error: (error as Error).message,
      });
    }
  }
);

userRouter.get(
  "/currect/user",
  userMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;

    try {
      if (!user) {
        res.status(403).send({
          message: "User not found",
        });
        return;
      }

      const userDetails = await client.user.findFirst({
        where: {
          email: user,
        },
        select: {
          username: true,
          email: true,
          id: true,
          account: {
            select: {
              balance: true,
            },
          },
        },
      });

      res.json({
        userDetails,
      });
    } catch (error) {
      res.status(403).send({
        message: "Something went wrong while fetching user",
        error: (error as Error).message,
      });
    }
  }
);
export { userRouter };
