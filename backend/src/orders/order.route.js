const express = require('express')
const router = express.Router();
const { createOrder, getOrderByEmail } = require('./order.controller');

//post = when submit something: frontend to db
//get = when get something back from db
//put/patch = when edit or update something
//delete = when delete something

//frontend => backend server => controller => book schema => database => send to server => back to frontend

//post a order
router.post("/", createOrder);

//get orders by email address
router.get("/email/:email", getOrderByEmail);


module.exports = router;