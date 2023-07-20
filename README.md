# React-SSR Playground

A playground to bootstrap a React-SSR app using the `renderToPipeableStream` API. It allows
experimenting with [its options and behaviors][react-docs].

## Usage

[![Edit react-ssr-playground](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/sthzg/React-SSR-Playground/tree/main/?fontsize=14&hidenavigation=1)

**Local development**

```bash
npm install
npm run dev
```

**Build and run**

```bash
npm install
npm run build
npm start
```

## Stack

The setup is based on [Vite's SSR example][vite-example] and modified to make use of the
`renderToPipeableStream API`. The features are minimal to focus primarily on the moving parts.

[vite-example]: https://github.com/vitejs/vite-plugin-react/tree/main/playground/ssr-react
[react-docs]: https://react.dev/reference/react-dom/server/renderToPipeableStream
