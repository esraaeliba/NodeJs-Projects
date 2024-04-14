const express = require("express");
const router = new express.Router();
const OrdersController = require("../Controllers/OrdersController");

    //get all orders
   router.get("/", OrdersController.GetAllOrders)

   //get order by id
   router.get("/:id", OrdersController.GetOrderByID)

   //make new order
   router.post("/", OrdersController.AddOrder)

   //update order by id
   router.put("/:id", OrdersController.UpdateOrderByID)

   //delete order by id
   router.delete("/:id", OrdersController.DeleteOrderByID)


module.exports = router;