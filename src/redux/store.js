import { configureStore } from '@reduxjs/toolkit' // Importa la función configureStore de Redux Toolkit
import cartReducer from "../redux/features/cart/cartSlice" // Importa el reducer del carrito
import booksApi from './features/books/booksApi' // Importa la API de libros
import ordersApi from './features/orders/ordersApi' // Importa la API de órdenes

// Configura la tienda Redux
export const store = configureStore({
    reducer: {
        cart: cartReducer, // Agrega el reducer del carrito a la tienda
        [booksApi.reducerPath]: booksApi.reducer, // Agrega el reducer de la API de libros
        [ordersApi.reducerPath]: ordersApi.reducer, // Agrega el reducer de la API de órdenes
    },
    // Agregar el middleware de la API habilita características útiles como almacenamiento en caché,
    // invalidación, sondeo y más en `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware), // Combina los middleware por defecto con los de las APIs
});
