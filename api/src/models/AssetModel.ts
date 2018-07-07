export class AssetModel {
    asset_id!: string;
    name!: string;
    type_is_crypto!: string;
    data_start!: string;
    data_end!: string;
    data_qoute_start!: string;
    data_quote_end!: string;
    data_orderbook_start!: string;
    data_orderbook_end!: string;
    data_trade_start!: string;
    data_trade_end!: string;
    data_trade_count!: number;
    data_symbols_count!: number;
}