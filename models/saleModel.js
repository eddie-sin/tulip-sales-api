const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  seller_name: {
    type: String,
    required: true,
    enum: ["Eddie", "Kaung Sitt", "Shun Lak"],
  },
  seller_gender: { type: String, enum: ["male", "female"], required: true },
  place: {
    type: String,
    enum: ["JS", "216", "209"],
    required: true,
  },
  sale_attempt_time: { type: Date, default: Date.now },
  sale_status: { type: String, enum: ["Success", "Fail"], required: true },
  sale_reason: { type: String, required: true },
  sold_price: { type: Number, default: 0 },
  profit: { type: Number }, // Automatically calculated
  customer_batch: { type: String, required: true },
});

// Automatically calculate profit before saving
SaleSchema.pre("save", function (next) {
  if (this.sold_price != 0) {
    this.profit = this.sold_price - 2000;
  } else {
    this.profit = 0;
  }

  next();
});

const Sale = mongoose.model("Sale", SaleSchema);
module.exports = Sale;
