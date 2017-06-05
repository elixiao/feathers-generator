# feathers-generator

> generator for feathersjs application


## Install

```bash
npm install feathers-generator --save-dev
yarn add feathers-generator --dev
```


## Usage

add script to your package.json

```json
"scripts": {
  "create": "feathers-generator"
}
```

use the following command to generate service:

```bash
npm run create user  # create user model and service
npm run create book.sort  # create book-sort service
npm run create passport nodb  # create passport service without database
npm run create passport nodb path=passport force  # replace passport service with path=passport 
npm run create passport.active nopre  # create passport/active service
```

## License

MIT
