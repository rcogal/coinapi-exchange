import { CoinApiService } from '../../services/CoinApiService';
import { BaseController } from '../BaseController';
import {Response as ResponseData} from '../Response';
import { AssetModel } from '../../models/AssetModel';

export class AssetController extends BaseController{

    public path: string = '/v1/assets/';
    private coinapiService!: CoinApiService;

    constructor() {
        super();
        this.coinapiService = new CoinApiService();
    }

    public get(): Promise<ResponseData> {
        return this.coinapiService.getResource(this.path)
            .then(assets => this.json(true, <AssetModel[]>assets))
            .catch(err => this.json(false, [], err));
    }
}