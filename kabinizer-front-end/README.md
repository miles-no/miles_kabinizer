# Kabinizer Front-End

This project is the front-end part of the Kabinizer application. It is built using a variety of modern web technologies
to provide a seamless user experience.

## Technologies Used

- [Vite](https://vitejs.dev/): A build tool that provides a faster and leaner development experience for modern web
  projects.
- [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript that adds types to the
  language.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom user interfaces.
- [React Query](https://react-query.tanstack.com/): A data fetching and state management library for React applications.
- [OpenAPI TypeScript Codegen](https://github.com/ferdikoomen/openapi-typescript-codegen): A tool to generate TypeScript
  code from an OpenAPI specification.
- [Microsoft Authentication Library (MSAL)](https://github.com/AzureAD/microsoft-authentication-library-for-js): A
  library for JavaScript-based client-side authentication.
- [npm](https://www.npmjs.com/): A package manager for JavaScript and the world’s largest software registry.
- [Radix UI](https://www.radix-ui.com/): A low-level UI component library with a focus on accessibility, customization
  and developer experience.

## Getting Started

To set up the project for development on your local machine, please follow the instructions below:

1. Install the required packages:

    ```bash
    npm install
    ```

2. Start the development server:

    ```bash
    npm run dev
    ```

3. Generate new OpenAPI types:

    ```bash
    npm run generate
    ```

## Project Structure

The project is structured around the concept of "Periods" and "Draws".

- **Periods**: These are the available time slots for the cabin that users can sign up for. They have a start and end
  date and belong to a draw. Most of the time, the period will be from Monday to Sunday, but it can be any period of
  time. For example, the first winter break period starts on the Friday before the winter break week.

- **Draws**: These are deadlines for signing up to a period. I'm considering refactoring to make this clearer.