declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}
import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

function userMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization as unknown as string;

  try {
    if (!token) {
      res.status(403).send({
        message: "Token not correct, please verify the token",
      });
      return;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // console.log(decodedToken);

    if (decodedToken) {
      req.user = decodedToken.email;
      next();
      return;
    }
  } catch (error) {
    res.status(404).send({
      message: "Cannot passthrough user middleware",
      error: (error as Error).message,
    });
  }
}

export { userMiddleware };
