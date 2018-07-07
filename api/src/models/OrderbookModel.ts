export class OrderBookModel {
    symbol_id!: string;
    time_exchange!: string;
    time_coinapi!: string;
    asks!: any[];
    bids!: any[];
}