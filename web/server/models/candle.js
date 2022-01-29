module.exports = class Candle {
  constructor(candle_info, timeframe, exchange) {
    if (exchange == "binance") {
      this.timestamp = candle_info[0];
      this.open = parseFloat(candle_info[1]);
      this.high = parseFloat(candle_info[2]);
      this.low = parseFloat(candle_info[3]);
      this.close = parseFloat(candle_info[4]);
      this.volume = parseFloat(candle_info[5]);
    } else if ((exchange = "parse_trade")) {
      this.timestamp = candle_info.ts;
      this.open = candle_info.open;
      this.high = candle_info.high;
      this.low = candle_info.low;
      this.close = candle_info.close;
      this.volume = candle_info.volume;
    }
  }
};
