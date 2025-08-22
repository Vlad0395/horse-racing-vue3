

# Horse Racing Game Front-End

## Description
Web application for horse racing simulation. Built with Vue 3, TypeScript, and Vite. Includes animation, program generation, results, responsive UI, and testing.

## Project Structure

- `src/components/` — main UI components (Racetrack, HorsesList, Results, Programs, InfoPanel, Table, Tabs)
- `src/composables/` — animation logic, reactive hooks
- `src/views/` — main pages
- `src/stores/` — Vuex store (race state, horses, programs)
- `src/styles/` — styles, variables, mixins
- `cypress/` — e2e tests
- `src/__tests__/` — unit tests

## Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/Vlad0395/horse-racing-vue3.git
  cd horse-racing
  ```
2. Install dependencies:
  ```sh
  npm install
  ```

## Running the Project

```sh
npm run dev
```
The app will be available at http://localhost:5173 (or the port shown in the console).

## Running Tests

### Unit tests (Vitest)
```sh
npm run test
```

### E2E tests (Cypress)
```sh
npm run e2e
```
or
```sh
npx cypress open
```

## Technologies
- Vue 3
- TypeScript
- Vite
- Cypress
- Vitest

## Responsiveness
The interface adapts to different screen sizes, including mobile version.

## Author
Vlad0395