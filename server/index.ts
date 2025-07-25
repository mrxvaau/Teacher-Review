import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for logging API requests and JSON responses
app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
        const duration = Date.now() - start;
        if (path.startsWith("/api")) {
            let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
            if (capturedJsonResponse) {
                logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
            }

            if (logLine.length > 80) {
                logLine = logLine.slice(0, 79) + "…";
            }

            log(logLine);
        }
    });

    next();
});

(async () => {
    try {
        // Register API routes (can use mock DB during local dev)
        const server = await registerRoutes(app);

        // Central error handling middleware
        app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
            const status = err.status || err.statusCode || 500;
            const message = err.message || "Internal Server Error";
            res.status(status).json({ message });
            throw err;
        });

        /**
         * 🔧 Development Mode: Setup Vite for Hot Module Reloading
         * This should come AFTER other routes, to avoid catching everything.
         */
        if (app.get("env") === "development") {
            await setupVite(app, server);
        } else {
            // In production, serve static frontend files from /client/dist
            serveStatic(app);
        }

        /**
         * ✅ Server Binding Fix:
         * Changed host from '0.0.0.0' to 'localhost' to avoid ENOTSUP on Windows
         * When you're ready to deploy or test network access, you can change this back
         */
        const port = 5000;
        const host = "localhost"; // ← use "0.0.0.0" for production or external testing

        server.listen({
            port,
            host,
            // reusePort is optional and can cause errors on Windows
        }, () => {
            log(`✅ Server is running at http://${host}:${port}`);
        });

    } catch (error) {
        console.error("❌ Server startup error:", error);
    }
})();
