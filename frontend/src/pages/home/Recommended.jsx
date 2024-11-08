import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';


const Recommended = () => {
    //const [books, setBooks] = useState([]);

    /* useEffect(() => {
        const fecthData = async () => {
            try {

                const response = await fetch("books.json");

                // Comprobar si la respuesta fue exitosa
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                //console.log(data);
                setBooks(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fecthData();
    }, []) */

    const { data: books = [], isError, isLoading } = useFetchAllBooksQuery();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading book information</div>
    return (
        <div className='py-16'>
            <h2 className='text-3xl font-semibold mb-6'>Recommended for you</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                /*   pagination={{
                      clickable: true,
                  }} */
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    /*  1180: {
                         slidesPerView: 3,
                         spaceBetween: 50,
                     } */
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    books.length > 0 && books.slice(8, 11).map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))
                }


            </Swiper>
        </div>
    )
}

export default Recommended
