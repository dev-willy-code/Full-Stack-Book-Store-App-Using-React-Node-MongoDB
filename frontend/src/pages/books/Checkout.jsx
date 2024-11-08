import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

const Checkout = () => {
    // Obtener los artículos del carrito del estado de Redux
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch(); // Hook para acceder a la función dispatch de Redux

    // Calculando el precio total del carrito
    const productPrices = parseFloat(cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2));
    const taxes = parseFloat((productPrices * 0.18).toFixed(2));
    const total = (productPrices + taxes).toFixed(2);

    // Obtener el usuario actual desde el contexto de autenticación
    const { currentUser } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // Utilizar la mutación para crear un pedido
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [isChecked, setIsChecked] = useState(false); // Estado para manejar el checkbox

    const navigate = useNavigate();

    // Función que maneja el envío del formulario
    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: total
        };

        try {
            // Aquí se utiliza unwrap() para obtener el resultado de la mutación
            // unwrap() lanza un error si la creación del pedido falla, lo que permite manejarlo en el bloque catch
            const y = await createOrder(newOrder).unwrap();
            console.log("wwwwwwwwwwwwww", y);
            alert("Your order has been created");
            navigate("/orders");
        } catch (e) {
            console.error("Error creating order", e);
            alert("Error creating order :(");
        }
    };

    // Mostrar un mensaje de carga mientras se crea el pedido
    if (isLoading) return <div>Loading....</div>;

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <div>
                        <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
                        <p className="text-gray-500 mb-2">Total Price: ${total}</p>
                        <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
                    </div>

                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Personal Details</p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label htmlFor="full_name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            {...register("name", { required: true })}
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="text"
                                            id="email"
                                            {...register("email", { required: false })}
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            disabled
                                            defaultValue={currentUser?.email}
                                            placeholder="email@domain.com"
                                        />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="number"
                                            id="phone"
                                            {...register("phone", { required: true })}
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="+123 456 7890"
                                        />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label htmlFor="address">Address / Street</label>
                                        <input
                                            type="text"
                                            id="address"
                                            {...register("address", { required: true })}
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            {...register("city", { required: true })}
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="country">Country / region</label>
                                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                            <input
                                                id="country"
                                                {...register("country", { required: true })}
                                                placeholder="Country"
                                                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="state">State / province</label>
                                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                            <input
                                                id="state"
                                                {...register("state", { required: true })}
                                                placeholder="State"
                                                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-1">
                                        <label htmlFor="zipcode">Zipcode</label>
                                        <input
                                            type="text"
                                            id="zipcode"
                                            {...register("zipcode", { required: true })}
                                            className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="md:col-span-5 mt-3">
                                        <div className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                onClick={() => setIsChecked(true)} // Cambia el estado cuando se hace clic
                                                id="billing_same"
                                                {...register("billing_same", { required: true })}
                                                className="form-checkbox"
                                            />
                                            <label htmlFor="billing_same" className="ml-2">
                                                I agree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shopping Policy.</Link>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="md:col-span-5 text-right">
                                        <div className="inline-flex items-end">
                                            <button
                                                type='submit'
                                                disabled={!isChecked} // Desactiva el botón si no se ha marcado el checkbox
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Place an Order
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
