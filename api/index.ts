import express from "express";
import apiRouter from "../src/server/api.ts";

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

// Catch-all for API
app.all("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

export default app;
