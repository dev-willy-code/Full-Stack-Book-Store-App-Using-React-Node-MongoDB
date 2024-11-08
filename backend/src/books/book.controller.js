const Book = require('./book.model');

//create a book
const postABook = async (req, res) => {
    try {
        const newBook = await Book(req.body);
        await newBook.save();
        res.status(200).send({ message: "Book posted succesfully", book: newBook });
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({ message: "Failed to create a book" });
    }
    //console.log("creating book");
}

//get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()//.sort({createdAt: -1})
        const sortedBooks = books.sort((a, b) => b.title.localeCompare(a.title)); // Ordenar por el campo 'title' en orden descendente
        res.status(200).send(sortedBooks);


    } catch (error) {
        console.error("Error feching books", error);
        res.status(500).send({ message: "Failed to fetch books" });
    }
}

const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({ message: "Book not Found!" });

        }
        res.status(200).send(book);

    } catch (error) {
        console.error("Error feching book", error);
        res.status(500).send({ message: "Failed to fetch books" });
    }
}


const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        //{ new: true }: Este parámetro le indica a Mongoose que devuelva el documento actualizado. Si no incluyes esta opción, findByIdAndUpdate() devolverá el documento antes de la actualización.
        const updateBook = await Book.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateBook) {
            res.status(404).send({ message: "Book not Found!" });
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updateBook
        });
    } catch (error) {
        console.error("Error updating book", error);
        res.status(500).send({ message: "Failed to update books" });
    }
}

const deleteABook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).send({ message: "Book not Found!" });
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        });
    } catch (error) {
        console.error("Error deleting book", error);
        res.status(500).send({ message: "Failed to delete book" });
    }
}

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteABook
}