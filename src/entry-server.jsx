import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import favicon from './assets/favicon.ico';

export function render({ res, url, context, assets }) {
  const Document = () => (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SSR Playground (React + Vite)</title>
        {assets.css?.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <link rel="icon" href={favicon} type="image/svg+xml" />
      </head>
      <body>
        <div id="app">
          <StaticRouter location={url} context={context}>
            <App />
          </StaticRouter>
        </div>
      </body>
    </html>
  );

  const { pipe, abort } = renderToPipeableStream(<Document />, {
    bootstrapModules: assets?.bootstrapModules,

    onShellReady() {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      pipe(res);
    },

    onShellError(error) {
      res.statusCode = 500;
      res.send(
        `<!doctype html><p>An error ocurred:</p><pre>${error.message}</pre>`,
      );
    },
  });

  setTimeout(abort, 2000);
}
