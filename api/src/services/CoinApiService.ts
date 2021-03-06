import axios from 'axios';
export class CoinApiService {

    private baseUrl: string = 'https://rest.coinapi.io';
    private apiKey: string = '';
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
            .then( response => response)
            .catch( err => err.response);
    }
}
