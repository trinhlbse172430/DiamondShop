const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role");

router.post("/role", roleController.create);

router.get("/role", roleController.findAll);

router.get("/role/:id", roleController.findOne);

router.put("/role/:id", roleController.update);

router.delete("/role/:id", roleController.delete);

module.exports = router;
