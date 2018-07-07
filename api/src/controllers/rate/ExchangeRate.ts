import {BaseController} from '../BaseController';
import {Response as ResponseData} from '../Response';
import {CoinApiService} from '../../services/CoinApiService';
import { ExchangeRateModel } from '../../models/ExchangeRateModel';

export class ExchangeRate extends BaseController {

    public path: string = 'v1/exchangerate';
    private coinapiService: CoinApiService;

    constructor() {
        super();
        this.coinapiService = new CoinApiService();
    }

    getRate(base: string, quote: string): Promise<ResponseData> {

        const resource = `${this.path}/${base}/${quote}`;

        return this.coinapiService.getResource(resource)
            .then(exchangerate => this.json(true, <ExchangeRateModel[]>exchangerate) )
            .catch(err => this.json(false, [], err));
    }
}