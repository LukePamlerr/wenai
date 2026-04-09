import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import apiRouter from "./src/server/api.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  console.log("Starting Buildify server...");
  
  if (typeof fetch === 'undefined') {
    console.error("CRITICAL: Global 'fetch' is not defined. Please ensure you are using Node.js 18 or higher.");
    // In some environments, we might need to polyfill it if it's an older Node version
    // But for now, we'll just log the error.
  }
  
  const app = express();
  const PORT = 3000;

  // 1. Basic Middleware
  app.use(express.json());
  
  // 2. Logging Middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // 3. API Routes
  app.use("/api", apiRouter);

  // 4. API Catch-all
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  // 5. Vite / Static Assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // 6. Start Listening
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("CRITICAL: Failed to start server:", err);
});
