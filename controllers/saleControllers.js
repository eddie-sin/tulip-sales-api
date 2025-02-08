const Sale = require("../models/saleModel");
const APIFeatures = require("../utils/apiFeatures");

// Create a Sale
exports.createSale = async (req, res) => {
  try {
    const newSale = await Sale.create(req.body);
    res.status(201).json({
      status: "success",
      data: newSale,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get All Sales
exports.getAllSales = async (req, res) => {
  try {
    const features = new APIFeatures(Sale.find(), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();
    const sales = await features.query;
    res.status(200).json({
      status: "success",
      results: sales.length,
      data: sales,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get a Single Sale by ID
exports.getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res
        .status(404)
        .json({ status: "fail", message: "Sale not found" });
    }
    res.status(200).json({
      status: "success",
      data: sale,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Update a Sale by ID
exports.updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sale) {
      return res
        .status(404)
        .json({ status: "fail", message: "Sale not found" });
    }
    res.status(200).json({
      status: "success",
      data: sale,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete a Sale by ID
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res
        .status(404)
        .json({ status: "fail", message: "Sale not found" });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
