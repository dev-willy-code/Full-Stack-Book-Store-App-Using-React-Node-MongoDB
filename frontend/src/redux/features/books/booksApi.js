import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseUrl';

// Configuración de la consulta base (baseQuery) para todas las solicitudes de esta API
const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,  // URL base de la API de libros
    credentials: 'include',                // Incluye credenciales (cookies) en cada solicitud
    prepareHeaders: (Headers) => {         // Prepara los encabezados de la solicitud
        const token = localStorage.getItem('token');  // Obtiene el token de autenticación almacenado
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);  // Configura el encabezado 'Authorization'
        }
        return Headers;
    }
});

// Configuración de la API de libros usando RTK Query
const booksApi = createApi({
    reducerPath: 'booksApi',   // Define el nombre del slice de Redux que manejará el estado de esta API
    baseQuery,                 // Consulta base para todas las solicitudes
    tagTypes: ['Books'],       // Define el tipo de etiqueta para manejar el caché de la API

    // Definición de endpoints para manejar las operaciones CRUD sobre los libros
    endpoints: (builder) => ({

        // Endpoint para obtener todos los libros
        fetchAllBooks: builder.query({
            query: () => "/",                  // Solicitud GET a la URL base (lista todos los libros)
            providesTags: ["Books"]            // Mantiene el caché hasta que la etiqueta cambie
        }),

        // Endpoint para obtener un libro específico por ID
        fetchBookById: builder.query({
            query: (id) => `/${id}`,           // Solicitud GET a la URL con el ID del libro
            providesTags: (result, error, id) => [{ type: "Books", id }], // Configura el caché para este libro específico
        }),

        // Endpoint para agregar un nuevo libro
        addBook: builder.mutation({
            query: (newBook) => ({             // Solicitud POST para crear un nuevo libro
                url: `/create-book`,
                method: "POST",
                body: newBook                  // Envío de los datos del nuevo libro en el cuerpo de la solicitud
            }),
            invalidatesTags: ["Books"]         // Invalida el caché para obligar a una actualización de la lista de libros
        }),

        // Endpoint para actualizar un libro existente
        updateBook: builder.mutation({
            query: (id, ...rest) => ({         // Solicitud PUT para actualizar un libro por ID
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,                    // Envío de los datos actualizados en el cuerpo de la solicitud
                headers: {                     // Especifica el tipo de contenido
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]         // Invalida el caché para obligar a una actualización
        }),

        // Endpoint para eliminar un libro por ID
        deleteBook: builder.mutation({
            query: (id) => ({                  // Solicitud DELETE para eliminar un libro por ID
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]         // Invalida el caché para actualizar la lista de libros
        })
    })
});

// Exportación de los hooks generados automáticamente para cada endpoint
export const {
    useFetchAllBooksQuery,
    useFetchBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} = booksApi;

// Exportación de la API de libros para incluirla en el store de Redux
export default booksApi;
