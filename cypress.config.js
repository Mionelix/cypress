const { defineConfig } = require("cypress");
const { query } = require("./cypress/db"); // importăm modulul cu pool-ul PostgreSQL

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  e2e: {
    // Dacă vrei să folosești un server local, poți decomenta baseUrl:
    // baseUrl: 'http://localhost:4200',
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    
    setupNodeEvents(on, config) {
      // definim task-ul pentru a rula query-uri PostgreSQL
      on('task', {
        dbQuery({ sql, params }) {
          return query(sql, params);
        }
      });

      return config; // trebuie întotdeauna returnat config
    },
  },
});