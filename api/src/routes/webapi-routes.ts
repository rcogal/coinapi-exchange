import {Application, Router, Request, Response} from 'express';
import {AssetController} from '../controllers/metadata/AssetController';
import {ExchangeController} from '../controllers/metadata/ExchangeController';
import {CurrentOrderbookController} from '../controllers/orderbook/CurrentOrderbookController';
import {ExchangeRateController} from '../controllers/rate/ExchangeRateController';

module.exports = (app: Application) => {

    const assetResource: Router = Router();
    const assetCtrlr = new AssetController();

    // assets controller
    assetResource.get('/assets', function(req: Request, res: Response) {
        assetCtrlr.get().then(assets => res.json(assets));
    });

    // exchange controller
    const exchangeResource: Router = Router();
    const exchangeCtrlr = new ExchangeController();

    exchangeResource.get('/exchanges', function (req: Request, res: Response) {
        exchangeCtrlr.get().then(exchanges => res.json(exchanges));
    });

    // orderbook controller
    const orderbookResource: Router = Router();
    const orderbookCtrlr = new CurrentOrderbookController();
    const exchangeRateCtrlr = new ExchangeRateController();

    orderbookResource
        .get('/orderbook/current/:filterSymboldId', function (req: Request, res: Response) {
            orderbookCtrlr.get(req.params.filterSymboldId)
                .then(orderbooks => res.json(orderbooks));
        })
        .get('/orderbook/current/:baseQuote/:assetQuote/:symbolIds/:liquidity?', function (req: Request, res: Response) {

            const { baseQuote, assetQuote } = req.params;
            let exchangeRate;

            if (baseQuote !== assetQuote) {
                exchangeRateCtrlr.getRate(assetQuote, baseQuote)
                    .then( exchangeRate => {

                        if (exchangeRate.success === true ) {
                            req.params.rate = exchangeRate.result.rate;
                            console.log(req.params);

                            orderbookCtrlr.getCurrentBookResource(req.params)
                                .then(orderbooks => res.json(orderbooks));
                        } else {
                            res.json(`Something went wrong with getting the exchange rate ${assetQuote}_${baseQuote}`);
                        }
                    });
            } else {
                orderbookCtrlr.getCurrentBookResource(req.params)
                    .then(orderbooks => res.json(orderbooks));
            }
        });

    // register routes
    app.use('/api/v1', assetResource);
    app.use('/api/v1', exchangeResource);
    app.use('/api/v1', orderbookResource);
}