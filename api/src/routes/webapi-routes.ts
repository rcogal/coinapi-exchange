import {Application, Router, Request, Response} from 'express';
import {AssetController} from '../controllers/metadata/AssetController';
import {ExchangeController} from '../controllers/metadata/ExchangeController';
import {CurrentOrderbookController} from '../controllers/orderbook/CurrentOrderbookController';

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

    orderbookResource
        .get('/orderbook/current/:filterSymboldId/:liquidity?', function (req: Request, res: Response) {
            orderbookCtrlr.get(req.params.filterSymboldId, req.params.liquidity || 0)
                .then(orderbooks => res.json(orderbooks));
        })

    // register routes
    app.use('/api/v1', assetResource);
    app.use('/api/v1', exchangeResource);
    app.use('/api/v1', orderbookResource);
}