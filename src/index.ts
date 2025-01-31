import express from "express";
import { userRouter } from "./routes/userRoute";
import { accountRouter } from "./routes/account";

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(3000);
