# NodeJS local server debug tool [In Progress]

![Design](./assets/design-ref.png)

Intented as a debug tool for REST and eventually GraphQL / gRPC / tRPC protocol. As needed, change the output of REST rest services by routing to this local server and setting the response. This allows end to end and integrated testing with frontend changes without being blocked by pending dependency API updates. While mocking and intercepting are options they become increasingly more time consuming in many-layered frontend apps/frameworks. Instead, You can just spin up the local REST server in minutes. The server implementation is kept flat and free from abstraction to make changes easy. Just open {{root}}/src/server/server.mjs and update Express REST endpoints as needed. Default CRUD operations are given. Postman collections are also added so feel free to use those to verify setup.

## NPM - Quick Start:

1. CD into project root.
2. Ensure you have the latest Node version v19 or higher.
   You can use `nvm` to get the latest with `nvm install node`. Or switch to v19 or higher with, `nvm use 19`.
3. Run `npm install` command to install required packages.
4. Run `npm run start` to start the local Express server.
5. Open your browser, Postman, or make a cURL GET request to the server.
6. Modify the server (`./src/server/server.mjs`) and mock the req/res to match your live server.
7. (Optional) You can use `npm run watch` to automatically restart the server after making saved changes.

## Yarn - Quick Start:

1. CD into project root.
2. Ensure you have the latest Node version v19 or higher.
   You can use `nvm` to get the latest with `nvm install node`. Or switch to v19 or higher with, `nvm use 19`.
3. Run `yarn` command to install required packages.
4. Run `yarn run start` to start the local Express server.
5. Open your browser, Postman, or make a cURL GET request to the server.
6. Modify the server (`./src/server/server.mjs`) and mock the req/res to match your live server.
7. (Optional) You can use `yarn run watch` to automatically restart the server after making saved changes.

## Instructions:

After following quick start, consider what endpoints you'd like to build with. For example, suppose an API is needed to finish a frontend task, and in order to see the changes render a user object is required. You can go to the DB and set it so it's available and simply start the server and make your GET request to https://localhost:{PORT}/item to retrieve the item. Detailed logs are available in your console, and each session will stream logs to an `out.log` file in the repo root.
