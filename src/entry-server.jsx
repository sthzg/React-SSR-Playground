import { StaticRouter, renderToPipeableStream } from 'react-router-dom/server'
import { App } from './App'

export function render({ res, head }) {
  res.socket.on("error", (error) => {
    console.error("Fatal", error);
  });

  const { pipe, abort } = renderToPipeableStream(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>,
    {
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        pipe(res);
      },
      onErrorShell(x) {
        res.statusCode = 500;
        res.send(
          `<!doctype html><p>An error ocurred:</p><pre>${error.message}</pre>`
        );
      },
    }
  );

  setTimeout(abort, 2000);
}
