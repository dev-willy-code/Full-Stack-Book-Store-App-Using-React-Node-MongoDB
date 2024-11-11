import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

// Configuración de la API de pedidos (ordersApi) usando RTK Query
const ordersApi = createApi({
    // Nombre de la ruta que manejará los estados en el store de Redux
    reducerPath: 'ordersApi',

    // Configuración de la consulta base, que se usará como punto de partida para cada endpoint
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`, // URL base de la API
        credentials: 'include' // Permitir que las credenciales (cookies) se envíen con cada solicitud
    }),

    // Tipos de etiquetas que se pueden usar para invalidar o actualizar el caché de manera selectiva
    tagTypes: ['Orders'],

    // Definición de endpoints que representan cada operación que queremos realizar en esta API
    endpoints: (builder) => ({

        // Endpoint para crear un nuevo pedido
        createOrder: (builder.mutation)({
            query: (newOrder) => ({  // Función que define la configuración de la solicitud
                url: "/",           // Ruta relativa; en este caso es el mismo `baseUrl`
                method: "POST",     // Método de la solicitud (POST) para crear un recurso
                body: newOrder,     // Cuerpo de la solicitud con los datos del nuevo pedido
                credentials: 'include', // Incluir credenciales en la solicitud
            })
        }),

        // Endpoint para obtener un pedido por email
        getOrderByEmail: (builder.query)({
            query: (email) => ({    // Función que define la configuración de la solicitud
                url: `/email/${email}` // Ruta relativa con el email como parámetro en la URL
            }),
            providesTags: ['Orders'] // Indica que el endpoint proporciona datos etiquetados como 'Orders'
        })
    })
})

// Exportación de hooks generados automáticamente para utilizar los endpoints
export const { useCreateOrderMutation, useGetOrderByEmailQuery } = ordersApi;

// Exportación de la API de pedidos para incluirla en el store de Redux
export default ordersApi;
