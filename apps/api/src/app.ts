import * as express from "express";
import * as morgan from 'morgan';
import * as cors from "cors";
import { database } from "@iustitia/api/database";
import { mercadopagoRoutes } from "@iustitia/api/mercadopago";

import { Auth } from "@iustitia/api/auth";
import { Subscriptions } from "@iustitia/api/subscriptions";
import { Profiles } from "@iustitia/api/profiles";
import { Members } from "@iustitia/api/members";
import { Dashboards } from "@iustitia/api/dashboards";
import { Places } from "@iustitia/api/places";
import { BusinessContacts } from "@iustitia/api/business-contacts";
import { Notes } from "@iustitia/api/notes";
import { Attachments } from "@iustitia/api/attachments";
import { Schedule } from "@iustitia/api/schedule";
import { Financial } from "@iustitia/api/financial";

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

mercadopagoRoutes(app);
Auth(app);
Subscriptions(app);
Profiles(app);
Members(app);
Dashboards(app);
Places(app);
BusinessContacts(app);
Notes(app);
Attachments(app);
Schedule(app);
Financial(app);

app.use((req, res) => res.status(404).send("Not Found!"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message)
});

export default app;
