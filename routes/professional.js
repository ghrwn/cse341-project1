const express = require("express");
const router = express.Router();
const professionalController = require("../controllers/professional");
const { ensureAuthenticated } = require("../middleware/authenticate");

router.get("/", professionalController.getAllProfessional);
router.get("/:id", professionalController.getSingleProfessional);
router.post("/", ensureAuthenticated, professionalController.createProfessional);
router.put("/:id", professionalController.updateProfessional);
router.delete("/:id", ensureAuthenticated, professionalController.deleteProfessional);

module.exports = router;