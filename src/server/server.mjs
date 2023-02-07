import dotenv from "dotenv";
import chalk from "chalk";
import express from "express";
import cors from "cors";
import { logger, loggerNoTimestamp, logMiddleware } from "../logging/index.mjs";
import { db } from "../db/index.mjs";

// Express REST API
export const expressRestApi = () => {
  // Log starting server info
  loggerNoTimestamp
    .info(chalk.rgb(152, 251, 152).bold("  Starting server..."))
    .info(
      "  The following REST API calls are available by default, edit as needed:"
    );

  // Exress default routes
  const expressDefaultRoutes = {
    GET_ROOT: "[GET] /",
    GET_ITEM: "[GET] /items/:id",
    GET_ITEMS: "[GET] /items",
    POST: "[POST] /items",
    PUT_ITEM: "[PUT] /items/:id",
    DELETE_ITEM: "[DELETE] /items/:id"
  };

  Object.keys(expressDefaultRoutes).forEach((key) => {
    loggerNoTimestamp.info("  " + expressDefaultRoutes[key]);
  });

  // Config setup
  dotenv.config();
  const port = process.env.PORT || 1337;
  const host = process.env.HOST || "localhost";
  const app = express();

  // Express start Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(logMiddleware);
  app.use(cors());

  // CRUD default examples:
  // GET /
  app.get("/", (req, res) => {
    res
      .status(200)
      .send(
        "Root route, try: GET /items, GET /items/:id, POST /items, PUT /items/:id, or DELETE /items/:id"
      );
  });

  // GET /items
  app.get("/items", (req, res) => {
    const items = db.getAllItems();
    res.send(items);
  });

  // GET /items/:id
  app.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = db.getItem(id);
    res.send(item);
  });

  // POST /items
  app.post("/items", (req, res) => {
    const item = req.body;

    // Check if DB contains item already.
    if (db.getItem(item.id) !== undefined) {
      res.status(400).send("Item already exists in DB");
    } else {
      db.addItem(item);
      res.send("Item added successfully");
    }
  });

  // PUT /items/:id
  app.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = req.body;
    item.id = id;
    db.updateItem(item);
    res.send("Item updated successfully");
  });

  // DELETE /items/:id
  app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);

    // Check if DB does not contain item.
    if (db.getItem(id) === undefined) {
      res.status(400).send("Item does not exist in DB");
    } else {
      db.removeItem(id);
      res.send("Item removed successfully");
    }
  });

  // Express server listening
  app.listen(port, () => {
    const serverURL = chalk.rgb(198, 85, 8).underline(`http://${host}:${port}`);
    loggerNoTimestamp.info(
      `  Server running at: ${serverURL} -- Press CTRL-C to stop`
    );
  });

  // Error handler middleware
  app.use((err, req, res, next) => {
    if (err.stack && err.stack !== null) logger.error(err.stack);
    res.status(500).send("Internal REST API Server Error");
  });

  // Log shutting server down
  process.on("SIGINT", () => {
    loggerNoTimestamp.info(
      chalk.rgb(152, 251, 152).bold("  Shutting down...\n")
    );
    process.exit(0);
  });
};
