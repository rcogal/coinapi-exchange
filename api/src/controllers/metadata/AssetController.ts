import { CoinApiService } from '../../services/CoinApiService';
import { BaseController } from '../BaseController';
import {Response as ResponseData} from '../Response';
import { AssetModel } from '../../models/AssetModel';
import * as _ from 'underscore';

export class AssetController extends BaseController{

    public path: string = '/v1/assets/';
    private coinapiService!: CoinApiService;

    constructor() {
        super();
        this.coinapiService = new CoinApiService();
    }

    get(): Promise<ResponseData> {
        return this.coinapiService.getResource(this.path)
            .then(response => this.json(true, <AssetModel[]>response.data))
            .catch(err => this.json(false, [], err.statusText));
    }

    getCryptoAssets(assets: AssetModel[]) {
        return _.where(assets, { type_is_crypto: 1 });
    };
}