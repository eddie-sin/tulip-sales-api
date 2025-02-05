const express = require("express");
const saleController = require("../controllers/saleControllers");

const router = express.Router();

router
  .route("/")
  .post(saleController.createSale) // Create a new sale
  .get(saleController.getAllSales); // Get all sales

router
  .route("/:id")
  .get(saleController.getSale) // Get a single sale by ID
  .patch(saleController.updateSale) // Update a sale by ID
  .delete(saleController.deleteSale); // Delete a sale by ID

module.exports = router;
