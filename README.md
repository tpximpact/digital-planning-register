## Overview

This project is a Digital Planning Register web application that helps people search and access historical planning records, decisions, and data of planning applications.

It is built using [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Council-Specific Data

This planning register application supports multiple councils, each with its own dedicated data source. Although you can view data from different councils within the application, the data itself is segregated and specific to each council.

### API Integration

This project connects to an external API to fetch and display data from each council. The API base URL and required API keys are stored in environment variables.

### Data Segregation

When fetching data from the API, the application uses the council-specific environment variables to make requests to the appropriate API endpoint. This ensures that each council's data is fetched from its designated data source and remains segregated from other councils' data.

The application handles the routing and rendering of council-specific pages based on the `[council]` and `[id]` dynamic routes. This allows users to navigate between different councils and view their respective data without any data mixing or overlap.

It's important to note that while the application provides a unified interface to view data from multiple councils, the data itself remains isolated and specific to each council. The application does not combine or merge data from different councils.

## Getting Started

Install dependencies:

```bash
npm install
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
npm run build
```

This will generate an optimized production build.

### Running the Production Build

To start the production server, run the following command:

```bash
npm start
```

This will start the Next.js production server at `http://localhost:3000`.

## Testing

The project is using [Jest](https://jestjs.io/) for testing.

Run the tests:

```bash
npm test
```

## Project Structure

The project structure follows the Next.js App Router conventions and includes a council-based folder structure where each council has its own directory within the `app/` directory:

- `app/`: Contains the Next.js app directory.

  - `[council]/`: Dynamic route for each council.
    - `page.tsx`: The main listing page component for each council.
    - `[id]/`: Dynamic route for a specific planning application within a council.
      - `page.tsx`: The page component for a specific ID within a council.
  - `components/`: Contains reusable React components used throughout the application.
  - `styles/`: Contains CSS / Sass stylesheets for styling the application.

- `public/`: Contains static assets such as images, icons, etc.
- `util/`: Contains utility functions, type definitions, and other helper files.
- `__tests__/`: Contains Jest test suites.

## Environment setup

Ensure that the .env or .env.local file also has the following environment Keys:

|          Variable Name          | Value |
| :-----------------------------: | :---: |
| NEXT_PUBLIC_BOPS_API\_[COUNCIL] |  ###  |
|       [council]\_api_key        |  ###  |

Please ensure you replace [COUNCIL] and [council] with the council names.

Each council has its own set of environment variables that specify the API URL and the required API key. If you require access to multiple councils, you can do this by duplicating the variables and adding the relevant council name.

For example, for Camden and Southwark data:

|         Variable Name          | Value |
| :----------------------------: | :---: |
| NEXT_PUBLIC_BOPS_API_SOUTHWARK |  ###  |
|       southwark_api_key        |  ###  |
|  NEXT_PUBLIC_BOPS_API_CAMDEN   |  ###  |
|         camden_api_key         |  ###  |
