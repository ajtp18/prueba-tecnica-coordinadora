// app.js
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import cors from "cors";
import eventRouter from "./routes/eventRoutes.ts";
// import registerRouter from "./routes/auth/registerRouter.js";
// import loginRouter from "./routes/auth/loginRouter.js";

dotenv.config();

const app = express();

// Conexión a la base de datos
createConnection()
  .then(() => {
    console.log("Conexión a la base de datos establecida");
  })
  .catch(error => {
    console.error("Error al conectar a la base de datos:", error);
  });

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas de eventos
app.use("/events", eventRouter);

// Rutas de autenticación
// app.use("/register", registerRouter);
// app.use("/login", loginRouter);

export default app;
