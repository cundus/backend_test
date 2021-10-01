const { Router } = require("express");
const router = Router();

const { addBook, getBooks } = require("../controller/bookController");

router.get("/books", getBooks);
router.post("/book", addBook);

module.exports = router;
