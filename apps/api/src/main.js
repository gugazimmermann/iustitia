import * as express from "express";
import * as cors from "cors";
import db from "./app/db";
import authRoute from "./app/routes/auth";
import userRoute from "./app/routes/user";

const app = express();
app.use(cors({ origin: process.env.NX_APP_SITE }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db.sequelize.sync();
db.sequelize.sync({ force: true });

app.get("/api", (req, res) => res.send({ message: "Welcome to api!" }));

authRoute(app);
userRoute(app);

const port = process.env.NX_API_PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on("error", console.error);
