const express = require("express");
const router = new express.Router();
const ItemsController = require("../Controllers/ItemsController");

    //get all orders
   router.get("/", ItemsController.GetAllItems)

   //get order by id
   router.get("/:id", ItemsController.GetItemByID)

   //make new order
   router.post("/", ItemsController.AddItem)

   //update order by id
   router.put("/:id", ItemsController.UpdateItemByID)

   //delete order by id
   router.delete("/:id", ItemsController.DeleteItemByID)


module.exports = router;