# [innerself](https://github.com/stasm/innerself) hacker news app


## Features:

- ~4kb of total compiled/bundled/gzipped javascript
- 1 external runtime dependency ([innerself, ~50 SLOC](https://github.com/stasm/innerself))
- [client side routing](https://github.com/bsouthga/innerself-hn/tree/master/src/store/router)
- [request caching](https://github.com/bsouthga/innerself-hn/blob/master/src/store/util.ts#L21)
- [component based architecture](https://github.com/bsouthga/innerself-hn/tree/master/src/components)
- modular, normalized, redux-type store
- pure (strict mode) TypeScript for development

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