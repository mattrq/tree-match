# Tree Match
_Matt Rosenquist tech interview_

## Getting Started


1. Please open a terminal and navigate to the folder containing this file.

2. Create a `.env.local` file with the details emailed to you 
     - Note: you can create your own dev service at [auth0.com](https://auth0.com) using this [guide](https://auth0.com/docs/quickstart/webapp/nextjs/01-login) however parts of the guide are out of date the `.env.example` will help.

3. Install the required deps:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

6. Click `signup`

7. Please only use the `GOOGLE` option

8. Try find you matching tree


## Run tests


```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```


## If time allowed

Time permitting I would have added the following:

 * Split up the React Components 
 * Eslint, Prettier and a Editor Config to format the code and find errors early
 * Added some form of integration test (Cypress, Playwright, ...)


## Tooling used

  * [Next.js](https://nextjs.org)
  * [Auth0](https://auth0.com)
    * https://github.com/auth0-developer-hub/spa_react_javascript_hello-world/tree/vercel