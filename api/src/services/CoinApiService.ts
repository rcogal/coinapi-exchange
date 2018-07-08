import axios from 'axios';

export class CoinApiService {

    private baseUrl: string = 'https://rest.coinapi.io';
    private apiKey: string = 'FA49C145-2663-48E9-BFF7-FF085C4F1CE9'; //
    private axios = axios;

   private get axiosInstance() {
        return this.axios.create({
            baseURL: this.baseUrl,
            headers: {
                'X-CoinAPI-Key': this.apiKey
            }
        });
    }

    public getResource(resource: string): Promise<any>{
        return this.axiosInstance.get(resource)
            .then( response => response.data )
            .catch( err => err);
    }
}