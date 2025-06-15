const express = require("express");
const router = express.Router();
const queryController = require("../Controllers/queryController");


router.post("/", queryController.createQuery);
router.get("/", queryController.getAllQueries);
router.get("/:id", queryController.getQueryById);
router.put("/:id", queryController.updateQuery);
router.delete("/:id", queryController.deleteQuery);

module.exports = router;
