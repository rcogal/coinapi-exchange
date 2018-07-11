import {CoinApiService} from '../../services/CoinApiService';
import { ExchangeModel } from '../../models/ExchangeModel';
import { BaseController } from '../BaseController';
import {Response as ResponseData} from '../Response';

export class ExchangeController extends BaseController {

    public path: string = '/v1/exchanges/';
    private coinapiService!: CoinApiService;

    constructor(){
        super();
        this.coinapiService = new CoinApiService();
    }

    public get(): Promise<ResponseData> {
        return this.coinapiService.getResource(this.path)
            .then(response => this.json(true, <ExchangeModel[]>response.data))
            .catch(err => this.json(false, [], err.statusText))
    }
}