const express = require("express");
const { handleRelayerRequest } = require("../services/relayer");

const router = express.Router();

router.post("/relay", handleRelayerRequest);

module.exports = router;
