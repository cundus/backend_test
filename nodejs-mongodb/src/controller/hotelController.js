const Hotels = require("../../model/ListingHotel");

exports.getHotel = async (req, res) => {
  try {
    const hotels = await Hotels.find();
    res.json(hotels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.addHotel = async (req, res) => {
  const hotel = new Hotels(req.body);
  try {
    const savedHotel = await hotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
