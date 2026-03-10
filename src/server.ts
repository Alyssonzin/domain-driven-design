import dotenv from "dotenv";
dotenv.config();
import { EnvSchema } from "./EnvSchema";
import express from "express";
import UserController from "./infra/controller/userController";
export const ENV = EnvSchema.parse(process.env);
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user", (req, res) => UserController.createUser(req, res));
app.get("/user/:id", (req, res) => UserController.getUserById(req, res));

app.listen(ENV.PORT, () => {
  console.log("Server is running on port " + ENV.PORT);
});