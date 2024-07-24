const express = require("express");
const router = express.Router();
const promotionController = require("../controllers/promotion");

router.post("/promotion", promotionController.create);

router.get("/promotion", promotionController.findAll);

router.get("/promotion/:id", promotionController.findOne);

router.put("/promotion/:id", promotionController.update);

router.delete("/promotion/:id", promotionController.delete);

module.exports = router;
    