// Importamos las dependencias necesarias para el componente
import React, { useState } from 'react'
import InputField from './InputField' // Componente reutilizable para campos de entrada
import SelectField from './SelectField' // Componente reutilizable para campos de selección
import { useForm } from 'react-hook-form'; // Librería para gestionar formularios de forma sencilla
import { useAddBookMutation } from '../../../redux/features/books/booksApi'; // Hook personalizado para la mutación de agregar libro
import Swal from 'sweetalert2'; // Librería para mostrar mensajes emergentes de confirmación

// Componente principal para añadir un nuevo libro
const AddBook = () => {
    // Inicializamos useForm para gestionar el formulario y manejar los errores
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null); // Estado para almacenar el archivo de imagen
    const [addBook, { isLoading, isError }] = useAddBookMutation(); // Hook para mutación de agregar libro
    const [imageFileName, setimageFileName] = useState(''); // Estado para almacenar el nombre del archivo de imagen

    // Función que se ejecuta al enviar el formulario
    const onSubmit = async (data) => {
        // Creamos un nuevo objeto de libro con los datos del formulario y el nombre del archivo de imagen
        const newBookData = {
            ...data,
            coverImage: imageFileName
        };

        try {
            // Llamamos a la mutación addBook con los datos del nuevo libro
            await addBook(newBookData).unwrap();

            // Mostramos un mensaje de éxito con SweetAlert2
            Swal.fire({
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
            });

            // Reseteamos el formulario y limpiamos el estado de la imagen ya que no se redirecciona a otra pagina
            reset(); // de react-hook-form
            setimageFileName('');
            setimageFile(null);
        } catch (error) {
            console.error(error); // Manejamos el error en la consola
            alert("Failed to add book. Please try again."); // Mostramos un mensaje de error
        }
    };

    // Función para manejar el cambio de archivo de imagen
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Obtenemos el archivo de la entrada
        if (file) {
            setimageFile(file); // Guardamos el archivo en el estado
            setimageFileName(file.name); // Guardamos el nombre del archivo en el estado
        }
    };

    // Renderizamos el formulario de añadir libro
    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

            {/* Inicio del formulario */}
            <form onSubmit={handleSubmit(onSubmit)} className=''>

                {/* Campo de entrada reutilizable para el Título */}
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                {/* Campo de entrada reutilizable para la Descripción */}
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                />

                {/* Campo de selección reutilizable para la Categoría */}
                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                        // Añadir más opciones según sea necesario
                    ]}
                    register={register}
                />

                {/* Checkbox para marcar el libro como tendencia */}
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                {/* Campo de entrada para el Precio Antiguo */}
                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                />

                {/* Campo de entrada para el Precio Nuevo */}
                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                />

                {/* Campo de carga de imagen de portada */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
                    {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
                </div>

                {/* Botón de envío */}
                <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                    {
                        isLoading ? <span>Adding...</span> : <span>Add Book</span>
                    }
                </button>
            </form>
        </div>
    );
};

export default AddBook;
