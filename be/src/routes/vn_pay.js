const express = require("express");
const router = express.Router();
const vnPayController = require("../controllers/vn_pay");

router.post("/create-payment", vnPayController.createPayment);
router.get("/result_payment", vnPayController.returnPaymentResult);

module.exports = router;
 