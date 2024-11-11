import React from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi"
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const SingleBook = () => {
    const { id } = useParams();
    //rtk query: tiene cache, si los datos no son laterados ,la proxima vez no solicita a la bae datos
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product)); //product is the PAYLOAD
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading book information</div>

    return (
        <div className=" rounded-lg transition-shadow duration-300">
            <div
                className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4"
            >
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                    />

                </div>

                <div>

                    <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                        {book?.title}
                    </h3>

                    <p className="text-gray-600 mb-5">{book?.description}</p>
                    <p className="font-medium mb-5">
                        ${book?.oldPrice} <span className="line-through font-normal ml-2">${book?.newPrice}</span>
                    </p>
                    <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                        <MdOutlineShoppingCart className="" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default SingleBook
