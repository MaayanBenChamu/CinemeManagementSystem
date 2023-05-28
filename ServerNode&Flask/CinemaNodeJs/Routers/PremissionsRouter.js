const express = require("express");
const bll = require("../BLL/PermissionsBLL");

const router = express.Router();

// Get all premissions
router.get("/", async (req, res) => {
  try {
    const premissions = await bll.getAllPermissions();
    res.status(200).json(premissions);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Get premission by id
router.get("/:pId", async (req, res) => {
  const { pId } = req.params;
  const premission = await bll.getPremissionById(pId);
  res.json(premission);
});

module.exports = router;
