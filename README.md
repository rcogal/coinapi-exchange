


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

## Demo

* [coinapiexchange](https://coinapiexchange.herokuapp.com/) - working application

