const Order = require('./order.model');

const createOrder = async (req, res) => {
    try {
        // Creamos una nueva instancia de Order utilizando los datos del cuerpo de la solicitud
        const newOrder = Order(req.body);
        const savedOrder = await newOrder.save();
        // Enviamos una respuesta al cliente con el estado 200 y la orden guardada en formato JSON
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error("Error creating order", error);
        res.status(500).send({ message: "Failed to create an order" });
    }
}

const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        if (!orders) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).send({ message: "Failed to fetch orders" });
    }
}

module.exports = {
    createOrder,
    getOrderByEmail
}