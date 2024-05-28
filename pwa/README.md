# Hytte.ro PWA

This is a [Remix](https://remix.run) app with PWA support.

## Features

| Library     | Link                                                                                       | Description                             |
|-------------|--------------------------------------------------------------------------------------------|-----------------------------------------|
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

## Running in Production

### Local Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

### Docker Deployment

The Dockerfile is configured to execute the application in a production environment.
Follow the steps below to build and run the application using Docker.

First, construct the Docker image:

```sh
docker build -t hytte-ro .
```

Next, initiate the Docker container:

```sh
docker run -p 3000:3000 hytte-ro
```