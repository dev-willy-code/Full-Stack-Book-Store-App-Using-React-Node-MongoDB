const express = require('express')
const router = express.Router();
const { postABook, getAllBooks, getSingleBook, updateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');

//post = when submit something: frontend to db
//get = when get something back from db
//put/patch = when edit or update something
//delete = when delete something

//frontend => backend server => controller => book schema => database => send to server => back to frontend

//post a book
router.post("/create-book", verifyAdminToken, postABook)

//get all books
router.get("/", getAllBooks);

//single book endpoint
router.get("/:id", getSingleBook);

// update a book
router.put("/edit/:id", verifyAdminToken, updateBook);

//delete book
router.delete("/:id", verifyAdminToken, deleteABook);


module.exports = router;