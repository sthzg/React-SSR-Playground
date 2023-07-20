import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isTest = process.env.VITEST;

const resolve = (p) => path.resolve(__dirname, p);

let manifest;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort,
) {
  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests, we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: 'custom',
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      }),
    );
  }

  app.use('*', async (req, res) => {
    try {
      const render = isProd
        ? (await import('./dist/server/entry-server.js')).render
        : (await vite.ssrLoadModule('./src/entry-server')).render;

      const { bootstrapModules, css } = await getBootstrapAssets(isProd);

      return render({
        res,
        req,
        context: {},
        url: req.originalUrl,
        assets: {
          bootstrapModules,
          css,
        },
      });
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(5173, () => {
      console.log('http://localhost:5173');
    }),
  );
}

async function readManifest() {
  if (!manifest) {
    const raw = await fs.readFile(
      resolve('dist/client/manifest.json'),
      'utf-8',
    );
    manifest = JSON.parse(raw.toString());
  }

  return manifest;
}

async function getBootstrapAssets(isProd) {
  if (!isProd) {
    return {
      bootstrapModules: ['/src/preamble.js', '/src/entry-client.jsx'],
      css: ['/src/index.css'],
    };
  }

  const manifest = await readManifest();

  return {
    bootstrapModules: [manifest['src/entry-client.jsx']?.file],
    css: manifest['src/entry-client.jsx']?.css || [],
  };
}
