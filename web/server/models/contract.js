module.exports = class Contract {
  constructor(contract_info, exchange) {
    // Bitmex TODO
    /*
        function tick_to_decimals(tick_size) {
            tick_size_str = 
        }
        */

    if (exchange == "binance") {
      this.symbol = contract_info.symbol;
      this.base_asset = contract_info.baseAsset;
      this.quote_asset = contract_info.quoteAsset;
      this.price_decimals = contract_info.pricePrecision;
      this.quantity_decimals = contract_info.quantityPrecision;
      this.tick_size = 1 / contract_info.pricePrecision ** 10;
      this.lot_size = 1 / contract_info.quantityPrecision ** 10;
    }

    // Bitmex TODO
    /*
        else if (exchange == "bitmex") {
            this.symbol = contract_info.symbol;
            this.base_asset = contract_info.rootSymbol;
            this.quote_asset = contract_info.quoteCurrency;
            this.price_decimals = tick_to_decimals(contract_info.tickSize);
            this.quantity_decimals = tick_to_decimals(contract_info.lotSize);
            this.tick_size = contract_info.tickSize;
            this.lot_size = contract_info.lotSize;

            this.quanto = contract_info.isQuanto;
            this.inverse = contract_info.isInverse;

            this.multiplier = contract_info.multiplier; * BITMEX_MULTIPLIER

            if this.inverse:
                this.multiplier *= -1
        }
        */
  }
};
