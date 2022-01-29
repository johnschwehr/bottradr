module.exports = class Balance {
  constructor(info, exchange) {
    if (exchange == "binance") {
      this.initial_margin = parseFloat(info.initialMargin);
      this.maintenance_margin = parseFloat(info.maintMargin);
      this.margin_balance = parseFloat(info.marginBalance);
      this.wallet_balance = parseFloat(info.walletBalance);
      this.unrealized_pnl = parseFloat(info.unrealizedProfit);
    }
  }
};
