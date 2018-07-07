import { BaseController } from "../BaseController";
import {Response as ResponseData} from "../Response";
import { CoinApiService } from "../../services/CoinApiService";
import { OrderBookModel } from "../../models/OrderbookModel";
import { CurrentOrderbookModel } from "../../models/CurrentOrderbookModel";
import * as _ from "underscore";

export class CurrentOrderbookController extends BaseController {

    public path: string = 'v1/orderbooks/current';
    public displayLimit: number = 5;
    private coinapiService!: CoinApiService;

    constructor(){
        super();
        this.coinapiService = new CoinApiService();
    }

    get(symbols: string, liquidity: number): Promise<ResponseData> {

        liquidity = liquidity || 0;

        return this.coinapiService.getResource(`${this.path}?filter_symbol_id=${symbols}`)
            .then(orderbooks => {
                return this.json(true, this.getCurrentOrderbookFilter(orderbooks, liquidity));
            })
            .catch(err => this.json(false, [], err));

    }

    getLiquidity(price: number, size: number): number {
        return price * size;
    }

    getCurrentLiquidity(exchangeTypes: any[], liquidity: number): any {
        return _.find( exchangeTypes, (item: any) => {
            return this.getLiquidity(item.price, item.size) > liquidity;
        });
    }

    getCurrentOrderbookFilter(orderbooks: OrderBookModel[], liquidity: number): CurrentOrderbookModel[] {
        const exchangeBids: any = [];
        const exchagneAsks: any = [];
        const me = this;

        _.each(orderbooks, function (orderbook: OrderBookModel) {
            const {symbol_id, asks, bids} = orderbook;
            const exchange = symbol_id.split('_')[0]; // get the current 0 index for the name of current exchange
            const ask = me.getCurrentLiquidity(asks, liquidity);
            const bid = me.getCurrentLiquidity(bids, liquidity);

            if (ask) {
                exchagneAsks.push({
                    price: ask.price,
                    size: ask.size,
                    exchange: exchange,
                    liquidity: me.getLiquidity(ask.price, ask.size)
                });
            }

            if (bid) {
                exchangeBids.push({
                    price: bid.price,
                    size: bid.size,
                    exchange: exchange,
                    liquidity: me.getLiquidity(bid.price, bid.size)
                })
            }
        });

        return this.applyCurrentBookBestPrice(exchangeBids, exchagneAsks);
    }

    sortBestPrice(items: any[], dir: string): any {
        items.sort( (a, b) => {
            return dir === 'asc' ? (a.price - b.price) : (b.price - a.price);
        });

        return items;
    }

    sortBidPrices(bidPrices: any[]) {
        return this.sortBestPrice(bidPrices, 'desc');
    }

    sortAskPrices(askPrices: any[]) {
        return this.sortBestPrice(askPrices, 'asc');
    }

    applyCurrentBookBestPrice(bids: any[], asks: any[]): CurrentOrderbookModel[] {
        const maxSize: number = Math.max(bids.length, asks.length);
        const output: any[] = [];
        let i: number = 0;

        bids = this.sortBidPrices(bids);
        asks = this.sortAskPrices(asks);

        while(i<maxSize) {
            let bid = bids[i] || {};
            let ask = asks[i] || {};

            if (this.displayLimit === i) { break; }

            output.push({
                bid_price: bid.price,
                bid_size: bid.size,
                bid_exchange: bid.exchange,
                bid_liquidity: bid.liquidity,
                ask_price: ask.price,
                ask_size: ask.size,
                ask_exchange: ask.exchange,
                ask_liquidity: ask.liquidity
            });

            i+=1;
        }

        return output;
    }
}