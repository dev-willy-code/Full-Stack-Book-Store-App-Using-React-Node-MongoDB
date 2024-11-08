const express = require('express')
const app = express()
const cors = require('cors');

const mongoose = require('mongoose')
const port = process.env.PORT || 5000;
require('dotenv').config();

//middleware
//Un middleware es una función que procesa solicitudes antes de llegar a la ruta final específica.
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
//routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route')
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

//main se encarga de conectar base de datos
async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.use('/', (req, res) => {
            res.send('hello')
        })
        console.log("mongodb connected succesfuly");
    } catch (error) {
        console.log("error", error);
    }
}
main(); //lllmar funcion main()

//Iniciar el servidor en el puerto especificado (definido por port).
//Escuchar las solicitudes HTTP en ese puerto, lo cual permite que los clientes (como navegadores o aplicaciones móviles) puedan acceder a tu aplicación o API.
app.listen(port, () => {
    console.log(`Èxample app listitening on port ${port}`);
})