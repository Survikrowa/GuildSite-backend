import bodyParser from "body-parser";
import express from "express";
import { router } from "./router/router";
import { checkDB } from "./models/user";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(port, checkDB);
