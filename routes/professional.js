const express = require("express");
const router = express.Router();
const professionalController = require("../controllers/professional");

router.get("/", professionalController.getAllProfessional);
router.get("/:id", professionalController.getSingleProfessional);
router.post("/", professionalController.createProfessional);
router.put("/:id", professionalController.updateProfessional);
router.delete("/:id", professionalController.deleteProfessional);

module.exports = router;