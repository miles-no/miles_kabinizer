# Hytte.ro PWA

This is a [Remix](https://remix.run) app with PWA support.

## Features

| Library     | Link                                                                                       | Description                             |
| ----------- | ------------------------------------------------------------------------------------------ | --------------------------------------- |
| Remix       | [https://remix.run](https://remix.run)                                                     | Framework                               |
| Remix PWA   | [https://remix-pwa.run/docs/main/quick-start](https://remix-pwa.run/docs/main/quick-start) | Remix PWA plugin                        |
| TailwindCSS | [https://tailwindcss.com](https://tailwindcss.com)                                         | Utility-first CSS framework             |
| DaisyUI     | [https://daisyui.com](https://daisyui.com)                                                 | Component library - Write less Tailwind |

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/guides/vite) for
details on supported features.

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`


## Todo

Dockerize the app and deploy it to Google Cloud Run.