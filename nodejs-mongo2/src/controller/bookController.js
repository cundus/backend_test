const Book = require("../../model/BookHotel");
const mongoose = require("mongoose");
const MUUID = require("uuid-mongodb");
const axios = require("axios");
const nodemailer = require("nodemailer");

const Hotel = mongoose.model("hotels", {
  _id: { type: "object", value: { type: "Buffer" } },
  name: { type: String },
  price: { type: Number },
  locationId: {
    type: String,
  },
  imageUrl: { type: String },
  totalRooms: { type: Number },
});

// setup nodemailer
const sendEmail = (email, roomOrder) => {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "sundusardian@outlook.com",
      pass: "sundus123",
    },
  });

  let mailOptions = {
    from: "sundusardian@outlook.com",
    to: email,
    subject: "testing",
    text: `your booking has been created, your order ${roomOrder} room(s)`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      return console.log("email sent");
    }
  });
};

exports.addBook = async (req, res) => {
  const book = new Book(req.body);
  const uuid = MUUID.from(book.hotelId);
  const id = book.userId;

  try {
    const userResponse = await axios.get(
      `http://localhost:5000/api/user/${id}`
    );

    const userEmail = userResponse.data.data.email;

    const doc = await Hotel.findOne(uuid);

    if (!doc) {
      return res.status(400).json({
        message: "The Hotel is not available",
      });
    }

    if (doc.totalRooms === 0) {
      return res.status(400).json({
        message: "There's no room available at this hotel",
      });
    }

    if (doc.totalRooms < book.qty) {
      return res.status(400).json({
        message: "the quantity of your order exceeds the available rooms",
      });
    }

    //decrease room
    const resultRoom = doc.totalRooms - book.qty;
    Object.assign(doc, { totalRooms: +resultRoom });
    doc.save();

    const saveBooking = await book.save();

    sendEmail(userEmail, book.qty);
    res.status(202).json({ message: "booking success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const Books = await Book.find();
    res.json(Books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
