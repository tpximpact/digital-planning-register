# Notes on appConfig

- We can't use useContext because it doesn't work for non-js sites and we need almost everthing to render on the server
- By ensuring that only pages load appConfig we can ensure that the appConfig is parsed on the server side so it can access private ENV_VARS
- Components are either given 'councilConfig' or the specific config props they need so we can concentrate on testing components for functionality and not for data quality

## layout

- PageTemplate is a bit of an outlier - it lives in the

## pages

- all of our pages are rendered server side (except submit comment...) ✅

## testing

- components:
  - unit tests
  - storybook pages
- app/\*
  - unit tests
  - e2e in some cases
- actions/
  - unit tests
  - e2e tests
- handlers
  - unit tests
  - e2e tests
- config
  - unit tests
- utils
  - unit tests
- libs
  - unit tests

## Useful

```
export interface PageLandingProps {}

export const PageLandingComponent = ({}: PageLandingProps) => {
  return <p>hello</p>;
};
```

##

content components
page components
