const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.post("/order", orderController.create);

router.get("/order", orderController.findAll);

router.get("/order/:id", orderController.findOne);

router.put("/order/:id", orderController.update);

router.delete("/order/:id", orderController.delete);

router.get("/orderByMonth", orderController.orderByMonth);

router.get("/order/week", orderController.orderByWeek);

module.exports = router;
