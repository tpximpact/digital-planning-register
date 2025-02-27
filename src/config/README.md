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

## License

This file is part of the Digital Planning Register project.

Digital Planning Register is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Digital Planning Register is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
