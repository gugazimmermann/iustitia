import * as express from "express";
import * as morgan from 'morgan';
import * as cors from "cors";
import { database } from "@iustitia/api/database";
import { authRoutes } from "@iustitia/api/auth";
import { publicRoutes } from "@iustitia/api/public";
import { dashboardRoutes } from "@iustitia/api/dashboard";

const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: process.env.NX_APP_SITE }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database.Sequelize.sync();
// database.Sequelize.sync({ force: true });

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

publicRoutes(app);
authRoutes(app);
dashboardRoutes(app);

app.use((req, res) => res.status(404).send("Not Found!"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message)
});

export default app;
