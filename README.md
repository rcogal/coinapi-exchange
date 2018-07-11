


# coinapi-exchange

The application allows user to choose exchanges on different coin pair to determine the opportunities against each exchanges. It ONLY display top 5 best exchanges with best prices. App is all dependent on the third party API, CoinAPi, where it fetches list of exchanges, assets (base/quote).

## Setup

### Dependencies

* [CoinAPI](https://www.coinapi.io/) - fetches lists of exchanges, assets

### Installation

Coinapi-exchange requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd coinapi-exchange
$ npm install
$ npm run-script dev:start
```

### Notes

Every time you make changes on typescript, make sure you build it by running the command
```sh
$ cd coinapi-exchange
$ npm run-script build:ts
```

## License
 
The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.