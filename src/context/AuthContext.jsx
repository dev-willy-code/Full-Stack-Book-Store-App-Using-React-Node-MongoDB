import { createContext, useContext, useEffect, useState } from 'react';
// Importamos funciones de autenticación de Firebase
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth"

import { auth } from "../firebase/firebase.config"

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext) // Permite a los componentes acceder al contexto de autenticación
}

// Instancia del proveedor de autenticación de Google
const googleProvider = new GoogleAuthProvider();

// Componente AuthProvider que envolverá la aplicación y proporcionará la autenticación a todos los componentes hijos
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null) // Estado para el usuario actual
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de la autenticación

    // Función para registrar un nuevo usuario con correo y contraseña
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // Manejo de errores de autenticación de Firebase, traduciendo códigos de error en mensajes más amigables
    const handleFirebaseError = (errorCode) => {
        switch (errorCode) {
            case "auth/email-already-in-use":
                return "El correo electrónico ya está en uso. Intenta con otro.";
            case "auth/invalid-credential":
                return "Credenciales incorrectas.";
            case "auth/weak-password":
                return "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.";
            case "auth/user-not-found":
                return "No se encontró una cuenta con este correo electrónico.";
            case "auth/wrong-password":
                return "La contraseña es incorrecta. Intenta de nuevo.";
            default:
                return "Ocurrió un error inesperado. Intenta de nuevo más tarde.";
        }
    };

    // Función para iniciar sesión con correo y contraseña
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    // Función para iniciar sesión con Google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    }

    // Función para cerrar sesión
    const logout = () => {
        return signOut(auth)
    }

    // Manejo del estado del usuario
    useEffect(() => {
        // onAuthStateChanged: Añade un observador para cambios en el estado de inicio de sesión del usuario.
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user); // Actualiza el estado del usuario actual
            setLoading(false); // Indica que la carga ha terminado

            if (user) {
                // Si hay un usuario, podemos obtener sus datos
                const { email, displayName, photoURL } = user;
                const userData = {
                    email, username: displayName, photo: photoURL // Crea un objeto con la información del usuario
                }
            }
            console.log(user); // Muestra información del usuario en la consola
        })
        return () => unsubscribe(); // Limpia el observador al desmontar el componente
    }, [])

    // Definimos el objeto `value` que contiene todas las funciones y estados que queremos proveer a los componentes hijos
    const value = {
        currentUser,
        loading,
        registerUser,
        handleFirebaseError,
        loginUser,
        signInWithGoogle,
        logout
    }

    // Proveemos el contexto a través de `AuthContext.Provider`, envolviendo a los componentes hijos
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
