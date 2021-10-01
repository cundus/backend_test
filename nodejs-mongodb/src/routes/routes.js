const { Router } = require("express");
const router = Router();

const { getHotel, addHotel } = require("../controller/hotelController");

router.get("/hotels", getHotel);
router.post("/hotel", addHotel);

module.exports = router;
