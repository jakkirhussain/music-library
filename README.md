## Build tool
This project uses [Vite](https://vitejs.dev/) as a build tool which is faster than the traditional webpack. It does support federartion using plugins like [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation) which is used to build micro-frontend applications.
configuration is more or less the same as webpack.


## Music Library
This project is a music library application that allows users to search for songs and add them to their library. The application is built using React and TypeScript.


## Roles andd Permissions
The application has two roles:
  - Admin: can add songs to the library
  - User: can view songs in the library

  Token and roles are passed to the music library micro-frontend application as props from the core application.

## Features
- Search for songs by title or artist or album
- Add songs to your library
- Remove songs from your library
- View your library
- Sort your library by title, artist, or album

  ## Getting Started
    To get started with the application, clone the repository and install the dependencies:

Build the project and start the development server with: 
`npm run dev`

## Building
  To create a production version of your app:
  `npm run build`

  To run in a server  for the micro-frontend:
  `npm run preview`

## Running tests
  run tests:
  `npm run test`

## coverage
  `npm run coverage`

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
