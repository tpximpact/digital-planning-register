## Overview

This project is a Digital Planning Register web application that helps people search and access historical planning records, decisions, and data of planning applications. It supports multiple councils, each with its own dedicated data source. Although you can view data from different councils within the application, the data itself is segregated and specific to each council.

It is built using [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The codebase is written in TypeScript which enhances code reliability, maintainability, and tooling support.

### API Integration

This project connects to an external API to fetch and display data from each council. The API base URL and required API keys are stored in environment variables.

### Data Segregation

When fetching data from the API, the application uses the council-specific environment variables to make requests to the appropriate API endpoint. This ensures that each council's data is fetched from its designated data source and remains segregated from other councils' data.

The application handles the routing and rendering of council-specific pages based on the `[council]` and `[id]` dynamic routes. This allows users to navigate between different councils and view their respective data without any data mixing or overlap.

It's important to note that while the application provides a unified interface to view data from multiple councils, the data itself remains isolated and specific to each council. The application does not combine or merge data from different councils.

## Getting Started

Ensure you have Node.js and npm (Node Package Manager) installed on your machine.

Install dependencies:

```bash
npm install
```

### Getting some data

If you have specific environment variables for your backend you can see [Environment setup](#environment%20setup) below.

If you wish to use the test API data, the `.env.test` file will run your application using the local API.

```sh
cp .env.test .env
```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the Next.js development server at `http://localhost:3000`. Open your browser and navigate to this URL to see the application.

### Building for Production

To build the application for production, run the following command:

```bash
./build.sh
```

This will generate an optimized production build and start the Next.js production server at `http://localhost:3000`.

## Testing

> NB e2e tests require the test API to be enabled using `.env.test`

The project is using [Jest](https://jestjs.io/) for testing.

Run the tests:

```bash
npm test
```

## Project Structure

The project structure follows the Next.js App Router conventions and includes a council-based folder structure where each council has its own directory within the `app/` directory:

- `app/`: Contains the Next.js app directory.

  - `[council]/`: Dynamic route for each council.
    - `page.tsx`: The main listing page component for each council which includes search functionality.
    - `[id]/`: Dynamic route for a specific planning application within a council.
      - `page.tsx`: The page component for a specific ID within a council.
  - `components/`: Contains reusable React components used throughout the application.
  - `styles/`: Contains CSS / Sass stylesheets for styling the application.

- `public/`: Contains static assets such as images, icons, etc.
- `util/`: Contains utility functions, type definitions, and other helper files.
- `__tests__/`: Contains Jest test suites.

## Environment setup

`cp -rp sample.env .env`

Ensure that the .env or .env.local file also has the following environment variables:

|      Variable Name      | Value |
| :---------------------: | :---: |
|   `[COUNCIL]_API_URL`   |  ###  |
| `[COUNCIL]_API_URL_V1 ` |  ###  |
|   `[COUNCIL]_API_KEY`   |  ###  |

Please ensure you replace [COUNCIL] with the council name.

Each council has its own set of environment variables that specify the API URL and the required API key. If you require access to multiple councils, you can do this by duplicating the variables and adding the relevant council name.

## Map setup

To use the OS maps vector API you will need an API key and a proxy.

You can enter any proxy URL, if you wish to use the one built into DPR you will also need to provide the `OS_MAP_API_KEY`

|      Variable Name      |                    Value                    |
| :---------------------: | :-----------------------------------------: |
|    `OS_MAP_API_KEY`     |                     ###                     |
|   `OS_MAP_PROXY_URL`    | http://localhost:3000/proxy/ordnance-survey |
| `OS_MAP_ALLOWED_ORIGIN` |            http://localhost:3000            |

## GOV.UK

DPR uses the [GOV.UK styles](https://design-system.service.gov.uk/) to make updating and upgrading simpler we store the govuk assets in the `/public/govuk` folder so any updates can be made by replacing the assets folder in that folder

CSS wise some componenents in the `/components/govuk` are straight from GOVUK others are a mix of reusing govuk mixings and redoing it all ourselves

We do not use the govuk font because its not allowed on non govuk domains, ensure that you always incllude @import "src/styles/component-base";in components and don't override the vars.scss file!

DPR follows the [GOV.UK Design System](https://design-system.service.gov.uk/) for styling.

To maintain consistency and simplify future updates here is some further information.

#### GOV.UK Assets

- GOV.UK static assets (CSS, JS, fonts, etc.) are stored in the `/public/govuk` directory.
- To update GOV.UK styles, replace the contents of this folder with the latest version from the GOV.UK frontend toolkit.

#### Components

- Components in `/components/govuk` are direct copies from the GOV.UK Design System with no custom changes by us
- All other components either use GOV.UK Sass mixins or are fully rewritten to suit DPR’s requirements.

#### Fonts

- **We do not use the GOV.UK font** because its license restricts usage to GOV.UK domains only.

#### Styling Guidelines

- Always include the shared base styles in your component Sass with:

```scss
@import "src/styles/component-base";
```

- Make sure you dont re-import `node_modules/govuk-frontend/dist/govuk/base` anywhere as it overwrites the gov-uk vars in the `vars.scss` file!
