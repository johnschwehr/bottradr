module.exports = class OrderStatus {
  constructor(order_info, exchange) {
    if (exchange == "binance") {
      this.order_id = order_info.orderId;
      this.status = order_info.status.toLowerCase();
      this.avg_price = order_info.avgPrice.parseFloat();
    }
  }
};
