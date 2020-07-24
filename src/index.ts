import bodyParser from "body-parser";
import express from "express";
import { userRouter } from "./router/userRouter";
import { checkDB } from "./models/user";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);

app.listen(port, checkDB);
