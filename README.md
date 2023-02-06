# NodeJS local server debug tool

(( In progress ))

Intented as a debug tool for REST and eventually GraphQL / gRPC / tRPC protocol.
Mock a server by redirecting it to this local server.

Use Node verison > 19 for node --watch flag. This allows recompiling with saved changes without use of nodemon.

## Quick Start:

1. CD into project root.
2. Ensure you have the latest Node version v19 or higher.
   You can use `nvm` to get the latest with `nvm install node`. Or switch to v19 or higher with, `nvm use 19`.
3. Run `npm install` or `yarn` command to install required packages.
4. Run `npm run start` to start the local Express server.
5. Open your browser, Postman, or make a cURL GET request to the server.
6. Modify the server (`./src/server/server.mjs`) and mock the req/res to match your live server.
