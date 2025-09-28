import type { Express, Request, Response } from "express";
import type { Server } from "http";
import { fileURLToPath } from "url";

// Dev-only Vite setup. Dynamically import heavy deps so production server build
// does not pull them in.
export async function setupVite(app: Express, server: Server) {
  const [{ createServer: createViteServer, createLogger }, fs, path, { default: viteConfig }]: any = await Promise.all([
    import("vite"),
    import("fs"),
    import("path"),
    import("../vite.config"),
  ]);

  const viteLogger = createLogger();

  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg: any, options: any) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req: Request, res: Response, next) => {
    const url = req.originalUrl;

    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const clientTemplate = path.resolve(__dirname, "..", "client", "index.html");

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      const bust = Date.now().toString(36);
      template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${bust}"`);
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
