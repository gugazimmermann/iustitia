import * as express from "express";
import * as cors from "cors";
import { database } from "@iustitia/api/database";
import { authRoutes } from "@iustitia/api/auth";
import { publicRoutes } from "@iustitia/api/public";

const app = express();
app.use(cors({ origin: process.env.NX_APP_SITE }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database.Sequelize.sync();
// database.Sequelize.sync({ force: true });

app.get("/api", (req, res) => res.send({ message: "Welcome to api!" }));

authRoutes(app);
publicRoutes(app);

export default app;