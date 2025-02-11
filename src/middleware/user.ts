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
  const token = req.headers["authorization"];

  try {
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

    req.user = decodedToken.email;
    next();
  } catch (error) {
    res.status(404).send({
      message: "Cannot passthrough user middleware",
      error: (error as Error).message,
    });
  }
}

export { userMiddleware };
