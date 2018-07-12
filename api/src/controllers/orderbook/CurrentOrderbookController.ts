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
    private allowedQuotes = ['USD', 'EUR', 'GBP'];

    constructor(){
        super();
        this.coinapiService = new CoinApiService();
    }

    get(symbols: string): Promise<ResponseData> {
        return this.coinapiService.getResource(`${this.path}?filter_symbol_id=${symbols}`)
            .then(response => {
                console.log(response.status);
                if (response.status === 200) {
                    return this.json(true, response.data);
                } else {
                    return this.json(false, [], response.statusText);
                }
            })
            .catch(err => this.json(false, [], err.statusText));

    }

    getCurrentBookResource(exchangeInfo: any) {

        const extraInfo = {
            rate: exchangeInfo.rate || 1,
            liquidity: exchangeInfo.liquidity || 0
        };

        return this.get(exchangeInfo.symbolIds)
            .then(results => {
                if( results.success === true ) {
                    return this.json(true, this.getCurrentOrderbookFilter(results.result, extraInfo));
                } else {
                    return results;
                }
            });
    }

    getLiquidity(price: number, size: number): number {
        return price * size;
    }

    getCurrentLiquidity(exchangeTypes: any[], extraInfo: any): any {

        const { rate, liquidity } = extraInfo;

        return _.find( exchangeTypes, (item: any) => {
            return this.getLiquidity(item.price * rate, item.size) > liquidity;
        });
    }

    getCurrentOrderbookFilter(orderbooks: OrderBookModel[], extraParams: any): CurrentOrderbookModel[] {
        const exchangeBids: any = [];
        const exchagneAsks: any = [];
        const { liquidity, rate } = extraParams;
        const me = this;

        _.each(orderbooks, function (orderbook: OrderBookModel) {
            const {symbol_id, asks, bids} = orderbook;
            const symbol = symbol_id.split('_');
            const exchange = symbol[0]; // get the current 0 index for the name of current exchange
            const quote = symbol[symbol.length - 1];
            const ask = me.getCurrentLiquidity(asks, extraParams);
            const bid = me.getCurrentLiquidity(bids, extraParams);

            if (ask) {

                let askPrice = ask.price * rate;

                exchagneAsks.push({
                    price: askPrice,
                    size: ask.size,
                    exchange: exchange,
                    liquidity: me.getLiquidity(askPrice, ask.size)
                });
            }

            if (bid) {

                let bidPrice = bid.price * rate;

                exchangeBids.push({
                    price: bidPrice,
                    size: bid.size,
                    exchange: exchange,
                    liquidity: me.getLiquidity(bidPrice, bid.size)
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