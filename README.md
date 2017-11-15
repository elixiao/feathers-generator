# feathers-generator

> generator for feathersjs application


## Install

```bash
npm install -g feathers-generator
yarn global add feathers-generator
```


## Usage

use the following command to generate app or services:

```bash
fea # create empty application
fea user  # create user model and service
fea book.sort  # create book-sort service
fea passport nodb  # create passport service without database
fea passport nodb path=passport force  # replace passport service with path=passport 
fea passport.active nopre  # create passport/active service
```

## License

MIT
