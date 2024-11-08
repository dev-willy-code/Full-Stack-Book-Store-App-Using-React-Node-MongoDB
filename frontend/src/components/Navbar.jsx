import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";

import avatar from "../assets/avatar.jpg"
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
    {
        name: "Dashboard", href: "/dashboard"
    },
    {
        name: "Orders", href: "/orders"
    },
    {
        name: "Cart Page", href: "/cart"
    },
    {
        name: "Checkout", href: "/checkout"
    }
]


const Navbar = () => {

    //const currentUser = false;

    const { currentUser, logout } = useAuth();
    const handleLogout = () => {
        logout();
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    console.log(isDropdownOpen);
    console.log(cartItems);

    return (
        <div>
            <header className='max-x-screen-2xl mx-auto px-4 py-6'>
                <nav className='flex justify-between items-center'>
                    {/*Left part*/}
                    <div className='flex items-center md:gap-16 gap-4'>
                        <Link to="/">
                            <HiBars3CenterLeft className='size-6' />
                        </Link>
                        {/*href:para navegacion a pagina externa, link es para rutas internas con react router, con href tambien funciona bien pero recarga la pagina */}

                        {/* search input */}
                        <div className='relative sm:w-72 w-40 space-x-2'>
                            <IoSearchOutline className='absolute inline-block left-4 inset-y-2' />
                            <input type="text" placeholder="Search here..." className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none' />
                        </div>
                    </div>

                    {/*right part*/}
                    <div className='relative flex items-center md:space-x-3 space-x-2'>
                        <div className='size-8' >
                            {currentUser ? <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img src={avatar} alt="avatar" className={`rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                </button>
                                {/* show dropdowns */}
                                {
                                    isDropdownOpen && (
                                        <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                            <ul className='py-2'>
                                                {
                                                    navigation.map((item) => (
                                                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                            <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                <li>
                                                    <button onClick={handleLogout} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </> : <Link to="/login"><HiOutlineUser className='size-6' /></Link>}
                        </div>
                        <button className='hidden sm:block'>
                            < AiFillHeart className='size-6' />
                        </button>

                        <Link to="/cart" className='bg-primary p-1 sm:px-6 py-2 flex items-center rounded-sm'>
                            <MdOutlineShoppingCart className='' />
                            {
                                cartItems.length > 0
                                    ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span>
                                    : <span className='text-sm font-semibold sm:ml-1'>0</span>
                            }
                        </Link>

                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
