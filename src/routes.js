import { Router } from "express";
import { executeDB } from "./utils/pgConnection.js";
import loginRequired from "./middlewares/loginRequired.js";
import jwt from "jsonwebtoken";

import UserController from "./controllers/UserController.js";

const userController = new UserController();

const routes = Router();

// USER ROUTES
routes.get("/", userController.index);
routes.get("/users", loginRequired, userController.showAll);
routes.get("/user/:id", loginRequired, userController.show);
routes.post("/user", userController.create);
routes.post("/login", userController.login);
routes.post("/logout", userController.logout);

export default routes;
