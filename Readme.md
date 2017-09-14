# [innerself](https://github.com/stasm/innerself) hacker news app

## TODO

- [ ] normalize items
- [ ] component folder structure
- [ ] store folder structure
- [ ] cleanup router code
- [ ] comments


## Features:

- pure (strict mode) TypeScript for development
- ~3kb of total compiled/bundled/gzipped javascript
- 1 external runtime dependency ([innerself, ~50 LOC](https://github.com/stasm/innerself))
- [client side routing](https://developer.mozilla.org/en-US/docs/Web/API/History_API#section_4)
- [request caching](https://www.sitepoint.com/cache-fetched-ajax-requests/)
- component based architecture

## Requirements

This uses a fair amount of modern javascript apis and thus assumes a modern browser.

- [history api](https://developer.mozilla.org/en-US/docs/Web/API/History_API#section_4)
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [array spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

## Development

- install dependencies

```
yarn
```

- start the dev server

```
yarn start
```